import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

const CheckoutLayout = () => {
  return (
    <div>
      <ToastContainer />
      <Outlet />
    </div>
  );
};

export default CheckoutLayout;
