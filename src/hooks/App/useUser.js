import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/store/reducers/auth/asyncActions";

const useUser = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) return;

    dispatch(getUser());
  }, [accessToken]);
};

export default useUser;
