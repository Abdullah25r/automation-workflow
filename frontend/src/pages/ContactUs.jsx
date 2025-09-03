import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPhone, 
  FaEnvelope, 
  FaWhatsapp, 
  FaFacebookF, 
  FaInstagram, 
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaUser,
  FaComment
} from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  const contactMethods = [
    {
      icon: FaPhone,
      title: "Call Us",
      details: "+92 301 4595772",
      description: "Mon to Fri 9am to 6pm",
      action: "tel:+15551234567",
      color: "bg-blue-500"
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      details: "+92 301 4595772",
      description: "24/7 support",
      action: "https://wa.me/+923014595772",
      color: "bg-green-500"
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      details: "support@timepods.com",
      description: "We'll respond quickly",
      action: "mailto:support@timepods.com",
      color: "bg-red-500"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      details: "Lda Block J",
      description: "Come say hello at our office",
      action: "#",
      color: "bg-purple-500"
    }
  ];

  const socialMedia = [
    {
      icon: FaFacebookF,
      name: "Facebook",
      url: "https://facebook.com/timepods",
      color: "hover:text-[#1877F2]",
      bgColor: "bg-[#1877F2]"
    },
    {
      icon: FaInstagram,
      name: "Instagram",
      url: "https://instagram.com/timepods",
      color: "hover:text-[#E4405F]",
      bgColor: "bg-gradient-to-r from-[#fdf497] via-[#fd5949] to-[#d6249f]"
    },
    {
      icon: FaWhatsapp,
      name: "WhatsApp",
      url: "https://wa.me/+923014595772",
      color: "hover:text-[#25D366]",
      bgColor: "bg-[#25D366]"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] text-white pt-24 pb-16">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 px-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Get in <span className="text-cyan-400">Touch</span></h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Have questions about our products? We're here to help and would love to hear from you.
        </p>
      </motion.div>

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Contact Methods Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={index}
                href={method.action}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 text-center group hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${method.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white text-xl" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                <p className="text-cyan-400 font-medium mb-1">{method.details}</p>
                <p className="text-gray-400 text-sm">{method.description}</p>
              </motion.a>
            );
          })}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-green-900/30 border border-green-700/50 p-4 rounded-lg mb-6 text-green-400"
              >
                Thank you! Your message has been sent successfully.
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2">Your Name</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#2a2a2a] border border-[#333] rounded-lg py-3 pl-12 pr-4 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#2a2a2a] border border-[#333] rounded-lg py-3 pl-12 pr-4 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Your Message</label>
                <div className="relative">
                  <FaComment className="absolute left-4 top-4 text-gray-500" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full bg-[#2a2a2a] border border-[#333] rounded-lg py-3 pl-12 pr-4 text-white focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
              </div>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold py-4 rounded-lg flex items-center justify-center space-x-2 hover:from-cyan-700 hover:to-blue-700 transition-all"
              >
                <span>Send Message</span>
                <FaPaperPlane className="text-sm" />
              </motion.button>
            </form>
          </motion.div>

          {/* Additional Info & Social Media */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-8"
          >
            {/* Business Hours */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Business Hours</h2>
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <FaClock className="text-cyan-400 mr-4" />
                  <div>
                    <p className="font-medium">Monday - Friday</p>
                    <p className="text-gray-400">9:00 AM - 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-300">
                  <FaClock className="text-cyan-400 mr-4" />
                  <div>
                    <p className="font-medium">Saturday</p>
                    <p className="text-gray-400">10:00 AM - 4:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-300">
                  <FaClock className="text-cyan-400 mr-4" />
                  <div>
                    <p className="font-medium">Sunday</p>
                    <p className="text-gray-400">Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
              <p className="text-gray-400 mb-6">
                Stay connected with us on social media for the latest updates, promotions, and behind-the-scenes content.
              </p>
              
              <div className="space-y-4">
                {socialMedia.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 5 }}
                      className="flex items-center p-4 bg-[#2a2a2a] rounded-lg group hover:bg-[#2a2a2a]/80 transition-colors"
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${social.bgColor} mr-4`}>
                        <Icon className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold group-hover:text-cyan-400 transition-colors">{social.name}</p>
                        <p className="text-gray-400 text-sm">Follow us for updates</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Quick Response</h2>
              <p className="text-gray-300">
                We typically respond to all inquiries within <span className="text-cyan-400 font-semibold">24 hours</span> during business days. For urgent matters, please call us directly.
              </p>
            </div>
          </motion.div>
        </div>

        {/* FAQ Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16 pt-12 border-t border-[#2a2a2a]"
        >
          <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
          <p className="text-gray-400 mb-6">
            Check out our frequently asked questions or reach out to us directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/faqs"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-[#2a2a2a] text-white rounded-lg font-medium hover:bg-[#2a2a2a]/80 transition-colors"
            >
              Visit FAQ Section
            </motion.a>
            <motion.a
              href="tel:+15551234567"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors flex items-center justify-center"
            >
              <FaPhone className="mr-2" />
              Call Now
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;