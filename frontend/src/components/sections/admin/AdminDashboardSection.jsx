import { useEffect } from "react";
import DashboardCard from "../../DashboardCard";
import AdminOrdersSection from "./AdminOrdersSection";
import { getAdminStatsThunk } from "../../../features/auth/authSlice";
import Spinner from "../../Spinner";
import { useDispatch, useSelector } from "react-redux";

const AdminDashboardSection = () => {
  const {
    totalRevenue,
    totalShops,
    totalOrders,
    totalRefunds,
    totalProducts,
    isAdminStatsLoading,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminStatsThunk());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-5">
      {isAdminStatsLoading ? (
        <Spinner />
      ) : (
        <div className="flex gap-5 sm:gap-10 flex-wrap justify-center md:justify-start">
          <DashboardCard
            title="Total Revenue"
            subtitle={`$${Number(totalRevenue).toFixed(2)}`}
          />
          <DashboardCard
            title="Total Shops"
            subtitle={`${totalShops}`}
            linkUrl="/admin/shops"
          />
          <DashboardCard
            title="Total Orders"
            subtitle={`${totalOrders}`}
            linkUrl="/admin/orders"
          />
          <DashboardCard
            title="Total Refunds"
            subtitle={`${totalRefunds}`}
            linkUrl="/admin/refunds"
          />
          <DashboardCard
            title="Total Products"
            subtitle={`${totalProducts}`}
            linkUrl="/admin/products"
          />
        </div>
      )}
      <AdminOrdersSection />
    </div>
  );
};

export default AdminDashboardSection;
