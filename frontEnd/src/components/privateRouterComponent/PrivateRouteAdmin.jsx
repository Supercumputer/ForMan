import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { checkAdminOrUser } from "../../utils/helper";

function PrivateRouteAdmin() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // isAuthenticated && checkAdminOrUser(user?.role?.name)
  return true ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/login" />
  );
}

export default PrivateRouteAdmin;
