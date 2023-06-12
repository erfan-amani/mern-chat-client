import {
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Avatar from "@/components/Avatar";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "@/library/http";

const Sidbar = ({ onlineUsers = [], socket }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeRooms, setActiveRooms] = useState();
  const containerRef = useRef();
  const user = useSelector(state => state.auth.user);
  const isSocketConnected = socket?.connected;

  const selectedUserId = searchParams.get("id");

  useEffect(() => {
    const getActiveRooms = async () => {
      const response = await axios.get("room/active");
      const data = response.data;

      setActiveRooms(data);
    };

    getActiveRooms();
  }, []);

  useEffect(() => {
    if (!isSocketConnected) return;

    socket.on("activeRooms", data => {
      const isSingle = data.length === undefined;

      setActiveRooms(prev => {
        if (isSingle) {
          const newList = [...prev];
          const index = newList.findIndex(r => r._id === data._id);
          newList.splice(index, 1);
          newList.unshift(data);

          return newList;
        } else {
          return data;
        }
      });

      console.log(data.length);
    });
  }, [isSocketConnected]);

  return (
    <div className="h-screen flex flex-col">
      <div className="border-b-2 border-white h-[66px]">
        <div className="flex p-3">
          <div className="flex-1">
            <div className="flex gap-2">
              <Avatar user={user} withDetail />
            </div>
          </div>

          <button>
            <div className="p-1 rounded-full w-8 h-8">
              <EllipsisVerticalIcon className="w-full h-full" />
            </div>
          </button>
        </div>
      </div>

      <div className="p-3">
        <div className="flex gap-3 bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 w-full">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />

          <input
            className="focus-visible:outline-none flex-1 bg-gray-50 text-xs"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="p-3">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Online people</p>

            <button>
              <div className="flex gap-[2px] items-center opacity-80">
                <span className="text-xs">More</span>
                <ChevronRightIcon className="w-4 h-4" />
              </div>
            </button>
          </div>

          <div className="w-full overflow-hidden relative">
            <div className="flex gap-3 items-center">
              {onlineUsers?.map(
                u =>
                  u._id !== user?._id && (
                    <button
                      onClick={() => setSearchParams({ id: u._id })}
                      key={u._id}
                    >
                      <div className="flex flex-col gap-1 items-center justify-center">
                        <Avatar user={u} />
                        <p className="text-xs opacity-70">{u.username}</p>
                      </div>
                    </button>
                  )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="py-3 flex-1 overflow-hidden" ref={containerRef}>
        <div className="flex flex-col gap-4">
          <div className="px-3 flex justify-between items-center">
            <p className="text-sm font-medium">Messages</p>
          </div>

          <div
            className="w-full overflow-auto"
            style={{ maxHeight: containerRef?.current?.offsetHeight || "100%" }}
          >
            <div className="flex flex-col">
              {activeRooms?.map(room => {
                const otherUser = room.users.find(u => u._id !== user._id);

                return otherUser === user?._id ? null : (
                  <button
                    className={`px-3 py-3 hover:bg-slate-300 ${
                      selectedUserId === otherUser._id && "bg-slate-200"
                    }`}
                    key={otherUser._id}
                    onClick={() => setSearchParams({ id: otherUser._id })}
                  >
                    <div className="flex gap-1 justify-between">
                      <Avatar
                        user={otherUser}
                        desc={room.lastMessage.text}
                        onlineBadge={onlineUsers.find(
                          ou => ou._id === otherUser._id
                        )}
                        withDetail
                      />

                      <div>
                        <span className="text-xs">18:20 pm</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidbar;
