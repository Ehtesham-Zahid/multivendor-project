import React, { useEffect } from "react";

const SuccessSection = () => {
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify([]));
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Success</h1>
    </div>
  );
};

export default SuccessSection;
