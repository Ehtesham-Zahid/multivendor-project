import { OrdersSection, ShopOrdersSection } from "../components";

const DashboardOrdersPage = () => {
  return (
    <div className="p-5 md:p-10 flex flex-col gap-3">
      <p className="text-3xl font-bold mb-3">All Orders</p>
      <ShopOrdersSection />
    </div>
  );
};

export default DashboardOrdersPage;
