import { Outlet } from "react-router";
import { CheckoutHeader, Footer } from "../components";
import { ToastContainer } from "react-toastify";

const CheckoutLayout = () => {
  return (
    <div>
      <ToastContainer />
      <CheckoutHeader />
      <Outlet />
      <Footer />
    </div>
  );
};

export default CheckoutLayout;
