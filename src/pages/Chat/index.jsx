import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import NavSide from "./components/NavSide";
import { useContext } from "react";
import { SocketContext } from "@/context/socket/SocketContext";

const Chat = () => {
  const { socket } = useContext(SocketContext);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.on("online_users", users => {
      setOnlineUsers(users);
    });

    socket.on("connect_error", err => {
      console.log(err.message);
    });

    socket.emit("init");
  }, [socket]);

  return (
    <div className="flex w-screen h-screen">
      <div className="w-[300px] bg-indigo-50">
        <div className="flex">
          <div className="w-[50px] border-2 border-white">
            <NavSide socket={socket} />
          </div>

          <div className="h-screen flex-1">
            <Sidebar socket={socket} onlineUsers={onlineUsers} />
          </div>
        </div>
      </div>

      <Outlet
        context={{
          socket: socket,
          onlineUsers,
        }}
      />
    </div>
  );
};

export default Chat;
