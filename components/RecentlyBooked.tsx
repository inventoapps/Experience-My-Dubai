import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const itineraries = [
  {
    title: "Romantic Maldives Escape",
    price: "₹50K to ₹1.5L",
    duration: "5 Days",
  },
  {
    title: "European Dream Tour",
    price: "₹1.5L to ₹2.5L",
    duration: "10 Days",
  },
  {
    title: "Vietnam Discovery",
    price: "₹60K to ₹1L",
    duration: "7 Days",
  },
];

export default function RecentlyBooked() {
  return (
    <section className="py-12 sm:py-16 px-6 sm:px-0 bg-accent/5">
      <div className="max-w-7xl mx-auto">

   
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
              RECENTLY BOOKED ITINERARIES
            </h2>
            <h2 className="text-muted-foreground text-sm sm:text-base">
              India trusts TravelTrail for international getaways!
            </h2>
          </div>

          
          <div className="flex gap-2 self-end md:self-center">
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

 
        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            variant="default"
            className="rounded-full bg-foreground text-background hover:bg-foreground/90"
          >
            ₹50K to ₹1.5L
          </Button>
          <Button
            variant="outline"
            className="rounded-full text-sm sm:text-base"
          >
            ₹1.5L to ₹2.5L
          </Button>
        </div>

   
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {itineraries.map((itinerary) => (
            <div
              key={itinerary.title}
              className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border"
            >
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">
                {itinerary.title}
              </h3>

              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-muted-foreground">{itinerary.duration}</span>
                <span className="text-base sm:text-lg font-bold text-accent">
                  {itinerary.price}
                </span>
              </div>

              <Button className="w-full bg-accent hover:bg-accent/90">
                View Details
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
