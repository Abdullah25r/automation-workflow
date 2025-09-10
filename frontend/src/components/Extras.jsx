import React from "react";
import { MdVerified, MdReplay } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { HiThumbUp } from "react-icons/hi";

function Extras() {
  const icons = [
    { 
      icon: MdVerified, 
      label: "1 Year Warranty",
      description: "Comprehensive protection for your purchase"
    },
    { 
      icon: MdReplay, 
      label: "7 Days Return",
      description: "Hassle-free returns within a week"
    },
    { 
      icon: FaTruck, 
      label: "Free Delivery",
      description: "Fast shipping at no extra cost"
    },
    { 
      icon: HiThumbUp, 
      label: "1000+ Customers",
      description: "Trusted by satisfied customers worldwide"
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 md:px-8 lg:px-12 bg-[#1a1a1a] rounded-xl w-full max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-600 to-sky-400">Us</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          We're committed to providing exceptional value and service to all our customers
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {icons.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              className="group flex flex-col items-center text-center p-8 bg-[#2a2a2a] rounded-lg transition-all duration-300 hover:bg-[#2d2d2d] border border-[#3a3a3a]"
            >
              {/* Icon container */}
              <div className="mb-6 p-4 rounded-full bg-[#3a3a3a] group-hover:bg-[#404040] transition-colors duration-300">
                <IconComponent size={32} className="text-white" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3">{item.label}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.description}</p>
              
              {/* Separator */}
              <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 via-cyan-600 to-sky-400 mt-auto"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Extras;