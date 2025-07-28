import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Admin/Sidebar";
import DashboardContent from "../components/Admin/DashboardContent";

const Dashboard = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("dashboard");
  const [loading, setLoading] = useState(true); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/admin/dashboard-data", {
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
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) return null; // Shouldn't happen, but safe

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar current={current} onSelect={setCurrent} />
      <div className="flex-1 p-6">
        <DashboardContent selected={current} />
      </div>
    </div>
  );
};

export default Dashboard;
