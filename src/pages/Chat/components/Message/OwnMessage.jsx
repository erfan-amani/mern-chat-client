import React from "react";
import moment from "moment";

const OwnMessage = ({ message }) => {
  return (
    <div className="w-fit">
      <div className="flex flex-col gap-1 py-[6px] pr-2 pl-4 bg-slate-200 rounded-xl rounded-tl-none min-w-[100px]">
        <div>
          <p className="text-sm">{message.text}</p>
        </div>

        <span className="text-[0.7rem] w-fit self-end opacity-50">
          {moment(message.createdAt).format("HH:mm a")}
        </span>
      </div>
    </div>
  );
};

export default OwnMessage;
