import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <main className="w-full h-full bg-dark-1">
      <Navbar />
      <Outlet />
      <Toaster/>
      <Footer />
    </main>
  );
};

export default Layout;
