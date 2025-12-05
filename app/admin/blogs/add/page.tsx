"use client";

import { useRef, useState , ChangeEvent } from "react";

export default function BlogForm() {
  const [faq, setFaq] = useState([{ question: "", answer: "" }]);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [thumbnail, setThumbanail] = useState("");

  const [content, setContent] = useState("");
  const editorRef = useRef<HTMLDivElement | null>(null);

  function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
  
      const base64 = await fileToBase64(file);
  
      setThumbanail(base64);
    }

  function applyFormat(cmd: string, value?: string) {
    if (cmd === "createLink") {
      const url = prompt("Enter URL", "https://");
      if (url) document.execCommand("createLink", false, url);
    } else if (cmd === "formatBlock") {
      document.execCommand("formatBlock", false, value);
    } else {
      document.execCommand(cmd, false, value);
    }

    setContent(editorRef.current?.innerHTML ?? "");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("saving");

    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    const submitType = submitter.value;


    console.log("Here are" + submitType)

    const tagsValue = fd.get("tags");
    const tags =
      typeof tagsValue === "string"
        ? tagsValue.split(",").map((t) => t.trim()).filter(Boolean)
        : [];

    const payload = {
      title : fd.get('title'),
      slug: fd.get("slug"),
      author: fd.get("author"),
      category: fd.get("category"),
      tags,
      thumbnail,
      content,
      metaTitle: fd.get("metaTitle"),
      metaDescription: fd.get("metaDescription"),
      faq,
      views: 0,
      published: submitType === "publish",
    };

    fetch("/api/admin/blogs/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        setStatus("success");
        setMessage(
          submitType === "publish"
            ? "Blog published successfully"
            : "Blog saved as draft"
        );
      })
      .catch(() => {
        setStatus("error");
        setMessage("Something went wrong");
      });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
        <h1 className="text-xl font-semibold">
         Add Blog Article
        </h1>

        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <button
            type="submit"
            name="submitType"
            value="save"
            className="border px-3 py-2 rounded w-full md:w-auto"
          >
            Save Draft
          </button>

          <button
            type="submit"
            name="submitType"
            value="publish"
            className="border px-3 py-2 rounded bg-black text-white w-full md:w-auto"
          >
            Publish
          </button>
        </div>
</div>


      {/* STATUS */}
      {message && (
        <p
          className={`text-xs ${
            status === "success"
              ? "text-green-600"
              : status === "error"
              ? "text-red-600"
              : ""
          }`}
        >
          {message}
        </p>
      )}

      {/* BASIC INFO */}
      <section className="bg-white p-4 rounded-xl shadow-sm space-y-4">
        <h2 className="text-sm font-semibold">Basic Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Title" name="title" required />
          <Input label="Slug" name="slug" required />
          <Input label="Author" name="author" />
          <Input label="Category" name="category" />
          <Input label="Tags (comma separated)" name="tags" />
          <Input label="Thumbnail URL"
           name="thumbnail" 
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e)}
             />
        </div>
      </section>

      {/* Rich Text Editor */}
      <section className="bg-white p-4 rounded-xl shadow-sm space-y-3">
        <div className="flex justify-between">
          <h2 className="text-sm font-semibold">Content</h2>

          <div className="flex gap-1 text-xs">
            <FormatButton label="B" onClick={() => applyFormat("bold")} />
            <FormatButton label="H2" onClick={() => applyFormat("formatBlock", "H2")} />
            <FormatButton label="H3" onClick={() => applyFormat("formatBlock", "H3")} />
            <FormatButton label="Link" onClick={() => applyFormat("createLink")} />
          </div>
        </div>

        <div
          ref={editorRef}
          contentEditable
          onInput={(e) => setContent(e.currentTarget.innerHTML)}
          className="border rounded p-3 min-h-[200px] bg-white"
        ></div>
      </section>

      {/* SEO */}
      <section className="bg-white p-4 rounded-xl shadow-sm space-y-4">
        <h2 className="text-sm font-semibold">SEO</h2>

        <Input label="Meta Title" name="metaTitle" />
        <Textarea label="Meta Description" name="metaDescription" />
      </section>

      {/* FAQ */}
      <section className="bg-white p-4 rounded-xl shadow-sm space-y-4">
        <div className="flex justify-between">
          <h2 className="text-sm font-semibold">FAQ</h2>
          <button
            type="button"
            className="text-xs border px-2 py-1 rounded"
            onClick={() => setFaq([...faq, { question: "", answer: "" }])}
          >
            + Add FAQ
          </button>
        </div>

        <div className="space-y-3">
          {faq.map((item, i) => (
            <div key={i} className="border p-3 rounded space-y-2">
              <Input
                label="Question"
                value={item.question}
                onChange={(e) => {
                  const c = [...faq];
                  c[i].question = e.target.value;
                  setFaq(c);
                }}
              />

              <Textarea
                label="Answer"
                value={item.answer}
                onChange={(e) => {
                  const c = [...faq];
                  c[i].answer = e.target.value;
                  setFaq(c);
                }}
              />
            </div>
          ))}
        </div>
      </section>
    </form>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function Input({ label, ...props }: InputProps) {
  return (
    <div>
      <label className="text-xs block mb-1 font-medium">{label}</label>
      <input {...props} className="w-full border rounded px-3 py-2 text-sm" />
    </div>
  );
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

function Textarea({ label, ...props }: TextareaProps) {
  return (
    <div>
      <label className="text-xs block mb-1 font-medium">{label}</label>
      <textarea {...props} rows={3} className="w-full border rounded px-3 py-2 text-sm" />
    </div>
  );
}

type FormatButtonProps = {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

function FormatButton({ label, onClick }: FormatButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border px-2 py-1 rounded text-xs"
    >
      {label}
    </button>
  );
}
