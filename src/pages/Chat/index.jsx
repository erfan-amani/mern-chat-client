import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import { io } from "socket.io-client";
import { BASE_URL } from "@/library/config";
import { Outlet } from "react-router-dom";
import NavSide from "./components/NavSide";

const Chat = () => {
  const socketRef = useRef();
  const { accessToken: token } = useSelector(state => state.auth);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // init socket and set listeners
  useEffect(() => {
    const socket = io(BASE_URL, { auth: { token } });
    socketRef.current = socket;

    socket.on("connect", socketClient => {
      socket.current = socketClient;

      socket.emit("joinAll");
    });

    socket.on("newRoom", roomId => {
      socket.emit("join", { roomId });
    });

    socket.on("online_users", users => {
      setOnlineUsers(users);
    });

    socket.on("connect_error", err => {
      console.log(err.message);
    });
  }, [token]);

  return (
    <div className="flex w-screen h-screen">
      <div className="w-[300px] bg-indigo-50">
        <div className="flex">
          <div className="w-[50px] border-2 border-white">
            <NavSide socket={socketRef.current} />
          </div>

          <div className="h-screen flex-1">
            <Sidebar socket={socketRef.current} onlineUsers={onlineUsers} />
          </div>
        </div>
      </div>

      <Outlet
        context={{
          socket: socketRef.current,
          onlineUsers,
        }}
      />
    </div>
  );
};

export default Chat;
