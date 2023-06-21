import { useEffect, useState, useRef } from "react";
import axios from "@/library/http";
import Message from "../SingleMessage";
import { useOutletContext, useParams } from "react-router-dom";
import Loading from "./Loading";

const Body = () => {
  const { socket } = useOutletContext();
  const { roomId } = useParams();
  const lastMessageRef = useRef();
  const containerRef = useRef();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const isSocketConnected = socket?.connected;

  const readMessage = messageId => {
    if (!messageId) return;

    socket.emit("read", messageId, error => {
      if (error) {
        console.log(error);
      }
    });
  };

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

  useEffect(() => {
    const initializeMessages = async () => {
      setLoading(true);

      try {
        const response = await axios.get("/message", {
          params: { room: roomId },
        });
        const data = response.data || [];

        setMessages(data);

        setTimeout(() => {
          containerRef?.current?.scrollTo?.(
            0,
            containerRef?.current?.scrollHeight
          );
        });
        setLoading(false);
      } catch (err) {
        setMessages([]);
        setLoading(false);
      }
    };

    !!roomId && initializeMessages();
  }, [roomId]);

  useEffect(() => {
    if (!isSocketConnected) return;

    socket.on("message", message => {
      !!message && setMessages(prev => [...prev, message]);
    });

    socket.on("message_update", updatedMessage => {
      if (!updatedMessage) return;

      setMessages(prev => {
        const newList = [...prev];
        const index = newList.findIndex(m => m._id === updatedMessage._id);
        newList[index] = updatedMessage;

        return newList;
      });
    });
  }, [isSocketConnected]);

  return (
    <div
      className="flex flex-col [&>div]:mb-3 p-4 max-h-[calc(100vh-116px)] overflow-auto"
      ref={containerRef}
    >
      {loading ? (
        <Loading />
      ) : (
        messages.map((message, index) => (
          <Message
            key={message._id}
            message={message}
            readMessage={readMessage}
            lastMessageRef={
              messages.length === index + 1 ? lastMessageRef : null
            }
          />
        ))
      )}
    </div>
  );
};

export default Body;
