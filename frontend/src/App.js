import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import News from "./pages/News";
import Devices from "./pages/Devices";
import AboutTimePods from "./components/AboutTimePods";
import ReturnRefundPolicy from "./components/ReturnRefundPolicy";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsConditions";
import Cart from "./pages/Cart";
import ProductDetail from "./components/ProductsComponents/ProductDetail";
import Dashboard from "./pages/Dashboard";
import MobileCart from "./pages/MobileCart";
import Checkout from "./pages/Checkout";
import FAQs from "./components/FAQs";
import Admin from "./pages/Admin";
function App() {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/dashboard");
  const hidecheckoutnav = location.pathname.startsWith("/checkout");
  const hidecheckoutadmin = location.pathname.startsWith("/admin");
  return (
    <div className="min-h-screen text-white bg-black">
      {!hideLayout && !hidecheckoutnav && !hidecheckoutadmin && <Navbar />}
      <div className="max-w-[1430px] mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/news" element={<News />} />
          <Route path="/devices" element={<Devices />} />
          <Route
            path="/cart"
            element={<Cart />}
          />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<AboutTimePods />} />
          <Route path="/return-refund" element={<ReturnRefundPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mobile-cart" element={<MobileCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
