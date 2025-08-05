"use client";

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
import { useState } from "react";
import { createAddressThunk } from "../features/address/addressSlice"; // You’ll need to implement this
import { toast } from "react-toastify";

const CreateAddressDialog = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.address);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(createAddressThunk(data));
      if (createAddressThunk.fulfilled.match(resultAction)) {
        toast.success("Address added successfully!");
        setIsOpen(false);
        reset();
      } else {
        toast.error("Failed to add address.");
      }
    } catch (err) {
      toast.error("Error while submitting address.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button className="bg-primary text-white text-md" size="lg">
          Add Address <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle className="mb-5 font-bold">Add Address</DialogTitle>
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">
                Full Name
              </label>
              <input
                type="text"
                {...register("fullName", { required: true })}
                placeholder="John Doe"
                className="p-1.5 px-2 rounded-md border-2 border-zinc-300 outline-primary w-md"
              />
              {errors.fullName && (
                <span className="text-red-500 text-sm font-semibold">
                  Full name is required
                </span>
              )}
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">
                Phone Number
              </label>
              <input
                type="tel"
                {...register("phoneNumber", { required: true })}
                placeholder="0300-1234567"
                className="p-1.5 px-2 rounded-md border-2 border-zinc-300 outline-primary w-md"
              />
              {errors.phoneNumber && (
                <span className="text-red-500 text-sm font-semibold">
                  Phone number is required
                </span>
              )}
            </div>

            {/* Street */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">Street</label>
              <input
                type="text"
                {...register("street", { required: true })}
                placeholder="123 Street Name"
                className="p-1.5 px-2 rounded-md border-2 border-zinc-300 outline-primary w-md"
              />
              {errors.street && (
                <span className="text-red-500 text-sm font-semibold">
                  Street is required
                </span>
              )}
            </div>

            {/* City */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">City</label>
              <input
                type="text"
                {...register("city", { required: true })}
                placeholder="Lahore"
                className="p-1.5 px-2 rounded-md border-2 border-zinc-300 outline-primary w-md"
              />
              {errors.city && (
                <span className="text-red-500 text-sm font-semibold">
                  City is required
                </span>
              )}
            </div>

            {/* State */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">State</label>
              <input
                type="text"
                {...register("state", { required: true })}
                placeholder="Punjab"
                className="p-1.5 px-2 rounded-md border-2 border-zinc-300 outline-primary w-md"
              />
              {errors.state && (
                <span className="text-red-500 text-sm font-semibold">
                  State is required
                </span>
              )}
            </div>

            {/* Zip Code */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">
                ZIP Code
              </label>
              <input
                type="text"
                {...register("zipCode", { required: true })}
                placeholder="54000"
                className="p-1.5 px-2 rounded-md border-2 border-zinc-300 outline-primary w-md"
              />
              {errors.zipCode && (
                <span className="text-red-500 text-sm font-semibold">
                  ZIP code is required
                </span>
              )}
            </div>

            {/* Country */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">Country</label>
              <input
                type="text"
                {...register("country", { required: true })}
                placeholder="Pakistan"
                className="p-1.5 px-2 rounded-md border-2 border-zinc-300 outline-primary w-md"
              />
              {errors.country && (
                <span className="text-red-500 text-sm font-semibold">
                  Country is required
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
              className="text-white text-md mt-3"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Save Address"
              )}
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAddressDialog;
