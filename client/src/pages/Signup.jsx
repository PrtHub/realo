import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(error)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/signup", formData, {
        headers: { "Content-Type": "application/json" },
      });
      const data = res.data;
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      toast.success("User created successfully!")
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <section className="w-full h-svh flex items-start justify-center my-10">
      <section className="size-full max-w-[360px] sm:max-w-[400px] flex flex-col items-center justify-center gap-5 ">
        <h1 className="text-white font-semibold text-3xl mb-5">Sign up</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-5"
        >
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full bg-dark-2 px-4 py-3 rounded-md border border-dark-3 outline-none text-gray-2 placeholder:text-gray-2 text-base xl:text-lg font-medium"
            required
          />
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
           {loading ? <Loader2 className="mx-auto animate-spin text-base text-white"/> : "Create Account"} 
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
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="text-purple-1 hover:text-purple-2 transition-all duration-200 ease-in-out"
          >
            Sign in
          </Link>
        </span>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </section>
    </section>
  );
};

export default Signup;
