import { setModal } from "@/store/reducers/app/appSlice";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

const useModal = () => {
  const modalRef = useRef();
  const dispatch = useDispatch();

  // init modal
  useEffect(() => {
    dispatch(setModal(modalRef.current));
  }, [dispatch]);

  return modalRef;
};

export default useModal;
