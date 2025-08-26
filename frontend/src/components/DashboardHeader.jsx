import { Link } from "react-router";
import Logo from "../assets/images/logo.png";

const DashboardHeader = () => {
  return (
    <div className="shadow-2xl w-full flex items-center justify-between bg-white p-5">
      
      <img src={Logo} className="w-16 h-16 rounded-full border-2" />
    </div>
  );
};

export default DashboardHeader;
