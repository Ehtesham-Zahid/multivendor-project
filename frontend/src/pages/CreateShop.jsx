import { ToastContainer } from "react-toastify";
import { CreateShopForm } from "../components";
import { RoleRoute } from "../components";

const CreateShop = () => {
  return (
    <RoleRoute roles={["user"]}>
      <div className="flex justify-center items-center w-full h-screen">
        {/* <ToastContainer position="top-right" autoClose={3000} /> */}
        <CreateShopForm />
      </div>
    </RoleRoute>
  );
};

export default CreateShop;
