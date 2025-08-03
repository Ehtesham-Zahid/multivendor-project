import React from "react";
import {
  CreateCouponCodeDialog,
  DashboardCouponCodesSection,
} from "../components";

const DashboardCouponCodesPage = () => {
  return (
    <div className="p-10 flex flex-col gap-">
      <div className="flex justify-between">
        <p className="text-3xl font-bold mb-3">All Coupon Codes</p>
        <CreateCouponCodeDialog />
      </div>
      <DashboardCouponCodesSection />
    </div>
  );
};

export default DashboardCouponCodesPage;
