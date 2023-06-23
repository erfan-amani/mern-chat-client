import { useSelector } from "react-redux";
import { getOtherUser } from "@/library/helper";
import Avatar from "@/components/Avatar";
import { useEffect, useState } from "react";
import axios from "@/library/http";

const ReceivedRequests = ({ socket }) => {
  const [list, setList] = useState();
  const user = useSelector(state => state.auth.user);

  const removeRequest = async id => {
    try {
      await axios.delete(`room/contact/${id}`, { params: { type: "REJECT" } });
    } catch (err) {
      console.log(err);
    }
  };
  const acceptRequest = async id => {
    try {
      await axios.post("room/contact/accept", { id });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getContacts = async () => {
      const response = await axios.get("room/contact/received");

      setList(response.data);
    };

    getContacts();
  }, []);

  if (!list?.length) {
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

              <div className="flex gap-1">
                <button
                  onClick={() => removeRequest(room.id)}
                  className="bg-gray-100 px-3 py-2 rounded-md text-xs"
                >
                  Reject
                </button>
                <button
                  onClick={() => acceptRequest(room.id)}
                  className="bg-indigo-400 text-white px-3 py-2 rounded-md text-xs"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReceivedRequests;
