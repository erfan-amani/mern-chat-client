import { useState, useEffect } from "react";
import { getOtherUser } from "@/library/helper";
import axios from "@/library/http";
import { useSelector } from "react-redux";
import Avatar from "@/components/Avatar";
import { toast } from "react-toastify";

const MyContacts = () => {
  const user = useSelector(state => state.auth.user);
  const [list, setList] = useState([]);
  const [update, setUpdate] = useState(0);

  const removeRequest = async id => {
    try {
      await axios.delete(`room/contact/${id}`);

      toast.success("Contact successfully removed.");
      setUpdate(prev => prev + 1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getContacts = async () => {
      const response = await axios.get("room/all", {
        params: { pending: false },
      });

      setList(response.data);
    };

    getContacts();
  }, [update]);

  if (!list.length) {
    return <div className="text-center">No contact!</div>;
  }

  return (
    <div className="mt-2">
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

export default MyContacts;
