import { ToastContainer } from "react-toastify";
import { CreateShopForm } from "../components";

const CreateShop = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <CreateShopForm />
    </div>
  );
};

export default CreateShop;
