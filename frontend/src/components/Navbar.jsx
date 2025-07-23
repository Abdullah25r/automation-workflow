import React, { useState, useContext } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import Cart from "../pages/Cart";
import { cartContext } from "../Context/CartContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartProduct = useContext(cartContext);
  const cartCount = cartProduct.items.reduce(
    (acc, item) => acc + item.count,
    0
  );

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  return (
    <header className="sticky top-2 z-50 bg-gradient-to-r from-[#1a1a1a] to-[#000000] text-[#ced4da] px-4 sm:px-6 md:px-6 shadow-md laptop:mx-7 rounded-xl mx-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 md:py-4 laptop:py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="./img/logo.gif"
            alt="TimePods Logo"
            className="h-6 sm:h-7 laptop:h-8"
          />
          <span className="font-kanit text-lg sm:text-xl laptop:text-2xl ml-2 text-[#ced4da] hover:text-[#ffffff] transition tracking-wider">
            TimePods
          </span>
        </Link>

        {/* Desktop Nav (Visible >= 977px) */}
        <nav className="hidden laptop:flex gap-6 text-sm laptop:text-[16px] font-poppins font-medium">
          <Link
            to="/"
            className="hover:text-white transition hover:bg-[#1a1a1a] p-2 rounded-md"
          >
            Home
          </Link>
          <Link
            to="/Products"
            className="hover:text-white transition hover:bg-[#1a1a1a] p-2 rounded-md"
          >
            Products
          </Link>
          <Link
            to="/devices"
            className="hover:text-white transition hover:bg-[#1a1a1a] p-2 rounded-md"
          >
            Smart Watches
          </Link>
          <Link
            to="/news"
            className="hover:text-white transition hover:bg-[#1a1a1a] p-2 rounded-md"
          >
            Accessories
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden laptop:flex items-center gap-3 laptop:gap-4">
          <button className="px-3 py-1 laptop:px-4 laptop:py-1 border border-[#64748b] rounded-md hover:bg-white hover:text-black transition font-semibold text-sm laptop:text-base">
            Sign In
          </button>
          <div className="relative">
            <button
              onClick={handleOpenCart}
              className="text-xl laptop:text-2xl hover:text-white transition hover:bg-[#1a1a1a] p-2 rounded-md"
              aria-label="Open Cart"
            >
              <FiShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          <Cart isOpen={isCartOpen} onClose={handleCloseCart} />
        </div>

        {/* Hamburger Icon (Visible < 976px) */}
        <div className="laptop:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="text-2xl hover:text-white hover:bg-[#1a1a1a] p-2 rounded-md transition"
          >
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`laptop:hidden bg-[#111111] px-6 pt-1 pb-2 space-y-1 rounded-lg font-poppins transition-all duration-300 ease-in-out transform ${
          menuOpen
            ? "max-h-96 opacity-100 scale-y-100"
            : "max-h-0 opacity-0 scale-y-0"
        } overflow-hidden origin-top text-sm`}
      >
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="block hover:text-white transition hover:bg-[#1a1a1a] p-2 text-center rounded-md"
        >
          Home
        </Link>
        <Link
          to="/Products"
          onClick={() => setMenuOpen(false)}
          className="block hover:text-white transition hover:bg-[#1a1a1a] p-2 text-center rounded-md"
        >
          Products
        </Link>
        <Link
          to="/devices"
          onClick={() => setMenuOpen(false)}
          className="block hover:text-white transition hover:bg-[#1a1a1a] text-center p-2 rounded-md"
        >
          Smart Watches
        </Link>
        <Link
          to="/news"
          onClick={() => setMenuOpen(false)}
          className="block hover:text-white transition hover:bg-[#1a1a1a] text-center p-2 rounded-md"
        >
          Accessories
        </Link>
        <div className="flex justify-center gap-10  text-sm laptop:text-base font-poppins font-medium">
          <button
            onClick={() => setMenuOpen(false)}
            className="border border-[#64748b] rounded-md text-sm hover:bg-white hover:text-black transition font-semibold sm:px-12 px-3 "
          >
            Sign In
          </button>
          <div className="flex justify-center pt-2">
            <button
              onClick={handleOpenCart}
              className="text-xl p-2 rounded-md hover:text-white"
            >
              <FiShoppingCart />
              {cartCount > 0 && (
                <span className="absolute mt-[-10px] ml-3 bg-white text-black text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <Cart isOpen={isCartOpen} onClose={handleCloseCart} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
