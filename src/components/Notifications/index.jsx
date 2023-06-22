import { useState } from "react";
import AllNotifications from "./All";
import SingleNotification from "./Single";

const Notifications = () => {
  const [notifId, setNotifId] = useState(null);

  const openNotification = id => {
    setNotifId(id);
  };
  const closeNotification = () => {
    setNotifId(null);
  };

  return (
    <div>
      {notifId ? (
        <SingleNotification
          id={notifId}
          closeNotification={closeNotification}
        />
      ) : (
        <AllNotifications openNotification={openNotification} />
      )}
    </div>
  );
};

export default Notifications;
