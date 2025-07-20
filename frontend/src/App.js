import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import News from "./pages/News";
import Devices from "./pages/Devices";
import Footer from "./components/Footer";
import AboutTimePods from "./components/AboutTimePods";
import ReturnRefundPolicy from "./components/ReturnRefundPolicy";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsConditions";
import Cart from "./pages/Cart";
import ProductDetail from "./components/ProductsComponents/ProductDetail"
function App() {
  return (
    <div className="min-h-screen text-white bg-black">
      <Navbar />

      <div className="max-w-[1430px] mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/news" element={<News />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<AboutTimePods />} />
          <Route path="/return-refund" element={<ReturnRefundPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
