import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRouteClient() {
  const auth = useSelector((state) => state.auth.isAuthenticated);

  return true ? <Outlet /> : <Navigate to="/admin/login" />;
}

export default PrivateRouteClient;
