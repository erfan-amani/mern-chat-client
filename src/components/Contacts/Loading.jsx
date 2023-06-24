import React from "react";

const Loading = () => {
  return (
    <div className="animate-pulse flex justify-between items-center">
      {/* <div className="flex gap-1">
        <div className="w-[40px] h-[40px] bg-slate-300 rounded-full" />

        <div className="flex flex-col gap-1">
          <div className="w-28 h-6 bg-slate-300 rounded" />
          <div className="w-32 h-3 bg-slate-300 rounded" />
        </div>
      </div>

      <div className="w-20 h-8 bg-slate-300 rounded" /> */}

      <div className="flex flex-col gap-2 w-full">
        <div className="w-full h-16 bg-slate-300 rounded-md" />
        <div className="w-full h-16 bg-slate-300 rounded-md" />
        <div className="w-full h-16 bg-slate-300 rounded-md" />
        <div className="w-full h-16 bg-slate-300 rounded-md" />
        <div className="w-full h-16 bg-slate-300 rounded-md" />
      </div>
    </div>
  );
};

export default Loading;
