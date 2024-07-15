import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "./components";

const Layout = () => {
  return (
    <main className="w-full h-full">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
