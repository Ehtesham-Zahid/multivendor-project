import { Outlet } from "react-router";
import { Header, Footer } from "./components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./features/auth/authSlice";
import { SidebarProvider, SidebarTrigger } from "./shadcn/sidebar";
import ProfileSidebar from "./components/ProfileSidebar";
import { ToastContainer } from "react-toastify";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  return (
    <div className="bg-background w-full min-h-screen flex flex-col">
      <Header />
      <ToastContainer />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
