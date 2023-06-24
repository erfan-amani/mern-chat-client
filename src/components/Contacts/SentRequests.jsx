import { useSelector } from "react-redux";
import { getOtherUser } from "@/library/helper";
import Avatar from "@/components/Avatar";
import { useEffect, useState } from "react";
import axios from "@/library/http";
import { toast } from "react-toastify";
import Loading from "./Loading";

const SentRequests = () => {
  const [list, setList] = useState([]);
  const [update, setUpdate] = useState(0);
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.auth.user);

  const removeRequest = async id => {
    try {
      await axios.delete(`room/contact/${id}`);

      toast.success("Request successfully removed.");
      setUpdate(prev => prev + 1);
    } catch (err) {}
  };

  useEffect(() => {
    const getContacts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("room/contact/sent");

        setList(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    getContacts();
  }, [update]);

  if (loading) {
    return <Loading />;
  }
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
