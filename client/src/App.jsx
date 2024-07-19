import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./Layout";
import {
  About,
  EditProperty,
  Home,
  Profile,
  Properties,
  PropertyDetails,
  PropertyListings,
  Signin,
  Signup,
} from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateProperty from "./pages/CreateProperty";

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
        element: <PrivateRoute element={<Profile />} />,
      },
      {
        path: "/properties",
        element: <Properties />,
      },
      {
        path: "/create-property",
        element: <PrivateRoute element={<CreateProperty />} />,
      },
      {
        path: "/edit-property/:id",
        element: <PrivateRoute element={<EditProperty />} />,
      },
      {
        path: "/property/:id",
        element: <PrivateRoute element={<PropertyDetails />} />,
      },
      {
        path: "/my-listings",
        element: <PrivateRoute element={<PropertyListings />} />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
