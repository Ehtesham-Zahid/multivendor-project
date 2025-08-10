import DashboardCard from "../DashboardCard";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserShopThunk } from "../../features/shop/shopSlice";
import { getShopOrdersThunk } from "../../features/order/orderSlice";
import { useEffect } from "react";

const DashboardSection = () => {
  const { shop } = useSelector((state) => state.shop);
  const { shopOrders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserShopThunk());
    dispatch(getShopOrdersThunk());
  }, []);

  return (
    <div className="flex gap-5 sm:gap-10 flex-wrap justify-center md:justify-start">
      <DashboardCard
        title="Account Balance"
        subtitle={`${shop?.accountBalance} $`}
        link="Withdraw Money"
        linkUrl="/dashboard/withdraw"
      />
      <DashboardCard
        title="Total Orders"
        subtitle={`${shopOrders?.length} Orders`}
        link="View Orders"
        linkUrl="/dashboard/orders"
      />
      <DashboardCard
        title="Total Products"
        subtitle={`${shop?.products?.length} Products`}
        link="View Products"
        linkUrl="/dashboard/products"
      />
    </div>
  );
};

export default DashboardSection;
