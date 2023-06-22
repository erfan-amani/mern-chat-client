import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SocketClient from "./socket";
import { SocketContext } from "./SocketContext";

const SocketContextProvider = ({ children }) => {
  const token = useSelector(state => state.auth.accessToken);
  const [socket, setSocket] = useState();

  useEffect(() => {
    if (!token) return;

    const socketClient = new SocketClient(token);

    setSocket(socketClient.socket);
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
