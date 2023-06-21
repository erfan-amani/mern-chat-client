import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const PasswordInputs = ({ className, register, ...inputProps }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(prev => !prev);

  return (
    <div className="relative">
      <input
        {...inputProps}
        {...register?.("password")}
        type={show ? "text" : "password"}
        className={`${className} pr-[30px]`}
      />

      <button
        onClick={toggleShow}
        className="absolute top-1/2 -translate-y-1/2 right-2 text-gray-500"
      >
        {show ? (
          <EyeSlashIcon className="w-5 h-5" />
        ) : (
          <EyeIcon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default PasswordInputs;
