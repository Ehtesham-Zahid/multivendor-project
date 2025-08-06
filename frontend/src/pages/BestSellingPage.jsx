import React from "react";
import { BestSelling } from "../components";

const BestSellingPage = () => {
  return (
    <div>
      <BestSelling limit={10} />
    </div>
  );
};

export default BestSellingPage;
