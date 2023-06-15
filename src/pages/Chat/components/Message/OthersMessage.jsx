import moment from "moment";
import useIsVisible from "@/hooks/useIsVisible";
import { useRef, useEffect } from "react";

const OthersMessage = ({ message, lastMessageRef, readMessage }) => {
  const messageRef = useRef();
  const isVisible = useIsVisible(messageRef, message.read);

  useEffect(() => {
    if (message.read) return;

    if (isVisible) {
      readMessage(message._id);
    }
  }, [isVisible]);

  return (
    <div className="w-fit self-end" ref={messageRef}>
      <div ref={lastMessageRef}>
        <div className="flex flex-col gap-1 py-[6px] pl-3 pr-4 bg-indigo-100 rounded-xl rounded-tr-none min-w-[100px]">
          <div>
            <p className="text-sm">{message.text}</p>
          </div>

          <span className="text-[0.7rem] w-fit self-start">
            {moment(message.createdAt).format("HH:mm a")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OthersMessage;
