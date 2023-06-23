import { useContext, useEffect } from "react";
import { SocketContext } from "@/context/socket/SocketContext";
import { useDispatch } from "react-redux";
import { newNotification } from "@/store/reducers/auth/authSlice";
import notificationSound from "@/assets/sounds/notification.mp3";

const useNotification = () => {
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    socket.on("notification", data => {
      dispatch(newNotification());

      const audio = new Audio(notificationSound);
      audio.play();
    });
  }, [socket]);
};

export default useNotification;
