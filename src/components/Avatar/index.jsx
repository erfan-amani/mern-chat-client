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
            className={`absolute rounded-full bg-green-400 border border-white bottom-0 right-0`}
            style={
              big
                ? { width: "16px", height: "16px" }
                : { width: "12px", height: "12px" }
            }
          />
        )}
        <div
          className={`flex items-center justify-center
            rounded-full text-white ${getAvatarColor(
              user._id,
              user.createdAt
            )}`}
          style={
            big
              ? { width: "80px", height: "80px" }
              : { width: "40px", height: "40px" }
          }
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
