import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/dialog";
import { Button } from "../shadcn/button";
import { CircleUserRound, Loader2, Plus } from "lucide-react";
import CategorySelector from "./CategorySelector";
import EventDateSelector from "./EventDateSelector";
import ProductSelector from "./ProductSelector";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createEventThunk } from "../features/event/eventSlice";
import { toast } from "react-toastify";

const CreateEventDialog = () => {
  const { shopProducts } = useSelector((state) => state.product);
  const [productId, setProductId] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, error } = useSelector((state) => state.event);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      productId: productId,
      startDate: startDate,
      endDate: endDate,
      originalPrice: productPrice,
      eventPrice: data.eventPrice,
    };

    if (data.eventPrice >= productPrice) {
      toast.error(
        "Event price cannot be greater than or equal to original price"
      );
      return;
    }

    const resultAction = await dispatch(createEventThunk(payload));
    if (createEventThunk.fulfilled.match(resultAction)) {
      toast.success("Event Created Successfully!");
      setIsOpen(false);
      setProductId("");
      setProductPrice("");
      setStartDate("");
      setEndDate("");
      reset();
    } else {
      toast.error("Failed to create event: " + resultAction.error.message);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} className="w-fit">
      <DialogTrigger>
        <Button className="bg-primary text-white text-md" size="lg">
          Create Event <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle className="mb-5 font-bold">Create Event</DialogTitle>
          {shopProducts?.length > 0 ? (
            <form
              className="flex flex-col gap-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col">
                <label className="text-sm font-bold text-zinc-600">
                  Event Name
                </label>
                <input
                  type="text"
                  className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
                  placeholder="Enter event name"
                  {...register("name", { required: true })}
                />{" "}
                {errors.name && (
                  <span className="text-red-500 text-sm font-semibold">
                    This field is required
                  </span>
                )}
              </div>
              <ProductSelector
                setProductId={setProductId}
                setProductPrice={setProductPrice}
              />
              <EventDateSelector
                title={"Event Start Date"}
                onDateChange={(date) => setStartDate(date)}
              />
              <EventDateSelector
                title={"Event End Date"}
                onDateChange={(date) => setEndDate(date)}
              />
              <div className="flex flex-col">
                <label className="text-sm font-bold text-zinc-600">
                  Original Price
                </label>
                <input
                  readOnly
                  value={productPrice}
                  type="number"
                  className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md font-bold"
                  // placeholder="Enter product name"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-bold text-zinc-600">
                  Event price
                </label>
                <input
                  type="number"
                  className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
                  placeholder="Enter event price"
                  {...register("eventPrice", { required: true })}
                />{" "}
                {errors.eventPrice && (
                  <span className="text-red-500 text-sm font-semibold">
                    This field is required
                  </span>
                )}
              </div>
              {error && (
                <span className="text-red-500 text-sm font-semibold">
                  {error}
                </span>
              )}
              <Button
                disabled={isLoading}
                type="submit"
                className={"text-white text-md mt-3"}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <p>Create</p>
                )}
              </Button>
            </form>
          ) : (
            <p>Please create a product first</p>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventDialog;
