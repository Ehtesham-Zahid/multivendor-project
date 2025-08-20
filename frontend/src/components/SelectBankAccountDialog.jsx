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
import { getBankAccountsThunk } from "../features/bankAccount/bankAccountSlice";
import CreateBankAccountDialog from "./CreateBankAccountDialog";

const SelectBankAccountDialog = ({ trigger, onSelect }) => {
  const dispatch = useDispatch();
  const { shopBankAccounts, isShopBankAccountsLoading } = useSelector(
    (state) => state.bankAccount
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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
          {!shopBankAccounts?.length && !isShopBankAccountsLoading && (
            <div className="text-sm text-zinc-600">
              No bank accounts found. Please add a bank account.
            </div>
          )}

          <div className="flex flex-col divide-y">
            {shopBankAccounts?.map((acc) => (
              <label
                key={acc._id}
                className="flex items-center justify-between py-2 cursor-pointer"
              >
                <div className="flex items-center gap-3">
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
                </div>
                {acc.isDefault && (
                  <span className="text-xs px-2 py-0.5 rounded bg-zinc-200">
                    Default
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={!selectedId}
            onClick={() => {
              onSelect && onSelect(selectedAccount);
              setIsOpen(false);
            }}
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectBankAccountDialog;
