// import React from 'react'

// const footer = () => {
//   return (
//     <div>
//       <div className="flex-grow-0 flex-shrink-0 w-[1440px] h-[380px] relative overflow-hidden bg-[#2a254b]">
//   <div className="flex flex-col justify-start items-start absolute left-[82px] top-[58px] gap-3">
//     <p className="flex-grow-0 flex-shrink-0 text-base text-left text-white">Menu</p>
//     <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white">New arrivals</p>
//     <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white">Best sellers</p>
//     <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white">Recently viewed</p>
//     <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white">Popular this week</p>
//     <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white">All products</p>
//   </div>
//   <div className="flex flex-col justify-start items-start absolute left-[299px] top-[58px] gap-3">
//     <p className="flex-grow-0 flex-shrink-0 text-base text-left text-white">Categories</p>
//     <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white">Crockery</p>
//     <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white">Furniture</p>
//     <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white">Homeware</p>
//     <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white">Plant pots</p>
//     <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white">Chairs</p>
//     <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white">Crockery</p>
//   </div>
//   <p className="absolute left-20 top-[336px] text-sm text-left text-white">Copyright 2022 Avion LTD</p>
//   <div className="flex flex-col justify-start items-start absolute left-[516px] top-[58px] gap-3">
//     <p className="flex-grow-0 flex-shrink-0 text-base text-left text-white">Our company</p>
//     <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white">About us</p>
//     <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white">Vacancies</p>
//     <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white">Contact us</p>
//     <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white">Privacy</p>
//     <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white">Returns policy</p>
//   </div>
//   <p className="absolute left-[730px] top-[58px] text-base text-left text-white">
//     Join our mailing list
//   </p>
  
//     <line y1="0.5" x2="1277" y2="0.5" stroke="#4E4D93"></line>

//   <div className="flex justify-start items-start absolute left-[1093px] top-[334px] gap-6">
    
//       <rect width="24" height="24" fill="white"></rect>
    
//       <rect width="24" height="24" fill="white"></rect>
     
//       <rect width="24" height="24" fill="white"></rect>
      
//       <rect width="24" height="24" fill="white"></rect>
      
    
//       <rect width="24" height="24" fill="white"></rect>
//       <rect width="24" height="24" fill="white" ></rect>
 
//   </div>
//   <div className="flex justify-start items-start w-[627px] absolute left-[730px] top-[94px]">
//     <div className="self-stretch flex-grow relative overflow-hidden bg-white/[0.15]">
//       <p className="absolute left-8 top-[17px] text-base text-left text-white">your@email.com</p>
//     </div>
//     <div
//       className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 px-8 py-4 bg-white"
//     >
//       <p className="flex-grow-0 flex-shrink-0 text-base text-left text-[#2a254b]">Sign up</p>
//     </div>
//     </div>
//     </div>
// </div>
//   )
// }

// export default footer



"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/sanity/lib/getData";

const Footer: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    setIsClient(true);

    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data || []);
    };

    fetchCategories();
  }, []);

  const menuLinks = [
    { name: "New arrivals", href: "/new-arrivals" },
    { name: "Best sellers", href: "/best-sellers" },
    { name: "Recently viewed", href: "/recently-viewed" },
    { name: "Popular this week", href: "/popular-this-week" },
    { name: "All products", href: "/products" },
  ];

  const companyLinks = [
    { name: "About us", href: "/about" },
    { name: "Vacancies", href: "/vacancies" },
    { name: "Contact us", href: "/contact" },
    { name: "Privacy", href: "/privacy" },
    { name: "Returns policy", href: "/returns-policy" },
  ];

  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/muhammad-areeb-a295192b5/",
      src: "/icons/Linkedin.svg.png",
      alt: "LinkedIn",
    },
    {
      href: "https://web.facebook.com/Areebmalik7765",
      src: "/icons/facebook.svg.png",
      alt: "Facebook",
    },
    {
      href: "https://www.instagram.com/areeb_malik1777",
      src: "/icons/instagram.svg.png",
      alt: "Instagram",
    },
    
  ];

  if (!isClient) {
    return null;
  }

  return (
    <div className="Footer w-full bg-[#2a254b] py-10 md:py-12 px-4 md:px-10">
      {/* Mobile View */}
      <div className="md:hidden bg-[#2a254b] cursor-pointer">
        <div className="flex flex-col w-full h-auto bg-[#2a254b] px-4">
          <div className="flex justify-between">
            <div className="flex flex-col gap-3">
              <div className="text-white text-base">Menu</div>
              {menuLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <div className="text-white text-sm">{link.name}</div>
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-white text-base">Categories</div>
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/products?category=${category.name}`}
                >
                  <div className="text-white text-sm">{category.name}</div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-10 gap-3">
            <div className="text-white text-base">Our company</div>
            {companyLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <div className="text-white text-sm">{link.name}</div>
              </Link>
            ))}
          </div>
          <div className="flex flex-col mt-10 gap-3">
            <div className="text-white text-base">Join our mailing list</div>
            <div className="flex w-full mt-2">
              <input
                type="email"
                className="h-14 pl-8 pr-4 py-[17px] bg-white/20 text-white text-base flex-grow"
                placeholder="your@email.com"
              />
              <div className="px-1 py-3 bg-white border justify-center items-center flex cursor-pointer">
                <div className="text-[#2a254b] text-base leading-normal">
                  Sign up
                </div>
              </div>
            </div>
          </div>
          <div className="w-full border-t border-[#4e4c92] mt-10 pt-4 text-center">
            <div className="text-white text-sm">Copyright 2022 Avion LTD</div>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex max-w-6xl mx-auto flex-col md:flex-row items-start gap-8">
        <div className="flex-1 flex-col justify-start items-start gap-3 cursor-pointer">
          <div className="text-white text-base">Menu</div>
          {menuLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <div className="text-white text-sm">{link.name}</div>
            </Link>
          ))}
        </div>
        <div className="flex-1 flex-col justify-start items-start gap-3">
          <div className="text-white text-base">Categories</div>
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/products?category=${category.name}`}
            >
              <div className="text-white text-sm">{category.name}</div>
            </Link>
          ))}
        </div>
        <div className="flex-1 flex-col justify-start items-start gap-3">
          <div className="text-white text-base">Our company</div>
          {companyLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <div className="text-white text-sm">{link.name}</div>
            </Link>
          ))}
        </div>
        <div className="flex-1 flex-col justify-center items-start gap-3">
          <div className="text-white text-base">Join our mailing list</div>
          <div className="flex w-full">
            <input
              type="email"
              className="h-14 pl-8 pr-4 py-[17px] bg-white/20 text-white text-base flex-grow"
              placeholder="your@email.com"
            />
            <div className="px-4 py-4 bg-white border justify-center items-center gap-2.5 flex cursor-pointer">
              <div className="text-[#2a254b] text-base leading-normal w-16">
                Sign up
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex justify-between items-center w-full border-t border-[#4e4c92] pt-4 mt-8">
        <div className="text-white text-sm">Copyright 2022 Avion LTD</div>
        <div className="flex gap-6">
          {socialLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={link.src}
                alt={link.alt}
                width={24}
                height={24}
                priority={true}
                className="w-6 h-6 bg-transparent"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;