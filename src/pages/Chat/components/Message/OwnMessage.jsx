import moment from "moment";
import DoubleTick from "@/components/Icons/DoubleTick";
import SingleTick from "@/components/Icons/SingleTick";

const OwnMessage = ({ message, lastMessageRef }) => {
  return (
    <div className="w-fit self-end" ref={lastMessageRef}>
      <div className="flex flex-col gap-1 pt-[8px] pb-[6px] pl-3 pr-2 bg-slate-200 rounded-xl min-w-[100px]">
        <div className="pr-8">
          <p className="text-sm">{message.text}</p>
        </div>

        <div className="flex items-center gap-2 self-end">
          <span className="text-[0.7rem] w-fit opacity-50">
            {moment(message.createdAt).format("HH:mm a")}
          </span>

          {message.read ? (
            <DoubleTick color="#737373" />
          ) : (
            <SingleTick color="#737373" />
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnMessage;
