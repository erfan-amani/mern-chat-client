import React from "react";

const UserProfileLoading = () => {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="bg-slate-300 w-20 h-20 rounded-full" />

        <div className="flex flex-col items-center justify-center gap-1">
          <div className="w-40 h-4 bg-slate-300 rounded" />
          <div className="w-64 h-5   bg-slate-300 rounded" />
          <div className="w-32 h-3 bg-slate-300 rounded" />
        </div>

        <div className="h-10 w-28 bg-slate-300 rounded" />
      </div>
    </div>
  );
};

export default UserProfileLoading;
