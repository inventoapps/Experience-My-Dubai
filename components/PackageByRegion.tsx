export default function PackageByRegion(){
    return (
           <section 
                className="py-12 sm:py-16 max-w-7xl mx-auto"
                aria-labelledby="packages-region-heading"
                >
                <h2 
                    id="packages-region-heading"
                    className="text-3xl font-bold mb-6 text-foreground uppercase "
                >
                    Packages by Region
                </h2>

                <div 
                    className="
                    grid 
                    grid-cols-1 
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-4 
                    gap-6
                    "
                >
                 
                    <article 
                    className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition"
                    aria-label="Downtown Dubai packages"
                    >
                    <h3 className="text-lg font-semibold mb-2">Downtown Dubai</h3>
                    <p className="text-sm text-muted-foreground">
                        Explore Burj Khalifa, Dubai Mall & city lights.
                    </p>
                    </article>

                 
                    <article 
                    className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition"
                    aria-label="Dubai Marina packages"
                    >
                    <h3 className="text-lg font-semibold mb-2">Dubai Marina</h3>
                    <p className="text-sm text-muted-foreground">
                        Luxury yachts, beaches & waterfront views.
                    </p>
                    </article>

                    <article 
                    className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition"
                    aria-label="Palm Jumeirah packages"
                    >
                    <h3 className="text-lg font-semibold mb-2">Palm Jumeirah</h3>
                    <p className="text-sm text-muted-foreground">
                        Resorts, Atlantis, and world-class dining.
                    </p>
                    </article>

                   
                    <article 
                    className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition"
                    aria-label="Desert Area packages"
                    >
                    <h3 className="text-lg font-semibold mb-2">Desert Area</h3>
                    <p className="text-sm text-muted-foreground">
                        Desert safari, camel rides & adventure tours.
                    </p>
                    </article>
                </div>
             </section>
  )
}