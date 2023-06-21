import {
  PhoneIcon,
  VideoCameraIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Avatar from "@/components/Avatar";
import axios from "@/library/http";
import Loading from "./Loading";

function Header() {
  const { onlineUsers } = useOutletContext();
  const { roomId } = useParams();
  const [otherUser, setOtherUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getOtherUser = async () => {
      setLoading(true);

      try {
        const response = await axios.get("room/users", {
          params: { id: roomId },
        });

        setOtherUser(response.data?.[0]);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    !!roomId && getOtherUser();
  }, []);

  return (
    <div className="p-3 border-b-2 border-indigo-100 w-full h-[66px]">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex items-center justify-between">
          <Avatar
            user={otherUser || {}}
            onlineBadge={onlineUsers.find(ou => ou._id === otherUser._id)}
            withDetail
          />

          <div className="flex gap-5 items-center">
            <button>
              <PhoneIcon className="w-5 h-5" />
            </button>
            <button>
              <VideoCameraIcon className="w-5 h-5" />
            </button>
            <button>
              <EllipsisVerticalIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
