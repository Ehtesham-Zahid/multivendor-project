import { DollarSign } from "lucide-react";
import { Link } from "react-router";

const DashboardCard = ({ title, amount, link }) => {
  return (
    <div className="flex flex-col gap-5 bg-sky-100 border-2 border-primary rounded-md p-3 min-w-96">
      <p className="text-lg flex gap-1 items-center text-nowrap">
        {/* <DollarSign size={18} /> */}
        {title}
      </p>
      <p className="font-bold text-lg">${amount}</p>
      <Link className="text-sky-500 underline underline-offset-2 decoration-1">
        {link}
      </Link>
    </div>
  );
};

export default DashboardCard;
