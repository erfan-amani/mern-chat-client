import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import SendMessage from "./components/SendMessage";
import Sidbar from "./components/Sidbar";
import { io } from "socket.io-client";
import { BASE_URL } from "@/library/config";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import NavSide from "./components/NavSide";

const Chat = () => {
  const socketRef = useRef();
  const { accessToken: token } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState({});
  const [sentRequests, setsentRequestss] = useState({});
  const [receivedRequests, setReceivedRequests] = useState({});
  const activeRoomId = searchParams.get("room");

  const joinRoom = roomId => {
    if (!roomId) return;

    const room = allRooms.find(r => r._id == roomId);
    !!room._id && setActiveRoom(room);
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

    socket.on("sent_requests", data => {
      setsentRequestss(data);
    });

    socket.on("receivd_requests", data => {
      setReceivedRequests(data);
    });

    socket.on("connect_error", err => {
      console.log(err.message);
    });
  }, [token]);

  useEffect(() => {
    if (activeRoom._id) {
      navigate(
        activeRoom?.pending
          ? `/request/${activeRoom._id}`
          : `/room/${activeRoom._id}`
      );
    }
  }, [activeRoom._id]);

  return (
    <div className="flex w-screen h-screen">
      <div className="w-[300px] bg-indigo-50">
        <div className="flex">
          <div className="w-[50px] border-2 border-white">
            <NavSide
              sentRequests={sentRequests}
              receivedRequests={receivedRequests}
            />
          </div>

          <div className="h-screen flex-1">
            <Sidbar
              onlineUsers={onlineUsers}
              allRooms={allRooms}
              activeRoom={activeRoom}
              joinRoom={joinRoom}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-[calc(100%-300px)]">
        <div className="h-[calc(100%-50px)]">
          <Outlet
            context={{
              setActiveRoom: setActiveRoom,
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
