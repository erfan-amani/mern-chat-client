import React from "react";

const Loading = () => {
  return (
    <div className="animate-pulse flex justify-between items-center">
      <div className="flex flex-col gap-2 w-full">
        <div className="w-full h-16 bg-neutral-300 rounded-md" />
        <div className="w-full h-16 bg-neutral-300 rounded-md" />
        <div className="w-full h-16 bg-neutral-300 rounded-md" />
      </div>
    </div>
  );
};

export default Loading;
