import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Messages from "./components/Messages";
import SendMessage from "./components/SendMessage";
import Sidbar from "./components/Sidbar";
import { io } from "socket.io-client";
import { BASE_URL } from "@/library/config";

const Chat = () => {
  const socketRef = useRef();
  const { accessToken: token, user } = useSelector(state => state.auth);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [room, setRoom] = useState({});

  useEffect(() => {
    const socket = io(BASE_URL, { auth: { token } });
    socketRef.current = socket;

    socket.on("connection", socketClient => {
      socket.current = socketClient;
    });

    socket.on("chatData", users => {
      setOnlineUsers(users);
    });

    socket.on("connect_error", err => {
      console.log(err.message);
    });
  }, [token]);

  return (
    <div className="flex w-screen h-screen">
      <div className="w-[250px] bg-indigo-50">
        <Sidbar onlineUsers={onlineUsers} />
      </div>

      <div className="flex flex-col w-[calc(100%-250px)]">
        <div className="h-[calc(100%-50px)]">
          <Messages room={room} setRoom={setRoom} socket={socketRef.current} />
        </div>

        <div className="h-[50px] p-4 border-t-2 border-indigo-100">
          <SendMessage room={room} socket={socketRef.current} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
