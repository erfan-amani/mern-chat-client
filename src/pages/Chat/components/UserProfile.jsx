import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "@/library/http";
import Avatar from "@/components/Avatar";
import { isOnline } from "@/library/helper";
import moment from "moment";
import { toast } from "react-toastify";

const UserProfile = () => {
  const navigate = useNavigate();
  const { userId: otherUserId } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState({});

  const sendContactRequest = async () => {
    setLoading(true);

    try {
      await axios.post("room/contact", { other: otherUserId });

      toast.success("Request successfully sent.");

      setLoading(false);
    } catch (err) {
      toast.error("Request not sent! Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!otherUserId) return;

    const getUser = async () => {
      try {
        const response = await axios.get(`user/${otherUserId}`);
        setUser(response.data);
      } catch (err) {
        toast.error("User not found!");
        navigate("/chat");
      }
    };

    getUser();
  }, [otherUserId]);

  useEffect(() => {
    const getRoom = async () => {
      try {
        const response = await axios.get("room", {
          params: { other: otherUserId },
        });

        setRoom(response.data);
      } catch (err) {
        toast.error("Chat not found!");
        navigate("/chat");
      }
    };

    getRoom();
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="flex items-center justify-center h-full">
        <div className="min-w-[300px] px-8 py-10 bg-indigo-50 rounded-xl">
          <div className="flex flex-col gap-4 items-center justify-center">
            <Avatar user={user} big onlineBadge={isOnline} />

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
                  loading ? "bg-slate-400 cursor-not-allowed" : "bg-indigo-500"
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
                  disabled={loading}
                  onClick={sendContactRequest}
                  className={`mt-4 ${
                    loading
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-indigo-500"
                  } text-white px-6 py-2 rounded-md`}
                >
                  {loading
                    ? "Loading..."
                    : room.pending
                    ? "Request send"
                    : "Send request"}
                </button>{" "}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
