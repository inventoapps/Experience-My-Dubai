
interface EnquiryProps {
  isOpen: boolean;
  price: number;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function EnquiryForm({
  isOpen,
  message = "Are you sure you want to delete this? This action cannot be undone.",
  onConfirm,
  onCancel,
}: EnquiryProps) {
  return (
    <>
      <div
        className={`
          fixed inset-0 bg-black/40 backdrop-blur-sm 
          transition-opacity duration-300 
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={onCancel}
      />

     
      <section
        className={`
          fixed left-1/2 top-0 
          transform -translate-x-1/2 
          w-full max-w-md px-4
          transition-all duration-500 ease-out
          backdrop-blur-sm

          
          ${isOpen ? "translate-y-24 opacity-100 z-999" : "-translate-y-full opacity-0"}
        `}
      >
        <form
          className="
            space-y-5 
            bg-white 
            dark:bg-neutral-900 
            border 
            border-border 
            p-6 
            rounded-xl 
            shadow-lg
          "
        >
       
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Full Name</label>
            <input
              required
              placeholder="John Carter"
              className="
                border border-border 
                w-full p-3 rounded-lg bg-background 
                focus:ring-2 focus:ring-accent
              "
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="xyz@gmail.com"
              className="
                border border-border 
                w-full p-3 rounded-lg bg-background 
                focus:ring-2 focus:ring-accent
              "
            />
          </div>

    
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              required
              placeholder="+91 • Mobile Number"
              className="
                border border-border 
                w-full p-3 rounded-lg bg-background 
                focus:ring-2 focus:ring-accent
              "
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Travel Dates</label>
            <input
              placeholder="10 Dec - 15 Dec"
              className="
                border border-border 
                w-full p-3 rounded-lg bg-background 
                focus:ring-2 focus:ring-accent
              "
            />

            <label className="text-sm font-medium mt-3 mb-1">Traveler Count</label>
            <input
              placeholder="No. of Travelers"
              className="
                border border-border 
                w-full p-3 rounded-lg bg-background 
                focus:ring-2 focus:ring-accent
              "
            />
          </div>

         
          <button
            type="submit"
            className="
              bg-red-500 text-white px-6 py-3 
              rounded-lg w-full font-semibold 
              hover:bg-red-600 transition
            "
            onClick={onConfirm}
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
}
