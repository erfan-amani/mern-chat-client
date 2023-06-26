import axios from "@/library/http";
import moment from "moment/moment";
import { useState, useEffect, Fragment } from "react";
import usePage from "@/hooks/usePage";
import CompactPagination from "@/components/Pagination/CompactPagination";
import Loading from "./Loading";

const AllNotifications = ({ openNotification }) => {
  const { page, onPageChange } = usePage();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const readAll = async () => {
    try {
      const response = await axios.get("notification/readAll");

      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      try {
        const response = await axios.get("notification", {
          params: { page, limit: 5 },
        });

        setData(response.data);
        setLoading(false);
      } catch (error) {
        setData([]);
        setLoading(false);
      }
    };

    getData();
  }, [page]);

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h3>Notifications</h3>
        <button className="text-sm text-indigo-500" onClick={readAll}>
          Mark as read
        </button>
      </div>

      <div>
        {!data?.total ? (
          <div>No notification found!</div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col min-h-[200px]">
              {data?.data?.map((notif, index) => {
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

                    {index !== data?.data?.length - 1 && (
                      <div className="w-full my-5">
                        <div className="w-[90%] h-[2px] bg-gray-200 mx-auto" />
                      </div>
                    )}
                  </Fragment>
                );
              })}
            </div>

            <div className="mx-auto">
              <CompactPagination
                page={page}
                totalPage={data.totalPage}
                onChange={onPageChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllNotifications;
