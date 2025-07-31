import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Admin/Sidebar";
import DashboardContent from "../components/Admin/DashboardContent";
import { baseURL } from "../Api/productapi";
import { Menu, X } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Initialize sidebar open based on screen width for a better initial experience
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    // Adjust sidebar state on window resize
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // Tailwind's 'lg' breakpoint
        setIsSidebarOpen(true); // Sidebar always open on large screens
      } else {
        setIsSidebarOpen(false); // Sidebar closed by default on small screens
      }
    };

    window.addEventListener('resize', handleResize);

    // Authentication check
    axios
      .get(`${baseURL}/api/admin/dashboard-data`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Welcome admin:", res.data);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Not authenticated:", err.response?.data?.message);
        navigate("/admin");
      });

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [navigate]); // Add navigate to dependency array for useEffect

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    // Main grid container: sidebar column (16rem) and content column (1fr) on large screens
    <div className="grid h-full bg-black text-white lg:grid-cols-[16rem_1fr]">
      {/* Sidebar component */}
      <Sidebar current={current} onSelect={setCurrent} isOpen={isSidebarOpen} />

      {/* Main content area: This div will hold the toggle button and DashboardContent */}
      {/* It has a general p-6 for overall padding. */}
      {/* The ml-64/ml-0 is removed here; grid takes care of it on large screens. */}
      <div className="relative p-6 transition-all duration-300">
        {/* Toggle button for sidebar */}
        <button
          onClick={toggleSidebar}
          // Position button based on sidebar state (left-64 when open, left-4 when closed)
          // It's fixed, so it floats above content.
          // Hidden on large screens (lg:hidden) because sidebar is always open there.
          className={`fixed top-4 p-2 rounded-full bg-zinc-800 text-white shadow-lg hover:bg-zinc-700 transition-all duration-300 z-50
                      ${isSidebarOpen ? 'left-64' : 'left-4'}
                      lg:hidden`}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* DashboardContent will handle its own top padding based on sidebar state */}
        <DashboardContent selected={current} isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default Dashboard;
