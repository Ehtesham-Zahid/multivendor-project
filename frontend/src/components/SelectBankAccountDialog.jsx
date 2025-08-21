"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/dialog";
import { Button } from "../shadcn/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  getBankAccountsThunk,
  deleteBankAccountThunk,
} from "../features/bankAccount/bankAccountSlice";
import CreateBankAccountDialog from "./CreateBankAccountDialog";
import { useForm } from "react-hook-form";
import { requestWithdrawalThunk } from "../features/withdrawal/withdrawalSlice";
import { toast } from "react-toastify";
import { Loader2, Trash2 } from "lucide-react";
import Spinner from "./Spinner";

const SelectBankAccountDialog = ({ trigger, onSelect, accountBalance }) => {
  const dispatch = useDispatch();
  const {
    shopBankAccounts,
    isShopBankAccountsLoading,
    isDeleteBankAccountLoading,
  } = useSelector((state) => state.bankAccount);
  const { isRequestWithdrawalLoading } = useSelector(
    (state) => state.withdrawal
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isOpen) {
      dispatch(getBankAccountsThunk());
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (!selectedId && shopBankAccounts?.length) {
      const defaultAcc = shopBankAccounts.find((a) => a.isDefault);
      setSelectedId(defaultAcc ? defaultAcc._id : shopBankAccounts[0]._id);
    }
  }, [shopBankAccounts, selectedId]);

  const selectedAccount = useMemo(
    () => shopBankAccounts?.find((a) => a._id === selectedId) || null,
    [shopBankAccounts, selectedId]
  );

  const handleAdded = (created) => {
    dispatch(getBankAccountsThunk()).then(() => {
      if (created?._id) setSelectedId(created._id);
    });
  };

  const handleWithdrawal = async (data) => {
    const resultAction = await dispatch(
      requestWithdrawalThunk({
        bankAccountId: selectedId,
        amount: data.amount,
      })
    );
    if (requestWithdrawalThunk.fulfilled.match(resultAction)) {
      toast.success("Withdrawal request sent successfully");
      setIsOpen(false);
    } else {
      toast.error("Failed to send withdrawal request");
    }
  };

  const handleDeleteAccount = async (accountId) => {
    setDeletingId(accountId);
    const resultAction = await dispatch(deleteBankAccountThunk(accountId));
    if (deleteBankAccountThunk.fulfilled.match(resultAction)) {
      toast.success("Bank account deleted successfully");
      if (selectedId === accountId) {
        setSelectedId(null);
      }
      dispatch(getBankAccountsThunk());
    } else {
      toast.error("Failed to delete bank account");
    }
    setDeletingId(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <DialogHeader>
            <DialogTitle className="mb-2">Select Bank Account</DialogTitle>
          </DialogHeader>
          <CreateBankAccountDialog onSuccess={handleAdded} />
        </div>

        <div className="mt-2 space-y-3">
          {isShopBankAccountsLoading ? (
            <div className="text-sm text-zinc-600">
              <Spinner />
            </div>
          ) : shopBankAccounts?.length === 0 ? (
            <div className="text-sm text-zinc-600">
              No bank accounts found. Please add a bank account.
            </div>
          ) : (
            <div className="flex flex-col divide-y">
              {shopBankAccounts?.map((acc) => (
                <div
                  key={acc._id}
                  className="flex items-center justify-between py-2"
                >
                  <label className="flex items-center gap-3 flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="bankAccount"
                      value={acc._id}
                      checked={selectedId === acc._id}
                      onChange={() => setSelectedId(acc._id)}
                      className="h-4 w-4"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {acc.accountHolderName} • {acc.bankName}
                      </span>
                      <span className="text-xs text-zinc-600">
                        •••• {acc.accountNumber?.slice(-4)}
                      </span>
                    </div>
                  </label>

                  <div className="flex items-center gap-2">
                    {acc.isDefault && (
                      <span className="text-xs px-2 py-0.5 rounded bg-zinc-200">
                        Default
                      </span>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteAccount(acc._id)}
                      disabled={isDeleteBankAccountLoading}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                    >
                      {isDeleteBankAccountLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4 cursor-pointer" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <p className="text-sm text-zinc-600 font-bold">
            Enter Amount to Withdraw
          </p>
          <input
            type="number"
            className="w-full p-2 rounded-md border border-zinc-300 outline-primary font-bold"
            placeholder="Enter Amount"
            {...register("amount", {
              required: true,
              min: { value: 100, message: "Amount must be greater than $100" },
              max: {
                value: accountBalance,
                message: "Amount must be less than or equal to account balance",
              },
            })}
          />
          {errors.amount && (
            <span className="text-red-500 text-sm font-semibold">
              {errors.amount.message ||
                "Amount must be greater than 0 and less than or equal to account balance"}
            </span>
          )}
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="secondary"
            onClick={() => setIsOpen(false)}
            className="cursor-pointer text-black "
          >
            Cancel
          </Button>
          <Button
            disabled={!selectedId}
            onClick={handleSubmit(handleWithdrawal)}
            className="bg-primary text-white cursor-pointer"
          >
            {isRequestWithdrawalLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Request Withdrawal"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectBankAccountDialog;
