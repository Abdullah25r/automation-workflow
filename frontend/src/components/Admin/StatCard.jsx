import React from 'react';

function StatCard({ title, value }) {
  return (
    <div className="bg-white text-black dark:bg-zinc-900 dark:text-white shadow-md rounded-xl p-6 flex flex-col gap-2 border border-zinc-100 dark:border-zinc-800">
      <div className="text-sm text-zinc-500 uppercase font-semibold tracking-widest">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

export default StatCard;
