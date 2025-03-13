import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { HeaderContext } from "../context/HeaderContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ element }) => {
  const { state } = useContext(HeaderContext);

  return state.isLoggedIn ? element : <Navigate to="/" />;
};

ProtectedRoute.propTypes = {
    element: PropTypes.node.isRequired,
  };

export default ProtectedRoute;
