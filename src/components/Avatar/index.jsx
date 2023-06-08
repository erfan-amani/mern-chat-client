import React from "react";

const Avatar = ({ user, withDetail = false }) => {
  return (
    <div className="flex gap-2">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-400 text-white">
        {user.username?.[0]?.toUpperCase?.() || "U"}
      </div>

      {withDetail && (
        <div className="flex flex-col items-start justify-between">
          <p className="text-sm font-medium">{user.username}</p>
          <p className="text-xs opacity-80">Nothing yet</p>
        </div>
      )}
    </div>
  );
};

export default Avatar;
