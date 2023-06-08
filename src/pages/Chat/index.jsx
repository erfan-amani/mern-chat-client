import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

import Messages from "./components/Messages";
import SendMessage from "./components/SendMessage";
import Sidbar from "./components/Sidbar";
import { BASE_URL } from "@/library/config";

const Chat = () => {
  const token = useSelector(state => state.auth.accessToken);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const socket = io(BASE_URL, {
      auth: {
        token,
      },
    });

    socket.on("chatData", users => {
      setOnlineUsers(users);
    });

    socket.on("connect_error", err => {
      console.log(err.message);
    });
  }, []);

  return (
    <div className="flex w-screen h-screen">
      <div className="w-[250px] bg-indigo-50">
        <Sidbar onlineUsers={onlineUsers} />
      </div>

      <div className="flex flex-col w-[calc(100%-250px)]">
        <div className="h-[calc(100%-50px)]">
          <Messages />
        </div>

        <div className="h-[50px] p-4 border-t-2 border-indigo-100">
          <SendMessage />
        </div>
      </div>
    </div>
  );
};

export default Chat;
