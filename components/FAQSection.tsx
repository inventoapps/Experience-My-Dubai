"use client"
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Ifaqs {
   question : string;
   answer : string;
}

interface IFaqProps {
  faqs: Ifaqs[];
}

export default function FAQSection({faqs} : IFaqProps) {
  // <FAQSection faqs={pkg.faqs} />
 

  const [open, setOpen] = useState<number | null>(null);

  const toggleFAQ = (i:number) => {
    setOpen(open === i ? null : i);
  };

  return (
    <section
      className="px-6 py-14 max-w-5xl mx-auto"
      aria-labelledby="faq-heading"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
    
      <h2
        id="faq-heading"
        className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-10"
      >
        Frequently Asked Questions
      </h2>

     
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <article
            key={i}
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
            className="
              border border-border 
              bg-card 
              rounded-xl 
              shadow-sm 
              hover:shadow-md 
              transition 
              p-5
              cursor-pointer
            "
            onClick={() => toggleFAQ(i)}
          >
            
            <div className="flex justify-between items-center">
              <h3
                className="text-lg font-semibold text-foreground"
                itemProp="name"
              >
                {faq.question}
              </h3>
              <ChevronDown
                className={`
                  w-5 h-5 text-foreground transition-transform duration-300
                  ${open === i ? "rotate-180" : ""}
                `}
              />
            </div>

            
            <div
              className={`
                mt-3 text-sm text-muted-foreground leading-relaxed 
                transition-all duration-300 overflow-hidden
                ${open === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
              `}
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <p itemProp="text">{faq.answer}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
