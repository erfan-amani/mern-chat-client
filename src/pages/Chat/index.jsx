import React from "react";
import Messages from "./components/Messages";
import SendMessage from "./components/SendMessage";
import Sidbar from "./components/Sidbar";

const Chat = () => {
  return (
    <div className="flex w-screen h-screen">
      <div className="w-[200px] bg-indigo-50 p-4">
        <Sidbar />
      </div>

      <div className="flex flex-col w-[calc(100%-200px)]">
        <div className="h-[calc(100%-50px)] p-4">
          <Messages />
        </div>

        <div className="h-[50px] p-4">
          <SendMessage />
        </div>
      </div>
    </div>
  );
};

export default Chat;
