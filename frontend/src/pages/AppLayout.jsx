import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../features/auth/authSlice";
import { ScrollToTop } from "../components";

const AppLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default AppLayout;
