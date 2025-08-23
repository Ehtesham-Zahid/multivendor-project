import { Outlet } from "react-router";
import DashboardSidebar from "../components/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "../shadcn/sidebar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { getCurrentUserShopThunk } from "../features/shop/shopSlice";
import { RoleRoute } from "../components";

const DashboardLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserShopThunk());
  }, []);

  return (
    <RoleRoute roles={["vendor"]}>
      <div className="w-full">
        <SidebarProvider>
          <DashboardSidebar />
          <main className="w-full h-screen">
            <ToastContainer />
            <SidebarTrigger />
            <Outlet />
          </main>
        </SidebarProvider>
      </div>
    </RoleRoute>
  );
};

export default DashboardLayout;
