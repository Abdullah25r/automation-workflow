import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-black text-white mt-20">
      {/* Thin Top Line */}
      <div className="h-[1px] w-full bg-white opacity-30 mb-10 mt-2"></div>

      {/* Logo Section */}
      <div className="px-6 md:px-20 pb-6">
        <div className="flex justify-start mb-10">
          <Link to="/" className="flex items-center">
            <img src="./img/logo.gif" alt="TimePods Logo" className="h-8" />
            <span className="font-kanit text-2xl ml-2 text-[#ced4da] hover:text-white transition tracking-wider">
              TimePods
            </span>
          </Link>
        </div>

        {/* Grid Section */}
        <div className="grid md:grid-cols-3 gap-10 text-sm">
          {/* Customer Services */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Customer Services</h2>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-300 hover:text-white font-medium transition">Contact Us</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white font-medium transition">Delivery Info</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white font-medium transition">FAQs</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Information</h2>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white font-medium transition">About TimePods</Link></li>
              <li><Link to="/return-refund" className="text-gray-300 hover:text-white font-medium transition">Return & Refund</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-300 hover:text-white font-medium transition">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="text-gray-300 hover:text-white font-medium transition">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Subscribe our Newsletter</h2>
            <p className="text-sm mb-2 text-gray-300">Get the latest offers and promotions!</p>
            <div className="flex mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 text-black w-full rounded-l-md outline-none"
              />
              <button className="bg-black text-white border border-white px-4 py-2 rounded-r-md hover:bg-gray-900 transition">
                SUBMIT
              </button>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-start mt-10">
          <div className="flex space-x-4">
            <FaFacebookF className="text-xl hover:text-cyan-600 cursor-pointer" />
            <FaInstagram className="text-xl hover:text-cyan-600 cursor-pointer" />
            <FaWhatsapp className="text-xl hover:text-cyan-600 cursor-pointer" />
          </div>
        </div>

        {/* Bottom Thin Line */}
        <div className="h-[1px] w-full bg-white opacity-20 mt-5 mb-5"></div>

        {/* Copyright */}
        <div className="w-full text-center text-sm">
          Copyright © 2025 TimePods. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;
