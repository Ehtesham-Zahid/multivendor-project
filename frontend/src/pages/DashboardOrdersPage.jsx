import { OrdersSection } from "../components";

const DashboardOrdersPage = () => {
  return (
    <div className="p-10 flex flex-col gap-">
      <p className="text-3xl font-bold mb-3">All Orders</p>
      <OrdersSection />
    </div>
  );
};

export default DashboardOrdersPage;
