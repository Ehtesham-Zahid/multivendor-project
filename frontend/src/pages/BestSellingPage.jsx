import React from "react";
import { BestSelling } from "../components";

const BestSellingPage = () => {
  return (
    <div className="mb-20">
      <BestSelling limit={10} />
    </div>
  );
};

export default BestSellingPage;
