import React from "react";

const Loading = () => {
  return (
    <div className="animate-pulse flex flex-col gap-8">
      <div className="flex gap-1">
        <div className="w-8 h-8 bg-slate-300 rounded" />
        <div className="w-36 h-8 bg-slate-300 rounded" />
      </div>

      <div className="flex flex-col gap-3">
        <div className="w-40 h-4 bg-slate-300 rounded" />
        <div className="w-full h-36 bg-slate-300 rounded" />
      </div>
    </div>
  );
};

export default Loading;
