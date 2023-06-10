import { useEffect, useState } from "react";
import {
  PhoneIcon,
  VideoCameraIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import Avatar from "@/components/Avatar";
import { useSearchParams } from "react-router-dom";
import axios from "@/library/http";
import Message from "./Message";

const Messages = ({ socket, setRoom, room }) => {
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState({});
  const [searchParams] = useSearchParams();
  const otherUserId = searchParams.get("id");
  const isSocketConnected = socket?.connected;

  useEffect(() => {
    const getOtherUser = async () => {
      try {
        const response = await axios.get(`user/${otherUserId}`);
        const user = response.data;

        if (!!user._id) {
          setOtherUser(user);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (!!otherUserId && otherUserId !== "undefined") {
      getOtherUser();
    }
  }, [otherUserId]);

  useEffect(() => {
    const initializeMessages = async () => {
      const response = await axios.get("/message", {
        params: { room: room._id },
      });
      const data = response.data || [];

      setMessages(prev => [...data, ...prev]);
    };

    if (!!room._id) initializeMessages();
  }, [room]);

  useEffect(() => {
    if (!isSocketConnected) return;

    socket.emit("join", otherUserId, room => {
      console.log(`Joined successfully: ${room._id}`);
      setRoom(room);
    });
  }, [otherUserId, isSocketConnected]);

  useEffect(() => {
    if (!isSocketConnected) return;

    socket.on("message", message => {
      console.log({ message });
      if (!!message) setMessages(prev => [...prev, message]);
    });
  }, [isSocketConnected]);

  console.log({ messages });

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b-2 border-indigo-100 w-full">
        <div className="flex items-center justify-between">
          <Avatar user={otherUser || {}} withDetail />

          <div className="flex gap-5 items-center">
            <button>
              <PhoneIcon className="w-5 h-5" />
            </button>
            <button>
              <VideoCameraIcon className="w-5 h-5" />
            </button>
            <button>
              <EllipsisVerticalIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4">
        {messages.map(message => (
          <Message key={message._id} message={message} />
        ))}
      </div>
    </div>
  );
};

export default Messages;
