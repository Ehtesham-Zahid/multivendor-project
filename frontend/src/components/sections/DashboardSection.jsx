import DashboardCard from "../DashboardCard";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserShopThunk } from "../../features/shop/shopSlice";
import {
  getShopOrdersByCurrentShopThunk,
  getShopOrdersThunk,
} from "../../features/order/orderSlice";
import { useEffect } from "react";
import DashboardOrdersSection from "./DashboardOrdersSection";
import Spinner from "../Spinner";

const DashboardSection = () => {
  const { currentUserShop, isLoading } = useSelector((state) => state.shop);
  const { shopOrders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserShopThunk());
  }, []);

  return isLoading ? (
    <div className="flex justify-center items-center h-full">
      <Spinner />
    </div>
  ) : (
    <div className="flex gap-5 sm:gap-10 flex-wrap justify-center md:justify-start">
      <DashboardCard
        title="Account Balance"
        subtitle={`${currentUserShop?.accountBalance} $`}
        link="Withdraw Money"
        linkUrl="/dashboard/withdraw"
      />
      <DashboardCard
        title="Total Orders"
        subtitle={`${shopOrders?.length}`}
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
  );
};

export default DashboardSection;
