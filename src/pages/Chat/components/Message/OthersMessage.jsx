import React from "react";
import moment from "moment";

const OthersMessage = ({ message }) => {
  return (
    <div className="w-fit self-end">
      <div className="flex flex-col gap-1 py-[6px] pl-3 pr-4 bg-indigo-100 rounded-xl rounded-tr-none min-w-[100px]">
        <div>
          <p className="text-sm">{message.text}</p>
        </div>

        <span className="text-[0.7rem] w-fit self-start">
          {moment(message.createdAt).format("HH:mm a")}
        </span>
      </div>
    </div>
  );
};

export default OthersMessage;
