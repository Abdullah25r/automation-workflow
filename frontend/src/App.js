import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import News from "./pages/News";
import Devices from "./pages/Devices";
import ReturnRefundPolicy from "./components/ReturnRefundPolicy";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsConditions";
import Cart from "./pages/Cart";
import Contact from "./pages/ContactUs";
import ProductDetail from "./components/ProductsComponents/ProductDetail";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About"
import OrderConfirmation from "./pages/OrderConfirmation";
import MobileCart from "./pages/MobileCart";
import Checkout from "./pages/Checkout";
import FAQs from "./components/FAQs";
import { Toaster } from "react-hot-toast";
import WhatsAppButton  from "./components/WhatsAppButton";

import Admin from "./pages/Admin";
function App() {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/dashboard");
  const hidecheckoutnav = location.pathname.startsWith("/checkout");
  const hidecheckoutadmin = location.pathname.startsWith("/admin");

const hideWhatsApp =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen text-white bg-black">
      {!hideLayout && !hidecheckoutnav && !hidecheckoutadmin && <Navbar />}
      <div className="max-w-[1430px] mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/news" element={<News />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/return-refund" element={<ReturnRefundPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mobile-cart" element={<MobileCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            // Base style for all toasts
            className:
              "rounded-xl px-5 py-4 shadow-xl border-l-4 transition-transform duration-500 ease-in-out",
            style: {
              background: "#1f1f1f", // Dark background
              color: "#f1f1f1", // Light text
              transform: "translateX(-20px)", // Slide in from left
            },
            duration: 2500,

            // Custom Success Toast
            success: {
              className:
                "bg-green-600 border-green-400 text-white rounded-xl px-5 py-4 shadow-md",
              iconTheme: {
                primary: "#34d399", // Tailwind green-400
                secondary: "#ffffff",
              },
            },

            // Custom Error Toast
            error: {
              className:
                "bg-red-600 border-red-400 text-white rounded-xl px-5 py-4 shadow-md",
              iconTheme: {
                primary: "#f87171", // Tailwind red-400
                secondary: "#ffffff",
              },
            },
          }}
        />
      </div>
      {!hideWhatsApp && <WhatsAppButton />}
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
