import { Outlet } from "react-router-dom";
import landingImage1 from "@/assets/images/landing-bg.png";

const Auth = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-center md:justify-start w-screen md:w-[45%] h-full bg-indigo-50">
        <div className="w-[90%] sm:w-[80%] md:max-w-[600px] mx-auto md:mx-0 px-10">
          <Outlet />
        </div>
      </div>

      <div className="invisible hidden md:block md:visible w-[55%]">
        <img src={landingImage1} alt="" className="w-[85%] mx-auto" />
      </div>
    </div>
  );
};

export default Auth;
