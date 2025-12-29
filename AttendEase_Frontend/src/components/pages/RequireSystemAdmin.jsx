import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { SystemAdminAuthContext } from "../../context/SystemAdminAuthContext";

const RequireSystemAdmin = ({ children }) => {
  const { accessToken, loading } = useContext(SystemAdminAuthContext);
  const location = useLocation();

  if (loading) {
    return <div>Checking security...</div>;
  }

  if (!accessToken || accessToken === "null" || accessToken === "undefined") {
    return <Navigate to="/system-admin-login" state={{ from: location }} replace />;
  }
  
  return children;
};

export default RequireSystemAdmin;