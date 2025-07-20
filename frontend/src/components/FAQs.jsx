import React, { useEffect } from "react";

function FAQs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="text-white py-10 px-4 md:px-20">
      <h1 className="text-center font-poppins my-10 text-4xl md:text-5xl font-bold text-white">
        Frequently{" "}
        <span className="bg-gradient-to-b from-white to-cyan-900 bg-clip-text text-transparent">
          Asked Questions
        </span>
      </h1>

      {/* 🔲 One big rounded border for all FAQs */}
      <div className="bg-gray-900/50 backdrop-blur-md border border-cyan-700 rounded-2xl shadow-lg p-8 space-y-6 text-left text-lg text-gray-300 transition duration-300 hover:shadow-cyan-500/30">

        <div>
          <h2 className="font-semibold text-white mb-2">
            1. How do I activate the warranty on my TimePods?
          </h2>
          <p>
            To activate your warranty, retain the warranty card provided at purchase.
            You can also register your product on our website at{" "}
            <a
              href="https://TimePods.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              www.TimePods.com
            </a>{" "}
            for E-Warranty tracking.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-white mb-2">
            2. What should I do if my TimePods stop working within the warranty period?
          </h2>
          <p>
            If your product becomes faulty within one week of purchase and meets the warranty conditions,
            return it with your warranty card or invoice to the store or contact our customer support.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-white mb-2">
            3. Are TimePods water-resistant or waterproof?
          </h2>
          <p>
            TimePods are not water-resistant or waterproof. Any damage due to water, sweat,
            or moisture exposure is not covered under the warranty.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-white mb-2">
            4. Can I replace accessories like cables or mic if they stop working?
          </h2>
          <p>
            Accessories such as cables, microphones, and remotes are not covered under warranty.
            However, replacements can be purchased separately from our authorized resellers.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-white mb-2">
            5. How long does the replacement or repair process take?
          </h2>
          <p>
            We aim to return the product within the committed time. However, delays may happen
            depending on stock or technical issues. We appreciate your patience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FAQs;
