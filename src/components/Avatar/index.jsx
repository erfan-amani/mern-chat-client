import React from "react";
import { getAvatarColor } from "@/library/helper";

const Avatar = ({
  user,
  desc = "Nothing yet",
  withDetail = false,
  onlineBadge = false,
  big = false,
}) => {
  return (
    <div className="flex gap-2">
      <div className="relative">
        {onlineBadge && (
          <div
            className={`absolute w-${big ? "4" : "3"} h-${
              big ? "4" : "3"
            } rounded-full bg-green-400 border border-white bottom-0 right-0`}
          />
        )}
        <div
          className={`flex items-center justify-center  w-${
            big ? "20" : "10"
          } h-${big ? "20" : "10"} rounded-full text-white ${getAvatarColor(
            user._id,
            user.createdAt
          )}`}
        >
          {user.username?.[0]?.toUpperCase?.() || "U"}
        </div>
      </div>

      {withDetail && (
        <div className="flex flex-col items-start justify-between">
          <p className="text-sm font-medium">{user.username}</p>
          <p className="text-xs opacity-80">{desc}</p>
        </div>
      )}
    </div>
  );
};

export default Avatar;
