import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import axios from "@/library/http";
import Avatar from "@/components/Avatar";
import { isOnline } from "@/library/helper";
import moment from "moment";

const Request = () => {
  const { setActiveRoom, socket } = useOutletContext();
  const { userId: otherUserId } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const sendRequest = () => {
    setLoading(true);

    socket.emit("contact_request", otherUserId, room => {
      !!room && setActiveRoom(room);

      setLoading(false);
    });
  };

  useEffect(() => {
    if (!otherUserId) return;

    const getUser = async () => {
      const response = await axios.get(`user/${otherUserId}`);
      setUser(response.data);
    };

    getUser();
  }, [otherUserId]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="min-w-[300px] px-8 py-10 bg-indigo-50 rounded-xl">
        <div className="flex flex-col gap-4 items-center justify-center">
          <Avatar user={user} big onlineBadge={isOnline} />

          <div className="flex flex-col items-center justify-center">
            <p className="text-xl font-medium">{user.username}</p>
            <p className="text-xs opacity-50">
              Joined At {moment(user.createdAt).format("DD MMMM YYYY")}
            </p>

            <p className="text-sm mt-4 opacity-80">
              Account is private! Only contacts can send message.
            </p>
          </div>

          <button
            disabled={loading}
            onClick={sendRequest}
            className={`mt-4 ${
              loading ? "bg-slate-400 cursor-not-allowed" : "bg-slate-500"
            } text-white px-6 py-2 rounded-md`}
          >
            {loading ? "Loading..." : "Send Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Request;
