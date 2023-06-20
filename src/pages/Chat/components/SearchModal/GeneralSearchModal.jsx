import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import useDebounce from "@/hooks/useDebounce";
import axios from "@/library/http";
import Avatar from "@/components/Avatar";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GeneralSearchModal = ({ onlineUsers = [], onClose }) => {
  const navigate = useNavigate();
  const myUser = useSelector(state => state.auth.user);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const value = useDebounce(inputValue, 300);

  useEffect(() => {
    const init = async () => {
      try {
        const params = {};
        !!value && (params.search = value);

        const usersResponse = await axios.get("user/all", { params });
        setUsers(usersResponse.data || []);

        const roomsResponse = await axios.get("room/active", { params });
        setRooms(roomsResponse.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    init();
  }, [value]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="w-full mb-4">
        <div className="flex items-center gap-2 bg-slate-200 px-4 py-3 rounded-full">
          <div>
            <MagnifyingGlassIcon className="w-5 h-5 text-neutral-400" />
          </div>
          <input
            type="text"
            className="w-full bg-transparent focus-visible:outline-none"
            placeholder="Search"
            onChange={e => setInputValue(e.target.value)}
            value={inputValue}
          />
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg opacity-80 mb-2">Users</h3>

        <div className="flex flex-col gap-3">
          {users.map(u =>
            u._id === myUser._id ? null : (
              <button
                key={u._id}
                onClick={() => {
                  onClose();
                }}
              >
                <div className="flex items-center gap-2">
                  <Avatar
                    user={u}
                    onlineBadge={onlineUsers.find(ou => ou._id === u._id)}
                  />

                  <div className="flex flex-col items-start">
                    <p>{u.username}</p>

                    <p className="text-xs opacity-50">
                      Joined At {moment(u.createdAt).format("DD MMMM YYYY")}
                    </p>
                  </div>
                </div>
              </button>
            )
          )}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg opacity-80 mb-2">Rooms</h3>

        <div className="flex flex-col gap-3">
          {rooms.map(r => {
            const otherUser = r.users.find(u => u._id !== myUser._id);

            return (
              <button
                key={r._id}
                onClick={() => {
                  onClose();
                  navigate(`/chat/room/${r._id}`);
                }}
              >
                <div className="flex items-center gap-2">
                  <Avatar
                    user={otherUser}
                    onlineBadge={onlineUsers.find(
                      ou => ou._id === otherUser._id
                    )}
                  />

                  <div className="flex flex-col items-start">
                    <p>{otherUser.username}</p>

                    <p className="text-xs opacity-50">
                      Created At {moment(r.createdAt).format("DD MMMM YYYY")}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GeneralSearchModal;
