import { useEffect, useState } from "react";
import {
  PhoneIcon,
  VideoCameraIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import Avatar from "@/components/Avatar";
import { useSearchParams } from "react-router-dom";
import axios from "@/library/http";

const Messages = ({ socket }) => {
  const [otherUser, setOtherUser] = useState({});
  const [searchParams] = useSearchParams();
  const otherUserId = searchParams.get("id");

  useEffect(() => {
    const getOtherUser = async () => {
      try {
        const response = await axios.get(`user/${otherUserId}`);
        const user = response.data;

        if (!!user._id) {
          setOtherUser(user);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (!!otherUserId && otherUserId !== "undefined") {
      getOtherUser();
    }
  }, [otherUserId]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b-2 border-indigo-100 w-full">
        <div className="flex items-center justify-between">
          <Avatar user={otherUser || {}} withDetail />

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
      </div>
      <div className="p-4 flex-1"></div>
    </div>
  );
};

export default Messages;
