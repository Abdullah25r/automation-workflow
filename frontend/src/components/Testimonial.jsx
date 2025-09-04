import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

function Testimonial() {
  const testimonials = [
    {
      name: "John Doe",
      title: "Satisfied Customer",
      message:
        "The quality and service were top-notch! I've never had a smoother experience shopping online.",
      image: "./img/t1.jpg",
    },
    {
      name: "Michael Johnson",
      title: "Entrepreneur",
      message:
        "Fantastic products! Everything from the packaging to performance was simply outstanding.",
      image: "./img/t3.jpg",
    },
    {
      name: "Emily Carter",
      title: "Tech Blogger",
      message:
        "Absolutely loved the watch — sleek design, premium feel, and super quick delivery. Highly recommend this store",
      image: "./img/t2.jpg",
    },
  ];
  return (
    <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-lg my-8">
      {/* Heading */}
      <h2 className="text-center font-poppins my-20 text-xl md:text-6xl font-bold text-white">
        What our{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-600 to-sky-400">
          Customers{" "}
        </span>
        Says
      </h2>
      {/* Body */}
      <div className="grid grid-cols-1 cursor-pointer md:grid-cols-3 gap-4 place-items-center">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="group relative bg-[#2a2a2a] p-5 rounded-xl shadow-md transition-all duration-500 overflow-hidden"
          >
            {/* Animated Gradient Layer */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl z-0"></div>

            {/* Content */}
            <div className="relative z-10">
              <FaQuoteLeft size={32} className="text-cyan-600 mb-4" />
              <p className="text-white text-sm md:text-base mb-4 font-poppins line-clamp-2">
                {testimonial.message}
              </p>
              <div className="flex gap-4 items-center">
                <img
                  src={testimonial.image}
                  alt="img"
                  className="h-12 w-12 rounded-full border-[2px] border-cyan-600"
                />
                <div>
                  <h4 className="font-semibold font-poppins text-white relative inline-block after:block after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-500 group-hover:after:w-full">
                    {testimonial.name}
                  </h4>
                  <p className="font-poppins text-gray-400">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonial;
