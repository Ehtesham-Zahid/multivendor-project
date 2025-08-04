import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "../../assets/images/category-1.jpg";
import { Button } from "../../shadcn/button";
import { updateCurrentUserShopThunk } from "../../features/shop/shopSlice";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Camera, Loader2 } from "lucide-react";

const DashboardSettingSection = () => {
  const { shop, isLoading, error } = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(shop?.imageUrl);

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
    if (shop) {
      reset({
        shopName: shop.shopName || "",
        address: shop.address || "",
        phoneNumber: shop.phoneNumber || "",
        zipCode: shop.zipCode || "",
      });
      setPreview(shop.imageUrl || "");
    }
  }, [shop, reset]);

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
  return (
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
            defaultValue={shop?.shopName || ""}
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
            defaultValue={shop?.address || ""}
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
            defaultValue={shop?.phoneNumber || ""}
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
            defaultValue={shop?.zipCode || ""}
          />
          {errors.zipCode && (
            <span className="text-red-500 text-sm font-semibold">
              This field is required
            </span>
          )}
        </div>
        <Button
          disabled={isLoading}
          type="submit"
          className={"w-md  text-white text-md"}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <p>Update Shop</p>
          )}
        </Button>
      </form>
    </div>
  );
};

export default DashboardSettingSection;
