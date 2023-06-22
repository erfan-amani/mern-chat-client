import { io } from "socket.io-client";
import { BASE_URL } from "@/library/config";

class SocketClient {
  constructor(token) {
    this.socket = io(BASE_URL, { auth: { token } });
  }

  emit(event, data) {
    this.socket.emit(event, data);
  }
  on(event, callback) {
    this.socket.on(event, callback);
  }
}

export default SocketClient;
