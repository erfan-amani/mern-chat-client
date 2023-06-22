import { useState, useEffect } from "react";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import axios from "@/library/http";
import moment from "moment";
import Loading from "./Loading";

const SignleNotification = ({ id, closeNotification }) => {
  const [notification, setNotification] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`notification/${id}`);

        setNotification(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col gap-5 pb-2">
      <div className="flex gap-4 items-center">
        <button onClick={closeNotification}>
          <ArrowLongLeftIcon className="w-6 h-6" />
        </button>
        <h3>{notification.title}</h3>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-1 text-xs opacity-60">
          <span>Sent at </span>
          <span>{moment(notification.createdAt).format("YYYY MMMM DD")}</span>
        </div>

        <p className="test-sm opacity-70">{notification.description}</p>
      </div>
    </div>
  );
};

export default SignleNotification;
