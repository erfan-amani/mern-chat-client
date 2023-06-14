import { PaperClipIcon, MicrophoneIcon } from "@heroicons/react/24/outline";

const SendMessage = ({ socket, activeRoom }) => {
  const onSubmit = event => {
    event.preventDefault();

    const inputEl = event.target.message;
    const text = inputEl.value;

    if (!text) return;

    // reset input
    inputEl.value = "";
    inputEl.focus();

    // send message
    socket.emit("sendMessage", { text, room: activeRoom._id });
  };

  return (
    <div>
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
