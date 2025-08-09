import DashboardCard from "../DashboardCard";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserShopThunk } from "../../features/shop/shopSlice";
import { getShopOrdersThunk } from "../../features/order/orderSlice";
import { useEffect } from "react";

const DashboardSection = () => {
  const { shop } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserShopThunk());
    dispatch(getShopOrdersThunk());
  }, []);

  return (
    <div className="flex gap-10 flex-wrap justify-center md:justify-start">
      <DashboardCard
        title="Account Balance"
        amount={shop?.accountBalance}
        link="Withdraw Money"
      />
      <DashboardCard
        title="Total Orders"
        amount={shop?.orders?.length}
        link="View Orders"
      />
      <DashboardCard
        title="Total Products"
        amount={shop?.products?.length}
        link="View Products"
      />
    </div>
  );
};

export default DashboardSection;
