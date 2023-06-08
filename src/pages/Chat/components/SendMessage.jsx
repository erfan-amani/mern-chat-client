import { PaperClipIcon, MicrophoneIcon } from "@heroicons/react/24/outline";

const SendMessage = () => {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <button>
          <PaperClipIcon className="w-5 h-5" />
        </button>

        <div className="flex flex-1">
          <input
            placeholder="Your message"
            className="focus-visible:outline-none w-full text-sm bg-transparent"
          />
        </div>

        <button>
          <MicrophoneIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SendMessage;
