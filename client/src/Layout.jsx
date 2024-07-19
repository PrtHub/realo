import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";

const Layout = () => {
  return (
    <main className="w-full h-full bg-dark-1">
      <Navbar />
      <Outlet />
      <ScrollToTop/>
      <Toaster />
      <Footer />
    </main>
  );
};

export default Layout;
