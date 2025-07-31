// Sidebar.jsx (Keep as is from previous response)
import React from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { label: 'Dashboard', key: 'dashboard' },
  {
    label: 'Products',
    key: 'products',
    children: [
      { label: 'Pods', key: 'Pods' },
      { label: 'Watch', key: 'Watch' },
      { label: 'Headphone', key: 'Headphone' },
      { label: 'Extras', key: 'Extras' },
    ],
  },
  { label: 'Orders', key: 'orders' },
  { label: 'Customers', key: 'customers' },
  { label: 'Analytics', key: 'analytics' },
  { label: 'Settings', key: 'settings' },
];

function Sidebar({ current, onSelect, isOpen }) {
  return (
    <motion.aside
      className={`h-full bg-black text-white w-64 flex-shrink-0 flex flex-col border-r border-zinc-900 z-40`}
      variants={{
        open: { x: 0, opacity: 1, display: 'flex' },
        closed: { x: '-100%', opacity: 0, transitionEnd: { display: 'none' } }
      }}
      initial={window.innerWidth < 1024 ? "closed" : "open"}
      animate={isOpen ? "open" : "closed"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        position: window.innerWidth < 1024 ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        height: '100vh',
      }}
    >
      <div className="text-2xl font-extrabold py-5 px-7 tracking-widest">TimePods</div>
      <nav className="flex-1">
        <ul className="space-y-5 px-5">
          {navItems.map((item) => (
            <li key={item.key}>
              <button
                className={`w-full flex items-center py-2 px-4 rounded transition-colors text-left font-medium ${
                  current === item.key ? 'bg-zinc-900' : 'hover:bg-zinc-800'
                }`}
                onClick={() => onSelect(item.key)}
              >
                {item.label}
              </button>
              {item.children && (
                <ul className="ml-3 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <li key={child.key}>
                      <button
                        className={`w-full py-1 px-4 rounded text-left font-normal text-zinc-200 ${
                          current === child.key ? 'bg-zinc-800' : 'hover:bg-zinc-900'
                        }`}
                        onClick={() => onSelect(child.key)}
                      >
                        {child.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="text-xs text-zinc-400 px-7 mt-auto">© 2025 Pods Admin</div>
    </motion.aside>
  );
}

export default Sidebar;