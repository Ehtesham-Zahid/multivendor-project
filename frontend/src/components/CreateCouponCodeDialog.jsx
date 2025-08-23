import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/dialog";
import { Button } from "../shadcn/button";
import { Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createCouponThunk } from "../features/coupon/couponSlice";
import { toast } from "react-toastify";
import CouponDateSelector from "./CouponDateSelector";
import { useState } from "react";

const CreateCouponCodeDialog = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { createCouponLoading } = useSelector((state) => state.coupon);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (startDate && endDate) {
      data.startDate = startDate;
      data.endDate = endDate;
    }

    const resultAction = await dispatch(createCouponThunk(data));
    if (createCouponThunk.fulfilled.match(resultAction)) {
      toast.success("Coupon code created successfully");
      reset();
      setStartDate("");
      setEndDate("");
      setIsOpen(false); // Close the dialog
    } else {
      toast.error(resultAction.payload);
    }
  };

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) {
      // Reset form when dialog is closed
      reset();
      setStartDate("");
      setEndDate("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-white text-md" size="lg">
          Create Coupon Code <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle className="mb-5 font-bold">
            Create Coupon Code
          </DialogTitle>
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">
                Coupon Code
              </label>
              <input
                type="text"
                className="p-1.5 px-2 uppercase  rounded-md border-2 border-zinc-300 outline-primary w-md"
                placeholder="Enter coupon code"
                {...register("code")}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">
                Discount Percentage
              </label>
              <input
                type="number"
                className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
                placeholder="Enter discount percentage"
                {...register("discountPercentage")}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">
                Usage Limit
              </label>
              <input
                type="number"
                className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
                placeholder="Enter usage limit"
                {...register("usageLimit")}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">
                Min Cart Amount
              </label>
              <input
                type="number"
                className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
                placeholder="Enter min cart amount to apply this code"
                {...register("minCartAmount")}
              />
            </div>
            <CouponDateSelector
              title={"Start Date"}
              onDateChange={(date) => setStartDate(date)}
            />
            <CouponDateSelector
              title={"End Date"}
              onDateChange={(date) => setEndDate(date)}
            />
            <Button
              className={"text-white text-md mt-3 cursor-pointer"}
              type="submit"
              disabled={createCouponLoading}
            >
              {createCouponLoading ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                "Create"
              )}
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCouponCodeDialog;
