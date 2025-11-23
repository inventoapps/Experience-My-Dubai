export default function FormSection() {
  return (
    <section
      className="py-12 max-w-6xl mx-auto px-6"
      aria-labelledby="lead-form-heading"
    >
      {/* HEADING */}
      <h2
        id="lead-form-heading"
        className="text-3xl font-bold text-foreground mb-6 uppercase"
      >
        Plan Your Trip
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* ============== FORM LEFT SIDE ============== */}
        <form
          className="
            space-y-5 
            bg-white 
            dark:bg-neutral-900 
            border 
            border-border 
            p-6 
            rounded-xl 
            shadow-md
          "
          aria-label="Trip planning form"
        >
          {/* FULL NAME */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-foreground mb-1">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              required
              placeholder="John Carter"
              className="
                border border-border 
                w-full p-3 
                rounded-lg bg-background 
                text-foreground 
                focus:outline-none 
                focus:ring-2 focus:ring-accent
              "
            />
          </div>

          {/* Email */}

          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-medium text-foreground mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              required
              placeholder="xyz@gmail.com"
              className="
                border border-border 
                w-full p-3 
                rounded-lg bg-background 
                text-foreground 
                focus:outline-none 
                focus:ring-2 focus:ring-accent
              "
            />
          </div>


          {/* PHONE */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-medium text-foreground mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="+91 • Mobile Number"
              className="
                border border-border 
                w-full p-3 
                rounded-lg bg-background 
                text-foreground 
                focus:outline-none 
                focus:ring-2 focus:ring-accent
              "
            />
          </div>

          {/* TRAVEL DATES */}
          <div className="flex flex-col">
            <label htmlFor="dates" className="text-sm font-medium text-foreground mb-1">
              Travel Dates
            </label>
            <input
              id="dates"
              name="dates"
              type="text"
              placeholder="e.g., 10 Dec - 15 Dec"
              className="
                border border-border 
                w-full p-3 
                rounded-lg bg-background 
                text-foreground 
                focus:outline-none 
                focus:ring-2 focus:ring-accent
              "
            />
          </div>

       
          <button
            type="submit"
            className="
              bg-red-500
                text-background
                px-6 py-3 rounded-lg 
                w-full sm:w-auto 
                font-medium 
               hover:bg-red-600
                transition
            "
          >
            Submit
          </button>
        </form>

        
        <aside
          className="
            relative 
            rounded-xl 
            overflow-hidden 
            h-[300px] 
            md:h-full 
            shadow-lg 
          "
          aria-label="Dubai travel inspiration"
        >
      
          <img
            src="https://wallpapercave.com/wp/wp3605186.jpg"
            alt="Dubai skyline travel inspiration"
            className="w-full h-full object-cover"
          />

        
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent"></div>

        
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h3 className="text-3xl font-bold leading-snug drop-shadow-lg">
              Turn Your Dubai Dreams<br />Into Reality
            </h3>
            <p className="text-gray-200 mt-3 text-sm sm:text-base leading-relaxed">
              Let our experts craft a luxury itinerary for your next Dubai holiday.
              Hassle-free planning, premium stays, and unforgettable experiences.
            </p>

            <button className="mt-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-md text-white font-medium border border-white/40 hover:bg-white/30 transition">
              Why Choose Us?
            </button>
          </div>
        </aside>

      </div>
    </section>
  );
}
