import { DollarSign } from "lucide-react";
import { Link } from "react-router";

const DashboardCard = ({ title, subtitle, link, linkUrl }) => {
  return (
    <div className="flex flex-col  justify-between  drop-shadow-xl  rounded-md shadow-xl  bg-background p-5 w-48 h-30">
      <p className="text-md flex gap-1 items-center text-nowrap text-primary font-normal">
        {/* <DollarSign size={18} /> */}
        {title}
      </p>
      <p className="font-bold  text-sky-900 text-4xl">{subtitle}</p>
    </div>
  );
};

export default DashboardCard;

//  <div className="flex flex-col gap-5 bg-sky-100 border-2 border-primary rounded-md p-3 w-80">
//    <p className="text-lg flex gap-1 items-center text-nowrap">
//      {/* <DollarSign size={18} /> */}
//      {title}
//    </p>
//    <p className="font-bold text-lg">{subtitle}</p>
//    <Link
//      to={linkUrl}
//      className="text-sky-500 underline underline-offset-2 decoration-1"
//    >
//      {link}
//    </Link>
//  </div>;
