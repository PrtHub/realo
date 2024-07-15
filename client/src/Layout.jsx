import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "./components";

const Layout = () => {
  return (
    <main className="w-full h-full bg-dark-1">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
