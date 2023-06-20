import { useSelector } from "react-redux";
import { getOtherUser } from "@/library/helper";
import Avatar from "@/components/Avatar";

const SentRequests = ({ list = [] }) => {
  const user = useSelector(state => state.auth.user);

  if (!list.length) {
    return <div className="text-center">No request!</div>;
  }

  return (
    <div className="mt-2">
      {list.map(room => {
        const other = getOtherUser(room.users, user);

        return (
          <div key={other._id}>
            <div className="flex justify-between items-center">
              <Avatar user={other} withDetail desc="" />

              <button className="bg-gray-100 px-3 py-2 rounded-md text-xs">
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
