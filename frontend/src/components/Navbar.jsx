import React, { useState, useContext, useRef, useEffect } from "react";
import { HiOutlineX } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import Cart from "../pages/Cart";
import { cartContext } from "../Context/CartContext";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { items, isCartOpen, openCart, closeCart } = useContext(cartContext);
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const menuRef = useRef();
  const hamburgerRef = useRef();

  const cartCount = items.reduce((acc, item) => acc + item.count, 0);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Animation variants
  const menuContainerVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.2
      }
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.01,
        duration: 0.2
      }
    }
  };

  const menuItemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.2
      }
    }
  };

  const iconVariants = {
    open: { rotate: 180, scale: 1.1 },
    closed: { rotate: 0, scale: 1 }
  };

  // Function to check if a path is active
  const isActivePath = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-2 z-50 bg-gradient-to-r from-[#1a1a1a] to-[#000000] text-[#ced4da] px-4 sm:px-6 md:px-6 shadow-md laptop:mx-7 rounded-xl mx-2">
      <div className="max-w-7xl mx-auto py-3 md:py-4 laptop:py-4">
        {/* Desktop View */}
        <div className="hidden laptop:flex justify-between items-center">
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

          <nav className="flex gap-6 text-sm laptop:text-[16px] font-poppins font-medium">
            <NavLink
              to="/"
              onClick={() => {window.scrollTo(0,0)}}
              className={({ isActive }) => 
                `hover:text-white transition p-2 rounded-md ${
                  isActive ? "bg-[#2a2a2a] text-white" : "hover:bg-[#1a1a1a]"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/Products"
              onClick={() => {window.scrollTo(0,0)}}
              className={({ isActive }) => 
                `hover:text-white transition p-2 rounded-md ${
                  isActive ? "bg-[#2a2a2a] text-white" : "hover:bg-[#1a1a1a]"
                }`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => {window.scrollTo(0,0)}}
              className={({ isActive }) => 
                `hover: text-white transition p-2 rounded-md ${
                  isActive ? "bg-[#2a2a2a] text-white" : "hover:bg-[#1a1a1a]"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => {window.scrollTo(0,0)}}
              className={({ isActive }) => 
                `hover:text-white transition p-2 rounded-md ${
                  isActive ? "bg-[#2a2a2a] text-white" : "hover:bg-[#1a1a1a]"
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          <div className="flex items-center gap-4">
            <button className="px-4 py-1 border border-[#64748b] rounded-md hover:bg-white hover:text-black transition font-semibold text-base">
              Sign In
            </button>
            <div className="relative">
              <button
                onClick={openCart} 
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
              <Cart isOpen={isCartOpen} onClose={closeCart} />
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="laptop:hidden flex items-center justify-between">
          <motion.button
            ref={hamburgerRef}
            onClick={toggleMenu}
            className="text-2xl hover:text-white p-2"
            aria-label="Toggle Menu"
            animate={menuOpen ? "open" : "closed"}
            variants={iconVariants}
            transition={{ duration: 0.3 }}
          >
            {menuOpen ? <HiOutlineX /> : <RxHamburgerMenu />}
          </motion.button>

          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-center"
          >
            <img src="./img/logo.gif" alt="Logo" className="h-6 sm:h-7" />
            <span className="font-kanit text-lg ml-2 text-[#ced4da]">
              TimePods
            </span>
          </Link>

          {/* Cart Icon on Right */}
          <div className="relative">
            <button
              onClick={openCart} 
              className="text-2xl hover:text-white p-2"
              aria-label="Open Cart"
            >
              <ShoppingBag />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <Cart isOpen={isCartOpen} onClose={closeCart} />
          </div>
        </div>

        {/* Animated Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              ref={menuRef}
              className="laptop:hidden overflow-hidden"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuContainerVariants}
            >
              <motion.nav
                className="flex flex-col space-y-2 text-sm font-medium font-poppins pt-2 pb-4"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
              >
                <motion.div variants={menuItemVariants}>
                  <Link
                    to="/"
                    className={`block transition p-2 rounded-md ${
                      isActivePath("/") 
                        ? "bg-[#2a2a2a] text-white" 
                        : "hover:text-white hover:bg-[#1a1a1a]"
                    }`}
                    onClick={toggleMenu}
                  >
                    Home
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants}>
                  <Link
                    to="/Products"
                    className={`block transition p-2 rounded-md ${
                      isActivePath("/Products") 
                        ? "bg-[#2a2a2a] text-white" 
                        : "hover:text-white hover:bg-[#1a1a1a]"
                    }`}
                    onClick={toggleMenu}
                  >
                    Products
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants}>
                  <Link
                    to="/about"
                    className={`block transition p-2 rounded-md ${
                      isActivePath("/about") 
                        ? "bg-[#2a2a2a] text-white" 
                        : "hover:text-white hover:bg-[#1a1a1a]"
                    }`}
                    onClick={toggleMenu}
                  >
                    About
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants}>
                  <Link
                    to="/contact"
                    className={`block transition p-2 rounded-md ${
                      isActivePath("/contact") 
                        ? "bg-[#2a2a2a] text-white" 
                        : "hover:text-white hover:bg-[#1a1a1a]"
                    }`}
                    onClick={toggleMenu}
                  >
                    Contact
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants}>
                  <button
                    className="w-full border border-[#64748b] py-2 rounded-md hover:bg-white hover:text-black transition font-semibold"
                    onClick={() => {
                      toggleMenu();
                      navigate("/signin");
                    }}
                  >
                    Sign In
                  </button>
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Navbar;