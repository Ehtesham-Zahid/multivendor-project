import { DashboardSection } from "../components";
import OrdersSection from "../components/sections/OrdersSection";

const DashboardPage = () => {
  return (
    <div className="p-10 flex flex-col gap-10">
      <div>
        <p className="text-2xl font-bold mb-3">Overview</p>
        <DashboardSection />
      </div>
      <OrdersSection />
    </div>
  );
};

export default DashboardPage;
