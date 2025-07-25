import React, { useState } from 'react';
import Sidebar from '../components/Admin/Sidebar';
import DashboardContent from '../components/Admin/DashboardContent';

const Dashboard = () => {
  const [current, setCurrent] = useState('dashboard');

  return (
    <div className="flex h-full">
      <Sidebar current={current} onSelect={setCurrent} />
      <div className="flex-1 p-6">
        <DashboardContent selected={current} />
      </div>
    </div>
  );
};

export default Dashboard;
