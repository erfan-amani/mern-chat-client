import { useState, useEffect } from "react";
import { getOtherUser } from "@/library/helper";
import axios from "@/library/http";
import { useSelector } from "react-redux";
import Avatar from "@/components/Avatar";
import { toast } from "react-toastify";
import Loading from "./Loading";
import CompactPagination from "@/components/Pagination/CompactPagination";
import usePage from "@/hooks/usePage";

const MyContacts = () => {
  const { page, onPageChange } = usePage();
  const user = useSelector(state => state.auth.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      try {
        const response = await axios.get("room/all", {
          params: { pending: false, page, limit: 10 },
        });

        setData(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    getContacts();
  }, [page, update]);

  if ("loading") {
    return (
      <div className="min-h-[250px]">
        <Loading />
      </div>
    );
  }
  if (!data?.data?.length) {
    return (
      <div className="min-h-[250px]">
        <div className="text-center">No contact!</div>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <div className="min-h-[250px]">
        {data.data.map(room => {
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

      <div className="mx-auto">
        <CompactPagination
          page={page}
          totalPage={data.totalPage}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default MyContacts;
