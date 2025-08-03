import { Outlet } from "react-router";
import DashboardHeader from "../components/DashboardHeader";
import DashboardSidebar from "../components/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "../shadcn/sidebar";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../features/auth/authSlice";
import { useEffect } from "react";

const DashboardLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);
  return (
    <div className="w-full min-h-screen">
      <SidebarProvider>
        <DashboardSidebar />
        <main className="w-full">
          <SidebarTrigger />
          {/* <PanelLeftIcon size={28} /> */}
          {/* <DashboardHeader /> */}
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
