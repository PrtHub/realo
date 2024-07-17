import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../Firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const GoogleSigninButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/")
      toast.success("Signed in!")
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-white hover:bg-white/90 rounded-lg px-5 py-4 text-dark-2 font-semibold w-full"
    >
      Continue With Google
    </button>
  );
};

export default GoogleSigninButton;
