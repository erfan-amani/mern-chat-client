import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./validation";
import { Link } from "react-router-dom";
import { login as loginAction } from "@/store/reducers/auth/asyncActions";
import { resetAuthState } from "@/store/reducers/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import PasswordInputs from "../../components/Input/PasswordInputs";

const Login = () => {
  const { pending, error: loginError } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  console.log(getValues());

  const onSubmit = async data => {
    if (pending) return;

    dispatch(loginAction(data));
  };

  return (
    <>
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

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
            autoComplete={false}
            {...register("username")}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div>
          <PasswordInputs
            type="text"
            name="password"
            id="password"
            placeholder="Password"
            autoComplete={false}
            register={register}
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
    </>
  );
};

export default Login;
