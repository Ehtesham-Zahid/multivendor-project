import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

const Auth = () => {
  return (
    <div className="bg-background min-h-screen w-full ">
      <ToastContainer position="top-right" autoClose={3000} />
      <Outlet />
    </div>
  );
};

export default Auth;
