import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../shadcn/button";
import {
  updateCurrentUserShopThunk,
  updateShopStatusThunk,
} from "../../features/shop/shopSlice";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Camera, Loader2, ShieldAlert } from "lucide-react";
import Spinner from "../Spinner";

const DashboardSettingSection = () => {
  const {
    currentUserShop,
    updateCurrentUserShopLoading,
    updateShopStatusLoading,
    getCurrentUserShopLoading,
    error,
  } = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(currentUserShop?.imageUrl);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const avatarFile = watch("avatar");

  useEffect(() => {
    if (avatarFile && avatarFile.length > 0) {
      const file = avatarFile[0];
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Clean up memory
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [avatarFile]);

  useEffect(() => {
    if (currentUserShop) {
      reset({
        shopName: currentUserShop.shopName || "",
        address: currentUserShop.address || "",
        phoneNumber: currentUserShop.phoneNumber || "",
        zipCode: currentUserShop.zipCode || "",
      });
      setPreview(currentUserShop.imageUrl || "");
    }
  }, [currentUserShop, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("shopName", data.shopName);
    formData.append("address", data.address);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("zipCode", data.zipCode);

    // Append file
    if (data.avatar && data.avatar[0]) {
      formData.append("image", data.avatar[0]);
    }

    const resultAction = await dispatch(updateCurrentUserShopThunk(formData));

    if (updateCurrentUserShopThunk.fulfilled.match(resultAction)) {
      toast.success("Shop Updated!");
    } else {
      toast.error("Error in updating shop");
    }
  };

  const onToggleStatus = async () => {
    if (!currentUserShop?._id) return;
    const action = await dispatch(updateShopStatusThunk(currentUserShop._id));
    if (updateShopStatusThunk.fulfilled.match(action)) {
      const next = action.payload?.shop?.isActive;
      toast.success(`Shop ${next ? "activated" : "deactivated"}`);
      // keep dialog open; UI will reflect new state
    } else {
      toast.error("Failed to update shop status");
    }
  };
  return getCurrentUserShopLoading ? (
    <div className="flex justify-center items-center h-full mt-52">
      <Spinner />
    </div>
  ) : (
    <div className="flex justify-center items-center flex-col      w-full rounded-md ">
      <form
        className="w-full flex flex-col gap-8 justify-center items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <img
          src={shop?.imageUrl || ProfileImage}
          className={"w-40 h-40  rounded-full border-4 border-sky-500"}
          {...register("image", { required: true })}
        /> */}
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className={"w-40 h-40  rounded-full border-4 border-sky-500"}
          />
          <label
            for="file-input"
            // className="p-1.5 px-2   rounded-md border-2 border-zinc-300 w-[116px] cursor-pointer"
          >
            <Camera
              className="absolute right-2 top-30 bg-primary rounded-full text-white p-1 cursor-pointer"
              size={28}
            />
            <input
              id="file-input"
              accept=".jpg,.jpeg,.png"
              class="sr-only"
              type="file"
              {...register("avatar")}
            ></input>
          </label>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-bold text-zinc-600">Shop Name</label>
          <input
            type="text"
            className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
            placeholder="Update shop name"
            {...register("shopName", { required: true })}
            defaultValue={currentUserShop?.shopName || ""}
          />
          {errors.shopName && (
            <span className="text-red-500 text-sm font-semibold">
              This field is required
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-bold text-zinc-600">
            Shop Address
          </label>
          <input
            type="text"
            className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
            placeholder="Update shop address"
            {...register("address", { required: true })}
            defaultValue={currentUserShop?.address || ""}
          />
          {errors.address && (
            <span className="text-red-500 text-sm font-semibold">
              This field is required
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-bold text-zinc-600">
            Shop Phone Number
          </label>
          <input
            type="text"
            className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
            placeholder="Update shop phone number"
            {...register("phoneNumber", { required: true })}
            defaultValue={currentUserShop?.phoneNumber || ""}
          />
          {errors.phoneNumber && (
            <span className="text-red-500 text-sm font-semibold">
              This field is required
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-bold text-zinc-600">
            Shop Zip Code
          </label>
          <input
            type="text"
            className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
            placeholder="Update shop zip code"
            {...register("zipCode", { required: true })}
            defaultValue={currentUserShop?.zipCode || ""}
          />
          {errors.zipCode && (
            <span className="text-red-500 text-sm font-semibold">
              This field is required
            </span>
          )}
        </div>
        <Button
          disabled={updateCurrentUserShopLoading}
          type="submit"
          className={"w-md  text-white text-md"}
        >
          {updateCurrentUserShopLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <p>Update Shop</p>
          )}
        </Button>
        <Button
          onClick={onToggleStatus}
          disabled={updateShopStatusLoading}
          className="text-white text-md bg-red-500 hover:bg-red-600 cursor-pointer w-md"
        >
          {updateShopStatusLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <div className="flex items-center gap-2">
              <ShieldAlert size={16} />
              <span>
                {currentUserShop?.isActive ? "Deactivate" : "Activate"} Your
                Shop
              </span>
            </div>
          )}
        </Button>
      </form>
    </div>
  );
};

export default DashboardSettingSection;
