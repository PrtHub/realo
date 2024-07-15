import "./App.css";
import Layout from "./Layout";
import { About, Home, Profile, Properties, Signin, Signup } from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: "Error",
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/sign-up",
        element: <Signup />,
      },
      {
        path: "/sign-in",
        element: <Signin />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/properties",
        element: <Properties />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
