import { Outlet } from "react-router";

const Auth = () => {
  return (
    <div className="bg-background min-h-screen w-full ">
      <Outlet />
    </div>
  );
};

export default Auth;
