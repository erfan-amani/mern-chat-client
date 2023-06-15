import { useEffect, useState } from "react";
import {
  PhoneIcon,
  VideoCameraIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import Avatar from "@/components/Avatar";
import axios from "@/library/http";
import Message from "./Message";
import { useSelector } from "react-redux";
import { useRef } from "react";

const Messages = ({ socket, activeRoom, onlineUsers }) => {
  const containerRef = useRef();
  const lastMessageRef = useRef();
  const user = useSelector(state => state.auth.user);
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState({});
  const isSocketConnected = socket?.connected;

  const readMessage = messageId => {
    socket.emit("read", messageId, error => {
      if (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    const otherUser = activeRoom?.users?.find?.(u => u?._id !== user?._id);

    const getOtherUser = async () => {
      try {
        const response = await axios.get(`user/${otherUser._id}`);
        const user = response.data;

        if (!!user._id) {
          setOtherUser(user);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (!!otherUser._id) {
      getOtherUser();
    }
  }, [activeRoom]);

  useEffect(() => {
    const initializeMessages = async () => {
      const response = await axios.get("/message", {
        params: { room: activeRoom._id },
      });
      const data = response.data || [];

      setMessages(data);

      setTimeout(() => {
        containerRef?.current?.scrollTo?.(
          0,
          containerRef?.current?.scrollHeight
        );
      });
    };

    if (!!activeRoom._id) initializeMessages();
  }, [activeRoom._id]);

  useEffect(() => {
    if (!isSocketConnected) return;

    socket.on("message", message => {
      if (!!message) setMessages(prev => [...prev, message]);
    });

    socket.on("updateMessage", updatedMessage => {
      setMessages(prev => {
        const newList = [...prev];
        const index = newList.findIndex(m => m._id === updatedMessage._id);
        newList[index] = updatedMessage;

        return newList;
      });
    });
  }, [isSocketConnected]);

  useEffect(() => {
    const containerEl = containerRef.current;
    const lastMessageEl = lastMessageRef.current;

    if (!containerEl || !lastMessageEl) return;

    const lastMessageHeight =
      lastMessageEl.offsetHeight +
      parseFloat(getComputedStyle(lastMessageEl).marginBottom);

    if (
      containerEl.scrollHeight - lastMessageHeight <=
      containerEl.scrollTop + containerEl.offsetHeight
    ) {
      containerEl.scrollTo(0, containerEl.scrollHeight);
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b-2 border-indigo-100 w-full h-[66px]">
        <div className="flex items-center justify-between">
          <Avatar
            user={otherUser || {}}
            onlineBadge={onlineUsers.find(ou => ou._id === otherUser._id)}
            withDetail
          />

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

      <div
        className="flex flex-col [&>div]:mb-3 p-4 max-h-[calc(100vh-116px)] overflow-auto"
        ref={containerRef}
      >
        {messages.map((message, index) => (
          <Message
            key={message._id}
            message={message}
            readMessage={readMessage}
            lastMessageRef={
              messages.length === index + 1 ? lastMessageRef : null
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Messages;
