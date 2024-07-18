/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? element : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
