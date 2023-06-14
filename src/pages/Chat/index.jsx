import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Messages from "./components/Messages";
import SendMessage from "./components/SendMessage";
import Sidbar from "./components/Sidbar";
import { io } from "socket.io-client";
import { BASE_URL } from "@/library/config";
import { useSearchParams } from "react-router-dom";

const Chat = () => {
  const socketRef = useRef();
  const { accessToken: token, user } = useSelector(state => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState({});
  const activeRoomId = searchParams.get("room");

  const joinRoom = otherUserId => {
    const room = allRooms.find(
      ({ users = [] }) =>
        users.includes(otherUserId) && users.includes(user._id)
    );

    if (!room) {
      socketRef.current.emit("join", { otherUserId }, createdRoom => {
        setActiveRoom(createdRoom);
        setSearchParams({ room: createdRoom._id });
      });
    } else {
      setActiveRoom(room);
      setSearchParams({ room: room._id });
    }
  };

  useEffect(() => {
    if (!!activeRoomId && activeRoomId !== "undefined" && !!allRooms.length) {
      const room = allRooms.find(r => r._id === activeRoomId);

      !!room._id && setActiveRoom(room);
    }
  }, [activeRoomId, allRooms]);

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

    socket.on("onlineUsers", users => {
      setOnlineUsers(users);
    });

    socket.on("activeRooms", data => {
      const isSingle = data.length === undefined;

      if (isSingle) {
        setAllRooms(prev => {
          const newList = [...prev];
          const index = newList.findIndex(r => r._id === data._id);
          newList.splice(index, 1);
          newList.unshift(data);

          return newList;
        });

        data._id === activeRoomId && setActiveRoom(data);
      } else {
        setAllRooms(data);

        const newActive = data.find(r => r._id === activeRoomId);
        setActiveRoom(newActive);
      }
    });

    socket.on("connect_error", err => {
      console.log(err.message);
    });
  }, [token]);

  return (
    <div className="flex w-screen h-screen">
      <div className="w-[250px] bg-indigo-50">
        <Sidbar
          onlineUsers={onlineUsers}
          allRooms={allRooms}
          activeRoom={activeRoom}
          joinRoom={joinRoom}
        />
      </div>

      {!activeRoom?._id ? (
        <div className="text-center self-center justify-self-center  w-[calc(90%-250px)] mx-auto">
          <p>
            No room selected! Please select a chat from sidebar to start
            chating.
          </p>
        </div>
      ) : (
        <div className="flex flex-col w-[calc(100%-250px)]">
          <div className="h-[calc(100%-50px)]">
            <Messages
              activeRoom={activeRoom}
              socket={socketRef.current}
              onlineUsers={onlineUsers}
            />
          </div>

          <div className="h-[50px] p-4 border-t-2 border-indigo-100">
            <SendMessage activeRoom={activeRoom} socket={socketRef.current} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
