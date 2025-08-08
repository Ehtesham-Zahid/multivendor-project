"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/dialog";
import { Button } from "../shadcn/button";
import { Loader2, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateAddressThunk } from "../features/address/addressSlice";
import { toast } from "react-toastify";

const UpdateAddressDialog = ({ address }) => {
  const dispatch = useDispatch();
  const { isLoading, error, addresses } = useSelector((state) => state.address);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: address.fullName,
      phoneNumber: address.phoneNumber,
      email: address.email,
      addressDetails: address.addressDetails,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      isPrimary: address.isPrimary,
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const resultAction = await dispatch(
        updateAddressThunk({ addressId: address._id, addressData: data })
      );
      if (updateAddressThunk.fulfilled.match(resultAction)) {
        console.log("hell");
        toast.success("Address updated successfully!");
        setIsOpen(false);
        // reset();
      } else {
        toast.error("Failed to update address.");
      }
    } catch (err) {
      toast.error("Error while updating address.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)} // Manually control
          className="border-none hover:text-primary cursor-pointer hover:underline"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle className="mb-5 font-bold">
            Update Address
          </DialogTitle>{" "}
        </DialogHeader>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          {[
            { name: "fullName", label: "Full Name", placeholder: "John Doe" },
            {
              name: "phoneNumber",
              label: "Phone Number",
              placeholder: "0300-1234567",
            },
            {
              name: "email",
              label: "Email",
              placeholder: "johndoe@gmail.com",
            },
            {
              name: "addressDetails",
              label: "Address Details",
              placeholder: "123 Street Name",
            },
            { name: "country", label: "Country", placeholder: "Pakistan" },
            { name: "state", label: "State", placeholder: "Punjab" },
            { name: "city", label: "City", placeholder: "Lahore" },
            { name: "zipCode", label: "ZIP Code", placeholder: "54000" },
          ].map((field) => (
            <div className="flex flex-col" key={field.name}>
              <label className="text-sm font-bold text-zinc-600">
                {field.label}
              </label>
              <input
                type="text"
                {...register(field.name, { required: true })}
                placeholder={field.placeholder}
                className="p-1.5 px-2 rounded-md border-2 border-zinc-300 outline-primary w-md"
              />
              {errors[field.name] && (
                <span className="text-red-500 text-sm font-semibold">
                  {field.label} is required
                </span>
              )}
            </div>
          ))}

          {/* {addresses.length !== 1 && !address?.isPrimary && (
            <div className="flex gap-x-2 items-center">
              <input
                type="checkbox"
                id="isPrimary"
                {...register("isPrimary")}
                className="bg-primary text-primary cursor-pointer"
              />
              <label
                htmlFor="isPrimary"
                className="text-dark font-medium text-sm cursor-pointer"
              >
                Set as Primary Address
              </label>
            </div>
          )} */}

          {addresses.length > 1 && !address?.isPrimary && (
            <div className="flex gap-x-2 items-center">
              <input
                type="checkbox"
                id="isPrimary"
                {...register("isPrimary")}
                className="bg-primary text-primary cursor-pointer"
              />
              <label
                htmlFor="isPrimary"
                className="text-dark font-medium text-sm cursor-pointer"
              >
                Set as Primary Address
              </label>
            </div>
          )}
          {error && (
            <span className="text-red-500 text-sm font-semibold">{error}</span>
          )}
          <Button
            disabled={isLoading}
            type="submit"
            className="text-white text-md mt-3"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Update Address"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAddressDialog;
