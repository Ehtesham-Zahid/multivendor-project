import React from "react";
import DashboardCard from "../../DashboardCard";
import AdminOrdersSection from "./AdminOrdersSection";

const AdminDashboardSection = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5 sm:gap-10 flex-wrap justify-center md:justify-start">
        <DashboardCard
          title="Total Sales"
          subtitle={`400`}
          link="View Sales"
          linkUrl="/admin/sales"
        />
        <DashboardCard
          title="Total Shops"
          subtitle={`100`}
          link="View Shops"
          linkUrl="/admin/shops"
        />
        <DashboardCard
          title="Total Orders"
          subtitle={`100`}
          link="View Orders"
          linkUrl="/admin/orders"
        />
        <DashboardCard
          title="Total Products"
          subtitle={`100`}
          link="View Products"
          linkUrl="/admin/products"
        />
        <DashboardCard
          title="Revenue"
          subtitle={`100`}
          link="View Revenue"
          linkUrl="/admin/revenue"
        />
      </div>
      <AdminOrdersSection />
    </div>
  );
};

export default AdminDashboardSection;
