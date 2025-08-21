import React from "react";
import { AdminWithdrawalSection } from "../components";

const AdminWithdrawalPage = () => {
  return (
    <div className="p-5 md:p-10 flex flex-col gap-10">
      <div>
        <p className="text-2xl font-bold mb-3">All Withdrawals</p>
        <AdminWithdrawalSection />
      </div>
    </div>
  );
};

export default AdminWithdrawalPage;
