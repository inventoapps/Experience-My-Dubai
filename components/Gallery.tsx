export default function Gallery(){
    return (
        <section
            className="py-14 px-6 sm:px-0 max-w-7xl mx-auto"
            aria-labelledby="dubai-gallery-heading"
            >
            
            <h2
                id="dubai-gallery-heading"
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8"
            >
                Dubai Travel Gallery
            </h2>

            
            <div
                className="
                grid 
                grid-cols-2 
                sm:grid-cols-3 
                md:grid-cols-4 
                gap-4
                "
            >
                
                <figure className="overflow-hidden rounded-xl shadow-sm group cursor-pointer bg-white">
                <img
                    src="https://images.musement.com/cover/0001/64/dubaiacquarium-jpg_header-63383.jpeg?&q=60&fit=crop"
                    width={500}
                    height={500}
                    alt="Dubai beach landscape"
                    className="
                    rounded-xl 
                    object-cover 
                    w-full h-full 
                    transition-transform 
                    duration-500 
                    group-hover:scale-110
                    "
                />
                </figure>

               
                <figure className="overflow-hidden rounded-xl shadow-sm group cursor-pointer">
                <img
                    src="https://images.musement.com/cover/0001/64/dubaiacquarium-jpg_header-63383.jpeg?&q=60&fit=crop"
                    width={500}
                    height={500}
                    alt="Desert safari jeep adventure"
                    className="
                    rounded-xl 
                    object-cover 
                    w-full h-full 
                    transition-transform 
                    duration-500 
                    group-hover:scale-110
                    "
                />
                </figure>

                
                <figure className="overflow-hidden rounded-xl shadow-sm group cursor-pointer">
                <img
                    src="https://images.musement.com/cover/0001/64/dubaiacquarium-jpg_header-63383.jpeg?&q=60&fit=crop"
                    width={500}
                    height={500}
                    alt="Iconic Burj Al Arab hotel"
                    className="
                    rounded-xl 
                    object-cover 
                    w-full h-full 
                    transition-transform 
                    duration-500 
                    group-hover:scale-110
                    "
                />
                </figure>

               
                <figure className="overflow-hidden rounded-xl shadow-sm group cursor-pointer">
                <img
                    src="https://images.musement.com/cover/0001/64/dubaiacquarium-jpg_header-63383.jpeg?&q=60&fit=crop"
                    width={500}
                    height={500}
                    alt="Palm Jumeirah aerial view"
                    className="
                    rounded-xl 
                    object-cover 
                    w-full h-full 
                    transition-transform 
                    duration-500 
                    group-hover:scale-110
                    "
                />
                </figure>
            </div>
        </section>
    )
}