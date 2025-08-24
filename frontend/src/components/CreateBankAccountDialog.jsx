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
import { createBankAccountThunk } from "../features/bankAccount/bankAccountSlice";
import { toast } from "react-toastify";

const CreateBankAccountDialog = ({ page, onSuccess }) => {
  const dispatch = useDispatch();
  const { isLoading, error, shopBankAccounts } = useSelector(
    (state) => state.bankAccount
  );
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onCreateBankAccountSubmit = async (data) => {
    if (shopBankAccounts.length === 0) {
      data.isDefault = true;
    }
    try {
      const resultAction = await dispatch(createBankAccountThunk(data));
      if (createBankAccountThunk.fulfilled.match(resultAction)) {
        toast.success("Bank account added successfully!");
        onSuccess && onSuccess(resultAction.payload);
        setIsOpen(false);
        reset();
      } else {
        toast.error("Failed to add bank account.");
      }
    } catch (err) {
      toast.error("Error while submitting bank account.");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      className="overflow-y-scroll"
    >
      <DialogTrigger>
        <Button
          className="bg-primary text-white text-md cursor-pointer"
          size="lg"
        >
          Add Bank Account <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit max-h-screen h-fit overflow-y-scroll flex flex-col p-3 min-[400px]:p-5">
        <DialogHeader>
          <DialogTitle className="mb-5 font-bold text-start">
            Add Bank Account
          </DialogTitle>
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onCreateBankAccountSubmit)}
          >
            {/* Account Holder Name */}
            <div className="flex flex-col">
              <label className="text-sm text-start font-bold text-zinc-600">
                Account Holder Name
              </label>
              <input
                type="text"
                {...register("accountHolderName", { required: true })}
                placeholder="John Doe"
                className="p-1.5 px-2 rounded-md border-2 border-zinc-300 outline-primary w-xs sm:w-sm lg:w-md"
              />
              {errors.accountHolderName && (
                <span className="text-red-500 text-sm font-semibold">
                  Account holder name is required
                </span>
              )}
            </div>

            {/* Bank Name */}
            <div className="flex flex-col">
              <label className="text-sm text-start font-bold text-zinc-600">
                Bank Name
              </label>
              <input
                type="text"
                {...register("bankName", { required: true })}
                placeholder="HBL Bank"
                className="p-1.5 px-2 rounded-md border-2 border-zinc-300 outline-primary w-xs sm:w-sm lg:w-md"
              />
              {errors.bankName && (
                <span className="text-red-500 text-sm font-semibold">
                  Bank name is required
                </span>
              )}
            </div>

            {/* Account Number */}
            <div className="flex flex-col">
              <label className="text-sm text-start font-bold text-zinc-600">
                Account Number
              </label>
              <input
                type="text"
                {...register("accountNumber", { required: true })}
                placeholder="1234567890"
                className="p-1.5 px-2 rounded-md border-2 border-zinc-300 outline-primary w-xs sm:w-sm lg:w-md"
              />
              {errors.accountNumber && (
                <span className="text-red-500 text-sm font-semibold">
                  Account number is required
                </span>
              )}
            </div>

            {/* IFSC Code */}
            <div className="flex flex-col">
              <label className="text-sm text-start font-bold text-zinc-600">
                Routing Number
              </label>
              <input
                type="text"
                {...register("routingNumber", {
                  required: true,
                  minLength: 9,
                  maxLength: 9,
                })}
                placeholder="123456789"
                className="p-1.5 px-2 rounded-md border-2 border-zinc-300 outline-primary w-xs sm:w-sm lg:w-md"
              />
            </div>
            {errors.routingNumber && (
              <span className="text-red-500 text-sm font-semibold">
                {errors.routingNumber.message ||
                  "Routing number is required and must be 9 digits"}
              </span>
            )}
            {/* Set as Default */}
            {shopBankAccounts.length !== 0 && (
              <div className="flex gap-x-2 items-center">
                <input
                  type="checkbox"
                  id="isDefault"
                  {...register("isDefault")}
                  className="bg-primary text-primary cursor-pointer"
                />
                <label
                  htmlFor="isDefault"
                  className="text-dark font-medium text-sm cursor-pointer"
                >
                  Set as Default Bank Account
                </label>
              </div>
            )}

            {error && (
              <span className="text-red-500 text-xs sm:text-sm font-semibold w-xs sm:w-sm lg:w-md">
                {error}
              </span>
            )}

            <Button
              disabled={isLoading}
              type="submit"
              className="text-white text-md mt-3 cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Save Bank Account"
              )}
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBankAccountDialog;
