import React from "react";
import { Button } from "../shadcn/button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { validateCouponThunk } from "../features/coupon/couponSlice";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const CouponCodeForm = ({ totalAmount }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.coupon);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const resultAction = await dispatch(
      validateCouponThunk({ ...data, cartTotal: totalAmount })
    );

    reset();
    if (validateCouponThunk.fulfilled.match(resultAction)) {
      toast.success("Coupon applied successfully");
    }
  };

  return (
    <form
      className=" w-full flex-col flex  items-center gap-3 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2 w-full">
        <input
          type="text"
          className="p-2 py-1.5   rounded-md border-2 border-zinc-400 outline-primary inline w-full"
          placeholder="Enter Coupon Code"
          {...register("code", { required: true })}
        />
        {errors.code && (
          <p className="text-red-500 text-sm font-semibold">
            "Coupon code is required"
          </p>
        )}
      </div>

      {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

      <Button
        disabled={isLoading}
        type="submit"
        className="text-white h-full py-2.5 w-full uppercase"
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <p>APPLY</p>
        )}
      </Button>
    </form>
  );
};

export default CouponCodeForm;
