import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../redux/userSlice";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(signInSuccess(data));
      toast.success("User signed in successfully");
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error(error.message);
    }
  };

  return (
    <section className="w-full h-svh flex items-start justify-center my-10">
      <section className="size-full max-w-[360px] sm:max-w-[400px] flex flex-col items-center justify-center gap-5">
        <h1 className="text-white font-semibold text-3xl mb-5">Sign in</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-5"
        >
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full bg-dark-2 px-4 py-3 rounded-md border border-dark-3 outline-none text-gray-2 placeholder:text-gray-2 text-base xl:text-lg font-medium"
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full bg-dark-2 px-4 py-3 rounded-md border border-dark-3 outline-none text-gray-2 placeholder:text-gray-2 text-base xl:text-lg font-medium"
            required
          />
          <button
            type="submit"
            className="bg-purple-1 hover:bg-purple-1/70 transition rounded-lg px-5 py-4 text-white font-semibold w-full"
          >
            {loading ? (
              <Loader2 className="mx-auto animate-spin text-base text-white" />
            ) : (
              "Sign in"
            )}
          </button>
        </form>
        <div className="w-full flex flex-col gap-5 items-center">
          <h3 className="text-white font-medium text-lg">OR</h3>
          <button
            type="submit"
            className="bg-white hover:bg-white/90 rounded-lg px-5 py-4 text-dark-2 font-semibold w-full"
          >
            Continue With Google
          </button>
        </div>
        <span className="text-white font-medium">
          Don&apos;t have an account?{" "}
          <Link
            to="/sign-up"
            className="text-purple-1 hover:text-purple-2 transition-all duration-200 ease-in-out"
          >
            Sign up
          </Link>
        </span>
        {error && <p className="text-red-500 mt-5"></p>}
      </section>
    </section>
  );
};

export default Signin;
