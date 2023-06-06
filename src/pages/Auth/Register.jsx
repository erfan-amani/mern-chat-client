import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./validation";
import landingImage1 from "@/assets/images/landing-bg.png";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = data => {
    console.log(data);
  };

  console.log(errors.password);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center w-[55%] h-full bg-indigo-50">
        <div className="w-[70%] px-10">
          <div className="flex flex-col gap-3 mb-8">
            <p className="text-gray-500 ">start for free</p>
            <h2 className="text-4xl font-semibold text-gray-800">
              Create new account
            </h2>
            <p className="text-gray-500">
              Already A Member?{" "}
              <Link to="/auth/login" className="text-indigo-500">
                login
              </Link>
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                {...register("username")}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              {errors.username && <p>{errors.username.message}</p>}
            </div>

            <div>
              <input
                type="text"
                name="password"
                id="password"
                placeholder="Password"
                {...register("password")}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="p-2 bg-indigo-500 text-white rounded-md"
            >
              Register
            </button>
          </form>
        </div>
      </div>

      <div className="w-[45%]">
        <img src={landingImage1} alt="" />
      </div>
    </div>
  );
};

export default Register;
