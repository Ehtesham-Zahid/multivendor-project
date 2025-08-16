import React, { useEffect } from "react";
import DashboardCard from "../../DashboardCard";
import AdminOrdersSection from "./AdminOrdersSection";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardStatsThunk } from "../../../features/auth/authSlice";
import Spinner from "../../Spinner";

const AdminDashboardSection = () => {
  const { dashboardStats, isLoading } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardStatsThunk());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-5">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex gap-5 sm:gap-10 flex-wrap justify-center md:justify-start">
          <DashboardCard
            title="Total Revenue"
            subtitle={`$${user?.totalRevenue}`}
          />
          <DashboardCard
            title="Account Balance"
            subtitle={`$${user?.accountBalance}`}
            linkUrl="/admin/account-balance"
          />
          <DashboardCard
            title="Total Shops"
            subtitle={`${dashboardStats?.totalShops}`}
            linkUrl="/admin/shops"
          />
          <DashboardCard
            title="Total Orders"
            subtitle={`${dashboardStats?.totalOrders}`}
            linkUrl="/admin/orders"
          />
          <DashboardCard
            title="Total Refunds"
            subtitle={`${dashboardStats?.totalRefunds}`}
            linkUrl="/admin/refunds"
          />
          <DashboardCard
            title="Total Products"
            subtitle={`${dashboardStats?.totalProducts}`}
            linkUrl="/admin/products"
          />
        </div>
      )}
      <AdminOrdersSection />
    </div>
  );
};

export default AdminDashboardSection;
