import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-between animate-pulse">
      <div className="flex gap-2">
        <div className="bg-slate-300 w-10 h-10 rounded-full" />

        <div className="flex flex-col justify-between">
          <div className="bg-slate-300 w-16 h-5 rounded" />
          <div className="bg-slate-300 w-32 h-4 rounded" />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="bg-slate-300 w-8 h-8 rounded-full" />
        <div className="bg-slate-300 w-8 h-8 rounded-full" />
        <div className="bg-slate-300 w-8 h-8 rounded-full" />
      </div>
    </div>
  );
};

export default Loading;
