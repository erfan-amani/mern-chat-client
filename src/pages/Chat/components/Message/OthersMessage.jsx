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
    <div className="w-fit" ref={messageRef}>
      <div ref={lastMessageRef}>
        <div className="flex flex-col gap-1 pt-[8px] pb-[6px] pr-2 pl-4 bg-indigo-100 rounded-xl min-w-[100px]">
          <div>
            <p className="text-sm">{message.text}</p>
          </div>

          <span className="text-[0.7rem] w-fit self-end opacity-50">
            {moment(message.createdAt).format("HH:mm a")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OthersMessage;
