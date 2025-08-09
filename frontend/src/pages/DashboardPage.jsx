import { DashboardSection } from "../components";
import { ShopOrdersSection } from "../components";

const DashboardPage = () => {
  return (
    <div className="p-5 md:p-10 flex flex-col gap-10">
      <div>
        <p className="text-2xl font-bold mb-3">Overview</p>
        <DashboardSection />
      </div>
      <ShopOrdersSection />
    </div>
  );
};

export default DashboardPage;
