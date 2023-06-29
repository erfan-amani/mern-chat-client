import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import axios from "@/library/http";
import Avatar from "@/components/Avatar";
import { isOnline } from "@/library/helper";
import moment from "moment";
import { toast } from "react-toastify";
import UserProfileLoading from "./Loading";

const UserProfile = () => {
  const navigate = useNavigate();
  const { onlineUsers = [] } = useOutletContext() || {};
  const { userId: otherUserId } = useParams();
  const [user, setUser] = useState({});
  const [initLoading, setInitLoading] = useState();
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState({});

  const sendContactRequest = async () => {
    setLoading(true);

    try {
      const response = await axios.post("room/contact", { other: otherUserId });

      setRoom(response.data);

      toast.success("Request successfully sent.");
      setLoading(false);
    } catch (err) {
      toast.error("Request not sent! Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!otherUserId) return;

    const init = async () => {
      setInitLoading(true);

      try {
        const userResponse = await axios.get(`user/${otherUserId}`);
        setUser(userResponse.data);

        const roomResponse = await axios.get("room", {
          params: { other: otherUserId },
        });
        setRoom(roomResponse.data);

        setInitLoading(false);
      } catch (err) {
        toast.error("User not found!");
        navigate("/chat");
      }
    };

    init();
  }, [otherUserId]);

  return (
    <div className="h-screen w-[calc(100%-300px)]">
      <div className="flex items-center justify-center h-full">
        <div className="min-w-[300px] px-8 py-10 bg-indigo-50 rounded-xl">
          {initLoading ? (
            <UserProfileLoading />
          ) : (
            <div className="flex flex-col gap-4 items-center justify-center">
              <Avatar
                user={user}
                big
                onlineBadge={isOnline(onlineUsers, user)}
              />

              <div className="flex flex-col items-center justify-center">
                <p className="text-xl font-medium">{user.username}</p>
                <p className="text-xs opacity-50">
                  Joined At {moment(user.createdAt).format("DD MMMM YYYY")}
                </p>
              </div>

              {room._id && !room.pending ? (
                <Link
                  to={`/chat/message/${room._id}`}
                  className={`mt-4 ${
                    loading
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-indigo-500"
                  } text-white px-6 py-2 rounded-md`}
                >
                  Message
                </Link>
              ) : (
                <>
                  <p className="text-sm mt-4 opacity-80">
                    Account is private! Only contacts can send message.
                  </p>
                  <button
                    disabled={loading || room.pending}
                    onClick={sendContactRequest}
                    className={`mt-4 ${
                      loading
                        ? "bg-slate-400 cursor-not-allowed"
                        : "bg-indigo-500"
                    } text-white px-6 py-2 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed`}
                  >
                    {loading
                      ? "Loading..."
                      : room.pending
                      ? "Request sent"
                      : "Send request"}
                  </button>{" "}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
