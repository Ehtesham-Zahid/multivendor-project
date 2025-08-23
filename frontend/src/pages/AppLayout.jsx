import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../features/auth/authSlice";
import { ScrollToTop } from "../components";

const AppLayout = () => {
  const { user, isInitialized, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for existing authentication on app startup
    if (!user && !isInitialized) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, user, isInitialized]);

  // Show loading while checking authentication
  if (!isInitialized && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default AppLayout;
