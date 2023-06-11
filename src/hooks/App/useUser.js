import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "@/store/reducers/auth/asyncActions";

const useUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("here");
    dispatch(getUser());
  }, []);
};

export default useUser;
