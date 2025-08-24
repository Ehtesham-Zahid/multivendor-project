import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../features/auth/authSlice";
import { ScrollToTop } from "../components";
import { ToastContainer } from "react-toastify";

const AppLayout = () => {
  const { user, isInitialized, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // Check for existing authentication on app startup
    // Skip if we're on the verify-email page
    if (
      !user &&
      !isInitialized &&
      !location.pathname.includes("verify-email")
    ) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, user, isInitialized, location.pathname]);

  // Show loading while checking authentication
  if (
    !isInitialized &&
    isLoading &&
    !location.pathname.includes("verify-email")
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default AppLayout;
