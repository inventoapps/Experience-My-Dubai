import Image from "next/image";

export default function Testimonials() {
  return (
    <section
      className="px-6 py-16 max-w-6xl mx-auto"
      aria-labelledby="testimonials-heading"
    >
      
      <h2
        id="testimonials-heading"
        className="text-3xl sm:text-4xl font-bold text-center mb-10"
      >
        What Our Travelers Say
      </h2>

      
      <blockquote
        className="
          relative 
          bg-linear-to-br from-accent/10 to-accent/5 
          border border-accent/20 
          p-8 
          rounded-3xl 
          shadow-lg 
          max-w-3xl 
          mx-auto 
          text-center
        "
        itemScope
        itemType="https://schema.org/Review"
      >
     
        <span className="absolute -top-6 left-1/2 -translate-x-1/2  w-12 h-12 rounded-full flex items-center justify-center text-3xl shadow-md">
          “
        </span>

        <p
          className="text-lg sm:text-xl leading-relaxed text-foreground mt-4 font-medium"
          itemProp="reviewBody"
        >
          I had the most incredible Dubai experience! Everything from the
          itinerary to the hotel and desert safari was perfectly organized.
          Truly unforgettable!
        </p>

        
        <div className="flex flex-col items-center mt-8">
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="Traveler Rahul"
            width={70}
            height={70}
            className="rounded-full shadow-md"
            itemProp="author"
          />

          <div className="mt-3">
            <span className="font-semibold text-foreground" itemProp="name">
              Rahul Sharma
            </span>
            <p className="text-sm text-muted-foreground">
              Traveler from India
            </p>
          </div>
        </div>
      </blockquote>
    </section>
  );
}
