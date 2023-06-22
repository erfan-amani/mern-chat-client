import React from "react";

const Loading = () => {
  return (
    <div className="animate-pulse flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="w-40 h-8 bg-slate-300 rounded" />

        <div className="w-20 h-4 bg-slate-300 rounded" />
      </div>

      <div className="min-h-[200px]">
        <div className="flex flex-col gap-3">
          <div className="w-full h-14 bg-slate-300 rounded" />
          <div className="w-full h-14 bg-slate-300 rounded" />
          <div className="w-full h-14 bg-slate-300 rounded" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
