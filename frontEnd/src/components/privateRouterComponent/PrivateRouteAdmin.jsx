import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { checkAdminOrUser } from "../../utils/helper";
import { Spinner } from "flowbite-react";

function PrivateRouteAdmin() {
  const { isAuthenticated, account, isLoading } = useSelector(
    (state) => state.auth
  );

  return isLoading ? (
    <div className="text-center">
      <Spinner aria-label="Center-aligned spinner example" />
    </div>
  ) : isAuthenticated && Object.keys(account).length > 0 ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRouteAdmin;
