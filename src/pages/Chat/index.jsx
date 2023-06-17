import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import SendMessage from "./components/SendMessage";
import Sidbar from "./components/Sidbar";
import { io } from "socket.io-client";
import { BASE_URL } from "@/library/config";
import { Outlet, useSearchParams } from "react-router-dom";

const Chat = () => {
  const socketRef = useRef();
  const { accessToken: token, user } = useSelector(state => state.auth);
  const [searchParams] = useSearchParams();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState({});
  const activeRoomId = searchParams.get("room");

  const joinRoom = ({ otherUserId, roomId }) => {
    if (roomId) {
      const room = allRooms.find(r => r._id == roomId);
      !!room._id && setActiveRoom(room);
    } else {
      socketRef.current.emit("join_room", { otherUserId, roomId }, room => {
        !!room && setActiveRoom(room);
      });
    }
  };

  useEffect(() => {
    if (!!activeRoomId && activeRoomId !== "undefined" && !!allRooms.length) {
      const room = allRooms.find(r => r._id === activeRoomId);

      !!room?._id && setActiveRoom(room);
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

          if (index !== -1) {
            newList.splice(index, 1);
            newList.unshift(data);
          }

          return newList;
        });

        data._id === activeRoomId && setActiveRoom(data);
      } else {
        setAllRooms(data);

        // const newActive = data.find(r => r._id === activeRoomId);
        // setActiveRoom(newActive);
      }
    });

    socket.on("accept_contact", data => {});

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

      <div className="flex flex-col w-[calc(100%-250px)]">
        <div className="h-[calc(100%-50px)]">
          <Outlet
            context={{
              socket: socketRef.current,
              allRooms,
              activeRoom,
              onlineUsers,
            }}
          />
        </div>

        <SendMessage activeRoom={activeRoom} socket={socketRef.current} />
      </div>
    </div>
  );
};

export default Chat;
