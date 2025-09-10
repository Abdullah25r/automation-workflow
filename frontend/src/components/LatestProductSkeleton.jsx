import React from "react";

const LatestProductSkeleton = () => (
  <div className="animate-pulse bg-[#2a2a2a] rounded-xl shadow-lg overflow-hidden">
    <div className="h-56 rounded-t-lg bg-[#2a2a2a]"></div>
    <div className="p-5 space-y-2">
      <div className="h-6 rounded bg-[#2a2a2a] w-3/4"></div>
      <div className="h-4 rounded bg-[#2a2a2a] w-1/2"></div>
      <div className="h-6 rounded bg-[#2a2a2a] w-1/2 mx-auto"></div>
    </div>
  </div>
);

export default LatestProductSkeleton;
