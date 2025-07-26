import React, { useState, useContext } from "react";
import {  HiOutlineX } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../pages/Cart";
import { cartContext } from "../Context/CartContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const cartProduct = useContext(cartContext);
  const cartCount = cartProduct.items.reduce((acc, item) => acc + item.count, 0);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  return (
    <header className="sticky top-2 z-50 bg-gradient-to-r from-[#1a1a1a] to-[#000000] text-[#ced4da] px-4 sm:px-6 md:px-6 shadow-md laptop:mx-7 rounded-xl mx-2">
      <div className="max-w-7xl mx-auto py-3 md:py-4 laptop:py-4">

        {/* Desktop View */}
        <div className="hidden laptop:flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src="./img/logo.gif" alt="TimePods Logo" className="h-6 sm:h-7 laptop:h-8" />
            <span className="font-kanit text-lg sm:text-xl laptop:text-2xl ml-2 text-[#ced4da] hover:text-[#ffffff] transition tracking-wider">
              TimePods
            </span>
          </Link>

          <nav className="flex gap-6 text-sm laptop:text-[16px] font-poppins font-medium">
            <Link to="/" className="hover:text-white transition hover:bg-[#1a1a1a] p-2 rounded-md">Home</Link>
            <Link to="/Products" className="hover:text-white transition hover:bg-[#1a1a1a] p-2 rounded-md">Products</Link>
            <Link to="/devices" className="hover:text-white transition hover:bg-[#1a1a1a] p-2 rounded-md">Smart Watches</Link>
            <Link to="/news" className="hover:text-white transition hover:bg-[#1a1a1a] p-2 rounded-md">Accessories</Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="px-4 py-1 border border-[#64748b] rounded-md hover:bg-white hover:text-black transition font-semibold text-base">
              Sign In
            </button>
            <div className="relative">
              <button
                onClick={handleOpenCart}
                className="text-2xl hover:text-white transition hover:bg-[#1a1a1a] p-2 rounded-md"
                aria-label="Open Cart"
              >
                <FiShoppingCart />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <Cart isOpen={isCartOpen} onClose={handleCloseCart} />
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="laptop:hidden flex items-center justify-between">
          
          <button
            onClick={toggleMenu}
            className="text-2xl hover:text-white p-2"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <HiOutlineX /> : <RxHamburgerMenu />
}
          </button>

          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <img src="./img/logo.gif" alt="Logo" className="h-6 sm:h-7" />
            <span className="font-kanit text-lg ml-2 text-[#ced4da]">TimePods</span>
          </Link>

          {/* Cart Icon on Right */}
          <div className="relative">
            <button
              onClick={handleOpenCart}
              className="text-2xl hover:text-white p-2"
              aria-label="Open Cart"
            >
              <FiShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <Cart isOpen={isCartOpen} onClose={handleCloseCart} />
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="laptop:hidden mt-4 flex flex-col space-y-2 text-sm font-medium font-poppins">
            <Link to="/" className="hover:text-white transition p-2 rounded-md" onClick={toggleMenu}>Home</Link>
            <Link to="/Products" className="hover:text-white transition p-2 rounded-md" onClick={toggleMenu}>Products</Link>
            <Link to="/devices" className="hover:text-white transition p-2 rounded-md" onClick={toggleMenu}>Smart Watches</Link>
            <Link to="/news" className="hover:text-white transition p-2 rounded-md" onClick={toggleMenu}>Accessories</Link>
            <button className="border border-[#64748b] py-1 rounded-md hover:bg-white hover:text-black transition font-semibold" onClick={() => { toggleMenu(); navigate("/signin"); }}>
              Sign In
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;
