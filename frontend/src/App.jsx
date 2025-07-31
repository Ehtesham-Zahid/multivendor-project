import { Outlet } from "react-router";
import { Header, Footer } from "./components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./features/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  return (
    <div className="bg-background min-h-screen w-full ">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
