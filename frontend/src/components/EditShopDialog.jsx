import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/dialog";
import { Button } from "../shadcn/button";
import { Edit, Loader2, ShieldAlert } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  updateCurrentUserShopThunk,
  updateShopStatusThunk,
} from "../features/shop/shopSlice";

const EditShopDialog = () => {
  const dispatch = useDispatch();
  const { shop, updateCurrentUserShopLoading, updateShopStatusLoading, error } =
    useSelector((state) => state.shop);

  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState(shop?.imageUrl || "");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const avatarFile = watch("avatar");

  useEffect(() => {
    if (shop) {
      reset({
        shopName: shop.shopName || "",
        address: shop.address || "",
        phoneNumber: shop.phoneNumber || "",
        zipCode: shop.zipCode || "",
      });
      setPreview(shop.imageUrl || "");
    }
  }, [shop, reset, isOpen]);

  useEffect(() => {
    if (avatarFile && avatarFile.length > 0) {
      const file = avatarFile[0];
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [avatarFile]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("shopName", data.shopName);
    formData.append("address", data.address);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("zipCode", data.zipCode);
    if (data.avatar && data.avatar[0]) {
      formData.append("image", data.avatar[0]);
    }

    const resultAction = await dispatch(updateCurrentUserShopThunk(formData));
    if (updateCurrentUserShopThunk.fulfilled.match(resultAction)) {
      toast.success("Shop Updated!");
      setIsOpen(false);
    } else {
      toast.error("Failed to update shop");
    }
  };

  const onToggleStatus = async () => {
    if (!shop?._id) return;
    const action = await dispatch(updateShopStatusThunk(shop._id));
    if (updateShopStatusThunk.fulfilled.match(action)) {
      const next = action.payload?.shop?.isActive;
      toast.success(`Shop ${next ? "activated" : "deactivated"}`);
      // keep dialog open; UI will reflect new state
    } else {
      toast.error("Failed to update shop status");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full">
        <Button
          className="bg-primary text-white w-full text-base cursor-pointer"
          size="icon"
        >
          Edit <Edit size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-sm md:w-md lg:w-lg max-h-screen  h-fit overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="mb-4 font-bold text-start text-lg sm:text-xl">
            Edit Shop
          </DialogTitle>
        </DialogHeader>

        {/* Two actions: Update details and Toggle status */}
        <div className="flex flex-col gap-6">
          {/* Update details form */}
          <form
            className="flex flex-col gap-3 sm:gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex items-center gap-4 justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-20 h-20 rounded-full border-2 border-zinc-300 object-cover"
              />
              <label
                htmlFor="file-input"
                className="p-1.5 px-2 rounded-md border-2 border-zinc-300 cursor-pointer text-sm"
              >
                Change Logo
                <input
                  id="file-input"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  className="sr-only"
                  {...register("avatar")}
                />
              </label>
            </div>

            {[
              {
                name: "shopName",
                label: "Shop Name",
                placeholder: "Update shop name",
              },
              {
                name: "address",
                label: "Shop Address",
                placeholder: "Update shop address",
              },
              {
                name: "phoneNumber",
                label: "Shop Phone Number",
                placeholder: "Update phone number",
              },
              {
                name: "zipCode",
                label: "Shop Zip Code",
                placeholder: "Update zip code",
              },
            ].map((f) => (
              <div className="flex flex-col" key={f.name}>
                <label className="text-sm text-start font-bold text-zinc-600 mb-1">
                  {f.label}
                </label>
                <input
                  type="text"
                  placeholder={f.placeholder}
                  className="p-2 px-3 rounded-md border-2 border-zinc-300 outline-primary w-full text-sm sm:text-base"
                  {...register(f.name, { required: true })}
                />
                {errors[f.name] && (
                  <span className="text-red-500 text-sm font-semibold">
                    {f.label} is required
                  </span>
                )}
              </div>
            ))}

            {error && (
              <span className="text-red-500 text-sm font-semibold">
                {error}
              </span>
            )}

            <Button
              disabled={updateCurrentUserShopLoading}
              type="submit"
              className="text-white text-md mt-2 cursor-pointer"
            >
              {updateCurrentUserShopLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Update Shop"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="h-px bg-zinc-200" />

          {/* Deactivate/Activate */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-zinc-700">
                {shop?.isActive ? "Deactivate Shop" : "Activate Shop"}
              </p>
              <p className="text-xs text-zinc-500">
                Toggle your shop availability
              </p>
            </div>
            <Button
              onClick={onToggleStatus}
              disabled={updateShopStatusLoading}
              className="text-white text-sm bg-red-500 hover:bg-red-600 cursor-pointer"
            >
              {updateShopStatusLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <div className="flex items-center gap-2">
                  <ShieldAlert size={16} />
                  <span>{shop?.isActive ? "Deactivate" : "Activate"}</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditShopDialog;
