import {
  PhoneIcon,
  VideoCameraIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import Avatar from "@/components/Avatar";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "@/library/http";

const Messages = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeUser, setActiveUser] = useState({});
  const selectedUserId = searchParams.get("id");

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`user/${selectedUserId}`);
      const data = response.data;
      setActiveUser(data);
    };

    getUser();
  }, [selectedUserId]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b-2 border-indigo-100 w-full">
        <div className="flex items-center justify-between">
          <Avatar user={activeUser} withDetail />

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
