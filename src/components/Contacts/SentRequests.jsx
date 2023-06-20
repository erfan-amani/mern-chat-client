import { useSelector } from "react-redux";
import { getOtherUser } from "@/library/helper";
import Avatar from "@/components/Avatar";
import { useEffect, useState } from "react";
import axios from "@/library/http";

const SentRequests = ({ socket }) => {
  const [list, setList] = useState([]);
  const user = useSelector(state => state.auth.user);

  const removeRequest = async id => {
    try {
      await axios.delete(`room/contact/${id}`);
    } catch (err) {}
  };

  useEffect(() => {
    const getContacts = async () => {
      const response = await axios.get("room/contact/sent");

      setList(response.data);
    };

    getContacts();
  }, []);

  if (!list.length) {
    return <div className="text-center">No request!</div>;
  }

  return (
    <div>
      {list.map(room => {
        const other = getOtherUser(room.users, user);

        return (
          <div key={other._id}>
            <div className="flex justify-between items-center">
              <Avatar user={other} withDetail desc="" />

              <button
                onClick={() => removeRequest(room._id)}
                className="bg-gray-100 px-3 py-2 rounded-md text-xs"
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SentRequests;
