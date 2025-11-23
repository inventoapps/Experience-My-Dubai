export default function TopExperience(){
    return (
        <section 
            className="py-12 sm:py-16 max-w-7xl mx-auto"
            aria-labelledby="top-experiences-heading"
            >
      
            <h2
                id="top-experiences-heading"
                className="text-3xl font-bold text-foreground mb-6 uppercase"
            >
                Top Dubai Experiences
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
                className="border border-border p-5 rounded-xl bg-card shadow-sm hover:shadow-md transition"
                aria-label="Desert Safari experience in Dubai"
                >
                <h3 className="font-semibold text-lg text-foreground">Desert Safari</h3>
                <p className="text-sm text-muted-foreground mt-1">
                    Adventure through dunes, camel rides & Arabian nights.
                </p>
                </article>

               
                <article 
                className="border border-border p-5 rounded-xl bg-card shadow-sm hover:shadow-md transition"
                aria-label="Burj Khalifa tour experience in Dubai"
                >
                <h3 className="font-semibold text-lg text-foreground">Burj Khalifa Tour</h3>
                <p className="text-sm text-muted-foreground mt-1">
                    Visit the world’s tallest building with stunning views.
                </p>
                </article>

            
                <article 
                className="border border-border p-5 rounded-xl bg-card shadow-sm hover:shadow-md transition"
                aria-label="Skydiving experience over Dubai"
                >
                <h3 className="font-semibold text-lg text-foreground">Skydiving Dubai</h3>
                <p className="text-sm text-muted-foreground mt-1">
                    Experience an adrenaline rush above Palm Jumeirah.
                </p>
                </article>

              
                <article 
                className="border border-border p-5 rounded-xl bg-card shadow-sm hover:shadow-md transition"
                aria-label="Dubai city sightseeing tour"
                >
                <h3 className="font-semibold text-lg text-foreground">Dubai City Tour</h3>
                <p className="text-sm text-muted-foreground mt-1">
                    Explore historic souks, landmarks & cultural hotspots.
                </p>
                </article>
            </div>
        </section>

    )
}