import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuthProvider";
import { homeRoute } from "./constants";

export const ProtectedRoute = ({ redirectPath = homeRoute }) => {
  const user = useAuth();

  if (!user?.isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  // if (!user?.hasAddedEmail) {
  //   return <Navigate to={redirectPath} replace />;
  // }

  return <Outlet />;
};
