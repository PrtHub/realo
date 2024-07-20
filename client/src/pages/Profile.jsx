import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase";
import {
  deleteUserStart,
  delteUserFailure,
  delteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/userSlice";
import { Link } from "react-router-dom";
import { SEO } from "../components";

const Profile = () => {
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [file, setFile] = useState(undefined);
  const [progressPerc, setProgressPerc] = useState(0);

  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressPerc(Math.round(progress));
      },
      (error) => {
        setError(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        toast.error(data.message);
        return;
      }

      dispatch(updateUserSuccess(data));
      toast.success("User updated successfully");
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(delteUserFailure(data.message));
        toast.error(data.message);
      }
      dispatch(delteUserSuccess(data));
      toast.success("User deleted successfully");
    } catch (error) {
      dispatch(delteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        toast.error(data.message);
      }
      dispatch(signOutUserSuccess(data));
      toast.success("signed out");
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <>
     <SEO title={`${currentUser.username} - Realo`}/>
    <section className="w-full h-full flex items-start justify-center my-20">
      <section className="size-full max-w-[360px] sm:max-w-[400px] flex flex-col items-center justify-center gap-5 ">
        <h1 className="text-white font-semibold text-3xl mb-5">Profile</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-5"
        >
          <input
            type="file"
            ref={fileRef}
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*"
            hidden
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt="Profile image"
            className="size-24 object-cover rounded-full mb-5 cursor-pointer hover:opacity-60 duration-200 transition-all ease-in-out"
          />
          <span className="text-base self-center text-white font-medium -mt-5 mb-2">
            {error ? (
              <span className="text-red-700">
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : progressPerc > 0 && progressPerc < 100 ? (
              <span>{`Uploading ${progressPerc}%`}</span>
            ) : progressPerc === 100 ? (
              <span>Image successfully uploaded!</span>
            ) : (
              ""
            )}
          </span>
          <input
            type="text"
            id="username"
            placeholder="Username"
            defaultValue={currentUser.username}
            onChange={handleChange}
            className="w-full bg-dark-2 px-4 py-3 rounded-md border border-dark-3 outline-none text-gray-2 placeholder:text-gray-2 text-base xl:text-lg font-medium"
          />
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            defaultValue={currentUser.email}
            onChange={handleChange}
            className="w-full bg-dark-2 px-4 py-3 rounded-md border border-dark-3 outline-none text-gray-2 placeholder:text-gray-2 text-base xl:text-lg font-medium"
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full bg-dark-2 px-4 py-3 rounded-md border border-dark-3 outline-none text-gray-2 placeholder:text-gray-2 text-base xl:text-lg font-medium"
          />
          <button
            type="submit"
            className="bg-purple-1 hover:bg-purple-1/70 transition-all duration-200 ease-in-out rounded-lg px-5 py-4 text-white font-semibold w-full"
          >
            {loading ? (
              <Loader2 className="mx-auto animate-spin text-base text-white" />
            ) : (
              "Update Account"
            )}
          </button>
          <Link to='/create-property' className="w-full px-4 py-4  bg-white  rounded-lg font-semibold text-base text-center hover:bg-white/90 transition-all duration-200 ease-in-out text-dark-1 capitalize">List My property</Link>         
        </form>
        <div className="w-full flex items-center justify-between text-white font-semibold">
          <span
            onClick={handleDelete}
            className="hover:text-purple-2 duration-200 transition-all ease-in-out cursor-pointer"
          >
            Delete Account
          </span>
          <span
            onClick={handleSignOut}
            className="hover:text-purple-2 duration-200 transition-all ease-in-out cursor-pointer"
          >
            Sign out
          </span>
        </div>
      </section>
    </section>
    </>
  );
};

export default Profile;
