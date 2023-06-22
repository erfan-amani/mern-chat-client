import { PaperClipIcon, MicrophoneIcon } from "@heroicons/react/24/outline";
import { useOutletContext, useParams } from "react-router-dom";

const SendMessage = () => {
  const { socket } = useOutletContext();
  const { roomId } = useParams();

  const onSubmit = event => {
    event.preventDefault();

    if (!roomId) return;

    const inputEl = event.target.message;
    const text = inputEl.value;

    if (!text) return;

    // reset input
    inputEl.value = "";
    inputEl.focus();

    // send message
    socket.emit("send_message", { text, room: roomId });
  };

  return (
    <div className="h-[50px] p-4 border-t-2 border-indigo-100">
      <div className="flex gap-4 items-center">
        <button>
          <PaperClipIcon className="w-5 h-5" />
        </button>
        <form onSubmit={onSubmit} className="flex-1">
          <div className="flex">
            <input
              name="message"
              placeholder="Your message"
              className="focus-visible:outline-none w-full text-sm bg-transparent"
            />
          </div>
        </form>
        <button>
          <MicrophoneIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SendMessage;
