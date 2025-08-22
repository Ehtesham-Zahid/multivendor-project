import DashboardCard from "../DashboardCard";
import { useDispatch, useSelector } from "react-redux";
import DashboardOrdersSection from "./DashboardOrdersSection";
import Spinner from "../Spinner";
import { useEffect } from "react";
import { getCurrentUserShopStatsThunk } from "../../features/shop/shopSlice";
const DashboardSection = () => {
  const dispatch = useDispatch();
  const {
    currentUserShop,
    getCurrentUserShopStatsLoading,
    totalProducts,
    totalOrders,
    accountBalance,
    totalRevenue,
  } = useSelector((state) => state.shop);

  useEffect(() => {
    dispatch(getCurrentUserShopStatsThunk());
  }, [dispatch]);

  return (
    <>
      <p className="text-2xl font-bold mb-3">Overview</p>
      <div className="flex flex-col gap-y-10">
        {getCurrentUserShopStatsLoading ? (
          <div className="flex justify-center items-center h-full w-full">
            <Spinner />
          </div>
        ) : (
          <div className="w-full">
            {!currentUserShop?.isActive && (
              <div className="bg-red-500 text-white p-3 rounded-md mb-5 font-bold">
                <p>Your shop is currently inactive.</p>
              </div>
            )}
            <div className="flex gap-5 sm:gap-10 flex-wrap justify-center sm:justify-start">
              <DashboardCard
                title="Shop Revenue"
                subtitle={`${totalRevenue} $`}
                link="View Revenue"
              />
              <DashboardCard
                title="Account Balance"
                subtitle={`${accountBalance} $`}
                link="Withdraw Money"
                linkUrl="/dashboard/withdrawal"
              />
              <DashboardCard
                title="Total Orders"
                subtitle={`${totalOrders}`}
                link="View Orders"
                linkUrl="/dashboard/orders"
              />
              <DashboardCard
                title="Total Products"
                subtitle={`${totalProducts}`}
                link="View Products"
                linkUrl="/dashboard/products"
              />
            </div>
          </div>
        )}
        <div className="w-full    ">
          <DashboardOrdersSection />
        </div>
      </div>
    </>
  );
};

export default DashboardSection;
