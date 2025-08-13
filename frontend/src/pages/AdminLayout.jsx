import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../shadcn/sidebar";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../features/auth/authSlice";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { AdminSidebar } from "../components";

const AdminLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  return (
    <div className="w-full">
      <SidebarProvider>
        <AdminSidebar />
        <main className="w-full h-screen">
          <ToastContainer />
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
