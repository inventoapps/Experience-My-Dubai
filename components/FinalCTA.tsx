export default function FinalCTA() {
  return (
    <section
      className="
        relative 
        py-20 
        text-center 
        overflow-hidden 
      "
      aria-labelledby="final-cta-heading"
    >
     
      <div className="absolute inset-0">
        <img
          src="https://wallpapercave.com/wp/wp3605186.jpg"
          alt="Dubai skyline travel night view"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

     
      <div className="relative z-10 px-6 max-w-3xl mx-auto">
        <h2
          id="final-cta-heading"
          className="
            text-3xl sm:text-5xl 
            font-extrabold 
            text-white 
            drop-shadow-xl 
            leading-tight
          "
        >
          Ready to Experience the Magic of Dubai?
        </h2>

        <p className="text-gray-200 mt-4 text-lg sm:text-xl leading-relaxed">
          Custom itineraries, luxury stays, desert adventures, and seamless travel planning —
          all crafted just for you.
        </p>

        <button
          className="
            mt-8 
            bg-accent  
            px-10 
            py-4 
            rounded-full 
            text-lg 
            font-semibold 
            shadow-xl 
            hover:bg-accent/90 
            transition 
            duration-300
            cursor-pointer
          "
        >
          Book Your Dubai Trip Now
        </button>

        <p className="text-gray-300 mt-3 text-sm italic">
          Limited slots for this month — secure yours today!
        </p>
      </div>

   
      <div className="absolute bottom-4 right-4 z-10 text-right space-y-1">
        <p className="text-sm text-gray-200 font-medium">ExperienceMyDubai © 2025</p>
        <p className="text-xs text-gray-300">Your trusted travel partner</p>

        <div className="flex justify-end gap-3 mt-2">
          <a
            href="#"
            aria-label="Instagram"
            className="text-gray-300 hover:text-white text-sm transition"
          >
            Instagram
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="text-gray-300 hover:text-white text-sm transition"
          >
            Facebook
          </a>
          <a
            href="#"
            aria-label="Support"
            className="text-gray-300 hover:text-white text-sm transition"
          >
            Support
          </a>
        </div>
      </div>
    </section>
  );
}
