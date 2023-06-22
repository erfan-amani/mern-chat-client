import {
  BellIcon,
  Cog6ToothIcon,
  HomeIcon,
  PowerIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import {
  PlusCircleIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";
import { logoutAsync } from "@/store/reducers/auth/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Contacts from "@/components/Contacts";
import Notifications from "@/components/Notifications";

const NavSide = ({ socket }) => {
  const unreadNotifications = useSelector(
    state => state.auth.unreadNotifications
  );
  const modal = useSelector(state => state.app.modal);
  const dispatch = useDispatch();

  const logout = () => dispatch(logoutAsync());

  const openContacts = () => {
    modal.show(
      <Contacts onClose={modal.hide} socket={socket} />,
      false,
      "Contacts Management"
    );
  };

  const openNotifications = () => {
    modal.show(<Notifications />, false, null, true);
  };

  return (
    <div className="py-2 h-full flex flex-col items-center justify-between">
      <button>
        <ChatBubbleLeftRightIcon className="w-8 h-8 text-indigo-400" />
      </button>

      <div className="flex flex-col gap-5 items-center">
        <Link to="/chat">
          <HomeIcon className="w-5 h-5 text-slate-500 stroke-2" />
        </Link>

        <button onClick={openNotifications} className="relative">
          {!!unreadNotifications && (
            <div className="absolute top-0 right-0 w-[10px] h-[10px] rounded-full bg-indigo-500" />
          )}

          <BellIcon className="w-5 h-5 text-slate-500 stroke-2" />
        </button>

        <button>
          <Cog6ToothIcon className="w-5 h-5 text-slate-500 stroke-2" />
        </button>

        <button onClick={openContacts}>
          <UserGroupIcon className="w-5 h-5 text-slate-500 stroke-2" />
        </button>

        <button onClick={logout}>
          <PowerIcon className="w-5 h-5 text-slate-500 stroke-2" />
        </button>
      </div>

      <button>
        <PlusCircleIcon className="w-8 h-8 text-indigo-400" />
      </button>
    </div>
  );
};

export default NavSide;
