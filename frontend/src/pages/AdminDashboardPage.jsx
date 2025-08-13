import React from "react";
import { AdminDashboardSection } from "../components";

const AdminDashboardPage = () => {
  return (
    <div className="p-5 md:p-10 flex flex-col gap-10">
      <div>
        <p className="text-2xl font-bold mb-3">Overview</p>
        <AdminDashboardSection />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
