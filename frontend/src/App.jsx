import { Outlet } from "react-router";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="bg-background min-h-screen w-full ">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
