import Image from "next/image";

const  testimonials = [ {
  experience : "I had the most incredible Dubai experience! Everything from the itinerary to the hotel and desert safari was perfectly organized.Truly unforgettable!",
  image : "https://i.pravatar.cc/100?img=12",
  name :  "Rahul Sharma",
  country : "India"
},
{
  experience : "I had the most incredible Dubai experience! Everything from the itinerary to the hotel and desert safari was perfectly organized.Truly unforgettable!",
  image : "https://i.pravatar.cc/100?img=12",
  name :  "Rahul Sharma",
  country : "India"

},
{
  experience : "I had the most incredible Dubai experience! Everything from the itinerary to the hotel and desert safari was perfectly organized.Truly unforgettable!",
  image : "https://i.pravatar.cc/100?img=12",
  name :  "Rahul Sharma",
  country : "India"

}

];

export default function Testimonials() {
  return (
    <section>
      <h2
        id="testimonials-heading"
        className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-10"
      >
        What Our Travelers Say
      </h2>

      <div
      className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10  px-16"
      aria-labelledby="testimonials-heading"
    >
      { testimonials.map((person , idx)=>{

       return (
          <section
             key={idx}
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
              className="text-sm sm:text-lg leading-relaxed text-gray-500 mt-4 font-medium "
              itemProp="reviewBody"
            >
              {person.experience}
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
                  {person.name}
                </span>
                <p className="text-sm text-muted-foreground">
                  Traveler from {person.country}
                </p>
              </div>
            </div>
          </section>
         

          )})
          }
          
          </div>

    </section>
    
  );
}
