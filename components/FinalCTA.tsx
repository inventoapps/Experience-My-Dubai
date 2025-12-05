"use client"
import { useState } from "react";
import EnquiryForm from "./EnquiryFormPopUp";

export default function FinalCTA() {
  const [isDialogOpen , setIsDialogOpen] = useState(false);
  return (
        <>
          <footer className="bg-[#0F0F0F] text-gray-300 pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-6">
              
              {/* Top Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* Column 1 */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Experience My Dubai
                  </h3>
                  <p className="text-sm leading-relaxed">
                    Discover Dubai like never before. Book curated holiday packages,
                    enjoy luxury stays, and explore unforgettable attractions with 
                    the best travel experts.
                  </p>

                  {/* Social Icons */}
                  <div className="flex gap-4 mt-4">
                    <a href="#" className="hover:text-orange-500 transition">Facebook</a>
                    <a href="#" className="hover:text-orange-500 transition">Instagram</a>
                    <a href="#" className="hover:text-orange-500 transition">YouTube</a>
                  </div>
                </div>

                {/* Column 2 */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/#packages" className="hover:text-orange-500">Dubai Tour Packages</a></li>
                    <li><a href="/#experiences" className="hover:text-orange-500">Dubai Experiences</a></li>
                    <li><a href="/#blogs" className="hover:text-orange-500">Travel Blogs</a></li>
                    <li><a href="/#faq" className="hover:text-orange-500">FAQs</a></li>
                    <li><a href="/contact" className="hover:text-orange-500">Contact Us</a></li>
                  </ul>
                </div>

                {/* Column 3 */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Popular Packages</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-orange-500">Dubai 5-Day Tour</a></li>
                    <li><a href="#" className="hover:text-orange-500">Dubai & Abu Dhabi Combo</a></li>
                    <li><a href="#" className="hover:text-orange-500">Luxury Desert Safari</a></li>
                    <li><a href="#" className="hover:text-orange-500">Atlantis Aquaventure</a></li>
                    <li><a href="#" className="hover:text-orange-500">Burj Khalifa Tour</a></li>
                  </ul>
                </div>

                {/* Column 4 */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
                  <ul className="space-y-2 text-sm">
                    <li>📍 Dubai, UAE</li>
                    <li>📞 +971 55 123 4567</li>
                    <li>✉ support@experiencedubai.com</li>
                  </ul>

                  {/* CTA */}
                  <button className="
                    mt-4 px-6 py-2 
                    bg-orange-600 
                    text-white 
                    font-semibold 
                    rounded-lg 
                    hover:bg-orange-700 
                    transition
                  "
                  onClick={()=>setIsDialogOpen(true)}
                  >
                    
                    Book Your Trip
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} Experience My Dubai. All Rights Reserved.
              </div>
            </div>
          </footer>
          <EnquiryForm
                      isOpen={isDialogOpen}
                      price={799}
                      onCancel={() => setIsDialogOpen(false)}
                      onConfirm={() => setIsDialogOpen(false)}
                      pageUrl={"/"}
                    
              />
        </>
    
  );
}
