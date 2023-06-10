import OwnMessage from "./OwnMessage";
import OthersMessage from "./OthersMessage";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const user = useSelector(state => state.auth.user);

  if (!message) return null;

  return user._id === message.sender ? (
    <OwnMessage message={message} />
  ) : (
    <OthersMessage message={message} />
  );
};

export default Message;
