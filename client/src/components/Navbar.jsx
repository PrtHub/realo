import { stagger, useAnimate } from "framer-motion";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scope, animate] = useAnimate();

  const staggerList = stagger(0.1, { startDelay: 0.25 });

  useEffect(() => {
    animate(
      "#mobilenav",
      {
        width: open ? 170 : 0,
        height: open ? 230 : 0,
        opacity: open ? 1 : 0,
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.4,
      }
    );
    animate(
      "#link",
      open ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.3, x: -50 },
      {
        duration: 0.2,
        delay: open ? staggerList : 0,
      }
    );
  }, [animate, open, staggerList]);

  return (
    <nav
      ref={scope}
      className="w-full h-full max-w-[1920px] mx-auto px-2 sm:px-5 bg-dark-2 py-5 text-white flex items-center justify-between relative"
    >
      <span className="flex items-center gap-2">
        <img src="/logo.png" alt="realo logo" className="size-6 sm:size-10" />
        <h1 className="font-bold text-2xl sm:text-3xl">Realo</h1>
      </span>
      <ul className="w-[310px] hidden lg:flex items-center gap-10 justify-center text-white text-lg font-medium">
        <Link
          to="/"
          className={`${
            pathname === "/" &&
            "bg-dark-1 rounded-lg border border-gray-1 px-5 py-3 "
          } w-[88px] `}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`${
            pathname === "/about" &&
            "bg-dark-1 rounded-lg border border-gray-1 px-5 py-3 "
          } w-[90px]`}
        >
          About
        </Link>
        <Link
          to="/properties"
          className={`${
            pathname === "/properties" &&
            "bg-dark-1/100  rounded-lg border border-gray-1 px-5 py-3"
          } w-[122px]`}
        >
          Properties
        </Link>
      </ul>
      <div className="flex items-center">
        <span className="flex items-center gap-3 justify-center text-white">
          <Link to='/sign-in' className="bg-purple-1 px-3 sm:px-5 py-1 sm:py-2 rounded-md text-base md:text-lg font-medium">
            Sign in
          </Link>
          <Menu
            className="text-white size-7 sm:size-10 block lg:hidden cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </span>
      </div>
      <ul
        id="mobilenav"
        className="absolute top-[85px] right-0 bg-dark-2 rounded-md p-10 lg:hidden flex flex-col items-start justify-start gap-8"
      >
        <Link
          id="link"
          to="/"
         className="text-lg font-medium"
        >
          Home
        </Link>
        <Link
          id="link"
          to="/about"
          className="text-lg font-medium"
        >
          About
        </Link>
        <Link
          id="link"
          to="/properties"
          className="text-lg font-medium"
        >
          Properties
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
