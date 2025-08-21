import DashboardCard from "../DashboardCard";
import { useSelector } from "react-redux";
import DashboardOrdersSection from "./DashboardOrdersSection";
import Spinner from "../Spinner";

const DashboardSection = () => {
  const { currentUserShop, isLoading } = useSelector((state) => state.shop);
  const { totalShopOrders } = useSelector((state) => state.order);

  return isLoading ? (
    <div className="flex justify-center items-center h-full">
      <Spinner />
    </div>
  ) : (
    <>
      <p className="text-2xl font-bold mb-3">Overview</p>
      {!currentUserShop?.isActive && (
        <div className="bg-red-500 text-white p-3 rounded-md mb-5 font-bold">
          <p>Your shop is currently inactive.</p>
        </div>
      )}
      <div className="flex gap-5 sm:gap-10 flex-wrap justify-center md:justify-start">
        <DashboardCard
          title="Account Balance"
          subtitle={`${currentUserShop?.accountBalance} $`}
          link="Withdraw Money"
          linkUrl="/dashboard/withdraw"
        />
        <DashboardCard
          title="Shop Revenue"
          subtitle={`${currentUserShop?.totalRevenue} $`}
          link="View Revenue"
          linkUrl="/dashboard/revenue"
        />
        <DashboardCard
          title="Total Orders"
          subtitle={`${totalShopOrders}`}
          link="View Orders"
          linkUrl="/dashboard/orders"
        />
        <DashboardCard
          title="Total Products"
          subtitle={`${currentUserShop?.products?.length}`}
          link="View Products"
          linkUrl="/dashboard/products"
        />
        <div className="w-full    ">
          <DashboardOrdersSection />
        </div>
      </div>
    </>
  );
};

export default DashboardSection;
