import { RefundsSection } from "../components";

const DashboardRefundsPage = () => {
  return (
    <div className="p-10 flex flex-col gap-3">
      <p className="text-3xl font-bold mb-3">All Refunds</p>
      <RefundsSection />
    </div>
  );
};

export default DashboardRefundsPage;
