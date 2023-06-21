import OwnMessage from "./OwnMessage";
import OthersMessage from "./OthersMessage";
import { useSelector } from "react-redux";

const Message = ({ message, lastMessageRef, readMessage }) => {
  const user = useSelector(state => state.auth.user);

  if (!message) return null;

  return user._id === message.sender ? (
    <OwnMessage message={message} lastMessageRef={lastMessageRef} />
  ) : (
    <OthersMessage
      message={message}
      lastMessageRef={lastMessageRef}
      readMessage={readMessage}
    />
  );
};

export default Message;
