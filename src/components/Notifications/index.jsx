import AllNotifications from "./All";

const Notifications = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h3>Notifications</h3>

        <button className="text-sm text-indigo-500">Mark as read</button>
      </div>

      <div>
        <AllNotifications />
      </div>
    </div>
  );
};

export default Notifications;
