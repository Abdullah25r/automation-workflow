import React from 'react';

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white dark:bg-zinc-800 shadow-lg rounded-xl p-6 flex items-center justify-between border border-zinc-100 dark:border-zinc-700 transform hover:scale-105 transition-transform duration-200 ease-in-out">
      <div className="flex flex-col gap-1">
        <div className="text-sm text-zinc-500 dark:text-zinc-400 uppercase font-semibold tracking-wide">{title}</div>
        <div className="text-3xl font-extrabold text-zinc-900 dark:text-white">{value}</div>
      </div>
      {icon && (
        <div className="text-4xl text-indigo-500 dark:text-indigo-400">
          {icon}
        </div>
      )}
    </div>
  );
}

export default StatCard;