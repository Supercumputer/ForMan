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
    (account.role === "66a65a1f99d2a4a1c0a42289" ? <Navigate to="/" /> : <Outlet />)
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRouteAdmin;
