import React from "react";
import { Button } from "../shadcn/button";
import { useForm } from "react-hook-form";

const CouponCodeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  return (
    <form className=" w-full flex-row flex  items-center gap-3 ">
      <input
        type="text"
        className="p-2 py-1.5   rounded-md border-2 border-zinc-400 outline-primary inline w-full"
        placeholder="Enter Coupon Code"
        {...register("couponCode", { required: true })}
      />

      <Button className={"text-white h-full py-2.5 "}>Apply</Button>
    </form>
  );
};

export default CouponCodeForm;
