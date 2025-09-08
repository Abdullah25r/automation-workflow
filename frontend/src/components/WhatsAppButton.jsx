import React from "react";

const WhatsAppButton = () => {
  const whatsappNumber = "923014595772";
  const message = "";

  const handleClick = () => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <div className="relative">

        <div
          className="relative w-16 h-16 md:w-20 md:h-20 cursor-pointer transition-all duration-300 hover:scale-110 rounded-full flex items-center justify-center"
          onClick={handleClick}
        >

          <div className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16">

            <div className="absolute inset-0 rounded-full border border-green-300 opacity-50 animate-ping"></div>
            
  
            <div className="absolute inset-0 rounded-full border-2 border-green-400 opacity-0 group-hover:opacity-100 group-hover:animate-ping duration-300"></div>
            
            {/* WhatsApp logo */}
            <img
              src="/img/wa.webp"
              alt="WhatsApp"
              className="w-full h-full object-contain relative z-10"
            />
          </div>
          

          <div className="absolute top-1 right-1 md:top-1.5 md:right-1.5 w-4 h-4 md:w-5 md:h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-20">
            <span className="text-white text-xs font-bold">1</span>
          </div>

          <div className="absolute -top-12 right-0 bg-gray-800 text-white text-sm md:text-sm px-2 py-1 md:px-3 md:py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md">
            Chat with us
            <div className="absolute bottom-0 right-2 md:right-3 w-2 h-2 md:w-3 md:h-3 bg-gray-800 transform rotate-45 -mb-1 md:-mb-1.5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppButton;