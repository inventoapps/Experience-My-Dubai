import {
  ShieldCheck,
  Headset,
  Users,
  Sparkles
} from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section
      className="px-6 py-14 max-w-7xl mx-auto"
      aria-labelledby="why-us-heading"
    >
      
      <h2
        id="why-us-heading"
        className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-10"
      >
        Why Choose Us
      </h2>

     
      <div
        className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-4 
        gap-8
      "
      >    
        <article
          className="
            bg-card 
            border border-border 
            rounded-2xl 
            p-6 
            shadow-sm 
            hover:shadow-lg 
            transition 
            duration-300
            hover:-translate-y-2 
          "
          aria-label="Best Price Guarantee"
        >
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="w-8 h-8 " />
            <h3 className="text-lg font-semibold text-foreground">
              Best Price Guarantee
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Transparent pricing with no hidden charges. Always get the best deals on Dubai holidays.
          </p>
        </article>

      
        <article
          className="
            bg-card 
            border border-border 
            rounded-2xl 
            p-6 
            shadow-sm 
            hover:shadow-lg 
            transition 
            duration-300
            hover:-translate-y-2
          "
          aria-label="Verified Tour Operators"
        >
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-8 h-8" />
            <h3 className="text-lg font-semibold text-foreground">
              Verified Tour Operators
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Trusted, certified, and top-rated local partners for a seamless experience.
          </p>
        </article>

        <article
          className="
            bg-card 
            border border-border 
            rounded-2xl 
            p-6 
            shadow-sm 
            hover:shadow-lg 
            transition 
            duration-300
            hover:-translate-y-2 
          "
          aria-label="24/7 Support"
        >
          <div className="flex items-center gap-3 mb-3">
            <Headset className="w-8 h-8 " />
            <h3 className="text-lg font-semibold text-foreground">
              24/7 Travel Assistance
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our team is always available — from booking till you return home.
          </p>
        </article>

        <article
          className="
            bg-card 
            border border-border 
            rounded-2xl 
            p-6 
            shadow-sm 
            hover:shadow-lg 
            transition 
            duration-300
            hover:-translate-y-2 
          "
          aria-label="Custom Travel Plans"
        >
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-8 h-8 " />
            <h3 className="text-lg font-semibold text-foreground">
              100% Custom Travel Plans
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Personalized itineraries designed exactly the way you want your holiday.
          </p>
        </article>
      </div>
    </section>
  );
}
