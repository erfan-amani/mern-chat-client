import { useSelector } from "react-redux";
import { getOtherUser } from "@/library/helper";
import Avatar from "@/components/Avatar";
import { useEffect, useState } from "react";
import axios from "@/library/http";
import { toast } from "react-toastify";
import Loading from "./Loading";

const ReceivedRequests = () => {
  const [list, setList] = useState();
  const [update, setUpdate] = useState(0);
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.auth.user);

  const removeRequest = async id => {
    try {
      await axios.delete(`room/contact/${id}`, { params: { type: "REJECT" } });

      toast.success("Request successfully removed.");
      setUpdate(prev => prev + 1);
    } catch (err) {
      console.log(err);
    }
  };
  const acceptRequest = async id => {
    try {
      await axios.post("room/contact/accept", { id });

      toast.success("Request successfully accepted.");
      setUpdate(prev => prev + 1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getContacts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("room/contact/received");

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
