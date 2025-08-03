import React from "react";
import { CreateProductDialog, DashboardProductsSection } from "../components";

const DashboardProductsPage = () => {
  return (
    <div className="p-10 flex flex-col gap-3">
      <div className="flex justify-between">
        <p className="text-3xl font-bold mb-3">All Products</p>
        <CreateProductDialog />
      </div>
      <DashboardProductsSection />
    </div>
  );
};

export default DashboardProductsPage;
