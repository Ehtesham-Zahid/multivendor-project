import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/dialog";
import { Button } from "../shadcn/button";
import { CircleUserRound, Edit, Loader2, Plus } from "lucide-react";
import CategorySelector from "./CategorySelector";
import EventDateSelector from "./EventDateSelector";
import ProductSelector from "./ProductSelector";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  createEventThunk,
  updateEventThunk,
} from "../features/event/eventSlice";
import { toast } from "react-toastify";

const UpdateEventDialog = ({ event }) => {
  const { shopProducts } = useSelector((state) => state.product);
  const [productId, setProductId] = useState(event?.productId._id || "");
  const [productPrice, setProductPrice] = useState(event?.originalPrice || "");
  const [startDate, setStartDate] = useState(event?.startDate || "");
  const [endDate, setEndDate] = useState(event?.endDate || "");
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

    const resultAction = await dispatch(
      updateEventThunk({ id: event._id, data: payload })
    );
    if (updateEventThunk.fulfilled.match(resultAction)) {
      toast.success("Event Updated Successfully!");
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

  //   If i wantt o add current calues in the inputs, in name also
  useEffect(() => {
    if (event) {
      setProductId(event.productId._id);

      setProductPrice(event.originalPrice);
      setStartDate(event.startDate);
      setEndDate(event.endDate);
      reset({
        name: event.name || "",
        eventPrice: event.eventPrice || "",
      });
    }
  }, [event, reset]);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} className="w-fit">
      <DialogTrigger>
        <Edit className="" size={20} />
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle className="mb-5 font-bold">Update Event</DialogTitle>
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

export default UpdateEventDialog;
