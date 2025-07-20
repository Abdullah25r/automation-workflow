import React, { useEffect } from "react";

function TermsConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="text-white py-10 px-4 md:px-20">
      <h1 className="text-center font-poppins my-20 text-6xl md:text-5xl font-bold text-white">
        Terms & <span className="bg-gradient-to-b from-white to-cyan-900 bg-clip-text text-transparent">Conditions</span>
      </h1>

      <div className="bg-gray-900/50 backdrop-blur-md border border-cyan-700 rounded-2xl shadow-lg p-8 space-y-6 text-left text-lg text-gray-300 transition duration-300 hover:shadow-cyan-500/30">
        <p>
          Your TimePods product includes a warranty card valid for 1 week. To claim the warranty, please present this card. If the card is lost, the original purchase invoice may be required. Without either document, the warranty will be considered void.
        </p>

        <p>
          Warranty claims will not be accepted for the following reasons:
        </p>

        <ul className="list-disc list-inside space-y-1">
          <li>Water or moisture damage</li>
          <li>Physical damage or broken parts</li>
          <li>Damage caused by overcharging or high voltage</li>
          <li>Repairs done outside of authorized service centers</li>
          <li>Removed or broken safety seal on the product</li>
        </ul>

        <p>
          While we aim to return your TimePods product by the committed date, unexpected delays may occur. Please understand that batteries in battery-operated products are not covered under warranty. Similarly, accessories such as microphones, remotes, or cables are not included in the warranty.
        </p>

        <p>
          In case the original TimePods product is unavailable, the company reserves the right to provide an alternative product, subject to any price difference.
        </p>

        <p>
          To verify your product’s E-Warranty, please visit:{" "}
          <a
            href="https://TimePods.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            www.TimePods.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default TermsConditions;
