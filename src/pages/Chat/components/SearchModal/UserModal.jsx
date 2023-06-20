import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import useDebounce from "@/hooks/useDebounce";
import axios from "@/library/http";
import Avatar from "@/components/Avatar";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserModal = ({ onlineUsers = [], onClose }) => {
  const navigate = Navigate();
  const myUser = useSelector(state => state.auth.user);
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const value = useDebounce(inputValue, 300);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const params = {};
        !!value && (params.search = value);

        const response = await axios.get("user/all", { params });
        const data = response.data || [];

        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
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
        <div className="mb-2 flex items-center gap-2">
          <h3 className="font-semibold text-lg opacity-80">Users</h3>
          {/* <span className="text-xs opacity-70">
            {onlineUsers.length + 1} online
          </span> */}
        </div>
        <div className="flex flex-col gap-3">
          {users.map(u =>
            u._id === myUser._id ? null : (
              <button
                key={u._id}
                onClick={() => {
                  onClose();
                  navigate(`/room/user/${u._id}`);
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
    </div>
  );
};

export default UserModal;
