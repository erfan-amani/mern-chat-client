import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./validation";
import landingImage1 from "@/assets/images/landing-bg.png";
import { Link } from "react-router-dom";
import { login as loginAction } from "@/store/reducers/auth/asyncActions";
import { resetAuthState } from "@/store/reducers/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const { pending, error: loginError } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async data => {
    if (pending) return;

    dispatch(loginAction(data));
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-center md:justify-start w-screen md:w-[45%] h-full bg-indigo-50">
        <div className="w-[90%] sm:w-[80%] md:max-w-[600px] mx-auto md:mx-0 px-10">
          <div className="flex flex-col gap-3 mb-8">
            <p className="text-gray-500 uppercase">start for free</p>
            <h2 className="text-4xl font-semibold text-gray-800">
              Login to your account
            </h2>
            <p className="text-gray-500">
              Need A New Account?{" "}
              <Link
                to="/auth/register"
                className="text-indigo-500"
                onClick={() => dispatch(resetAuthState())}
              >
                register
              </Link>
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {loginError && (
              <div className="p-2 border-2 border-red-500 bg-red-100 rounded-md">
                <p>{loginError}</p>
              </div>
            )}

            <div>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                {...register("username")}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
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
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="p-2 bg-indigo-500 text-white rounded-md disabled:bg-slate-300 disabled:cursor-not-allowed"
              disabled={pending}
            >
              Login
            </button>
          </form>
        </div>
      </div>

      <div className="invisible hidden md:block md:visible w-[55%]">
        <img src={landingImage1} alt="" className="w-[85%] mx-auto" />
      </div>
    </div>
  );
};

export default Login;
