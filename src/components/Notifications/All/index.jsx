import axios from "@/library/http";
import moment from "moment/moment";
import { useState, useEffect, Fragment } from "react";
import Loading from "./Loading";

const AllNotifications = ({ openNotification }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getList = async () => {
      setLoading(true);

      try {
        const response = await axios.get("notification");

        setList(response.data);
        setLoading(false);
      } catch (error) {
        setList([]);
        setLoading(false);
      }
    };

    getList();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h3>Notifications</h3>
        <button className="text-sm text-indigo-500">Mark as read</button>
      </div>

      <div className="min-h-[200px]">
        {!list.length ? (
          <div>No notification found!</div>
        ) : (
          <div className="flex flex-col">
            {list.map((notif, index) => {
              const months = moment().diff(notif.createdAt, "months");
              const time =
                months > 0
                  ? moment(notif.createdAt).format("YYYY MMMM DD")
                  : moment(notif.createdAt).fromNow();

              return (
                <Fragment key={notif._id}>
                  <button
                    className="flex flex-col gap-1"
                    onClick={() => openNotification(notif._id)}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-[10px] h-[10px] rounded-full ${
                          notif.read ? "bg-gray-400" : "bg-indigo-500"
                        }`}
                      />
                      <p>{notif.title}</p>
                    </div>
                    <p className="truncate max-w-[400px] text-sm opacity-70">
                      {notif.description}
                    </p>
                    <p className="text-xs opacity-60">{time}</p>
                  </button>

                  {index !== list.length - 1 && (
                    <div className="w-full my-5">
                      <div className="w-[90%] h-[2px] bg-gray-200 mx-auto" />
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllNotifications;
