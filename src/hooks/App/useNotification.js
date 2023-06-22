import { useContext, useEffect } from "react";
import { SocketContext } from "@/context/socket/SocketContext";
import { useDispatch } from "react-redux";
import { newNotification } from "@/store/reducers/auth/authSlice";

const useNotification = () => {
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    socket.on("notification", data => {
      dispatch(newNotification());
    });
  }, [socket]);
};

export default useNotification;
