import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/dialog";
import { Button } from "../shadcn/button";
import { CircleUserRound, Plus } from "lucide-react";
import CategorySelector from "./CategorySelector";
import ProductSelector from "./ProductSelector";

const CreateCouponCodeDialog = () => {
  return (
    <Dialog className="w-fit">
      <DialogTrigger>
        <Button className="bg-primary text-white text-md" size="lg">
          Create Coupon Code <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle className="mb-5 font-bold">
            Create Coupon Code
          </DialogTitle>
          <form className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">
                Coupon Code
              </label>
              <input
                type="text"
                className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
                placeholder="Enter coupon code"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">
                Discount Percentage
              </label>
              <input
                type="text"
                className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
                placeholder="Enter discount percentage"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">
                Min Amount
              </label>
              <input
                type="text"
                className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
                placeholder="Enter min amount to apply this code"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">
                Max Amount
              </label>
              <input
                type="text"
                className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
                placeholder="Enter max amount to apply this code"
              />
            </div>
            {/* <ProductSelector /> */}
            <Button className={"text-white text-md mt-3"}>Create</Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCouponCodeDialog;
