import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaArrowRight } from "react-icons/fa";
import { motion } from 'framer-motion';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      // Simulate API call
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="bg-[#0a0a0a] text-white mt-20 border-t border-[#2a2a2a]">
      {/* Top Gradient Line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-12"></div>

      <div className="px-6 md:px-20 pb-8">
        {/* Logo Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-start mb-12"
        >
          <Link to="/" className="flex items-center group">
            <motion.img 
              src="./img/logo.gif" 
              alt="TimePods Logo" 
              className="h-10 group-hover:scale-110 transition-transform duration-300" 
              whileHover={{ rotate: 5 }}
            />
            <span className="font-kanit text-2xl ml-3 text-[#d1d5db] group-hover:text-white transition-all tracking-wider">
              TimePods
            </span>
          </Link>
        </motion.div>

        {/* Grid Section */}
        <div className="grid md:grid-cols-3 gap-12 text-sm mb-12">
          {/* Customer Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="font-semibold text-lg mb-6 text-cyan-400">Customer Services</h2>
            <ul className="space-y-3">
              {['Contact Us', 'Delivery Info', 'FAQs'].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link 
                    to={item === 'FAQs' ? '/faqs' : '#'} 
                    className="text-gray-400 hover:text-cyan-400 font-medium transition-colors duration-300 flex items-center group"
                  >
                    <FaArrowRight className="mr-2 text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity text-xs" />
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-semibold text-lg mb-6 text-cyan-400">Information</h2>
            <ul className="space-y-3">
              {[
                { name: 'About TimePods', path: '/about' },
                { name: 'Return & Refund', path: '/return-refund' },
                { name: 'Privacy Policy', path: '/privacy-policy' },
                { name: 'Terms & Conditions', path: '/terms-conditions' }
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link 
                    to={item.path} 
                    className="text-gray-400 hover:text-cyan-400 font-medium transition-colors duration-300 flex items-center group"
                  >
                    <FaArrowRight className="mr-2 text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity text-xs" />
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="font-semibold text-lg mb-6 text-cyan-400">Stay Updated</h2>
            <p className="text-sm mb-4 text-gray-400">Get the latest offers and promotions!</p>
            
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-900/30 border border-green-700/50 p-3 rounded-md text-green-400 text-sm"
              >
                Thank you for subscribing! 🎉
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="p-3 bg-[#1a1a1a] border border-[#2a2a2a] text-white w-full rounded-md outline-none focus:border-cyan-500/50 transition-colors placeholder-gray-500"
                    required
                  />
                </div>
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.001 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold py-3 rounded-md hover:from-cyan-700 hover:to-blue-700 transition-all flex items-center justify-center"
                >
                  Subscribe
                  <FaArrowRight className="ml-2 text-xs" />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Social Icons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-between items-center mt-2 pt-4 border-t border-[#2a2a2a]"
        >
          <div className="flex space-x-5">
            {[
              { icon: FaFacebookF, color: 'hover:text-[#1877F2]' },
              { icon: FaInstagram, color: 'hover:text-[#E4405F]' },
            ].map((SocialIcon, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-[#1a1a1a] p-3 rounded-full cursor-pointer transition-colors duration-300"
              >
                <SocialIcon.icon className={`text-xl text-gray-400 ${SocialIcon.color} transition-colors`} />
              </motion.div>
            ))}
          </div>
          
          {/* Back to top button */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-400 hover:text-cyan-400 text-sm flex items-center transition-colors mr-10"
          >
            Back to top
          </motion.button>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full text-center text-gray-500 text-xs mt-2 pt-2 border-t border-[#2a2a2a]"
        >
          © {new Date().getFullYear()} TimePods. All rights reserved. 
         
        </motion.div> 
      </div>
    </div>
  );
}

export default Footer;