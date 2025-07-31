import { useForm } from "react-hook-form";
import { Button } from "../shadcn/button";
import { CircleUserRound, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  registerUser,
  loginUser,
  resetError,
} from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CreateShopForm = ({ page }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [preview, setPreview] = useState(null);

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

  const onSubmit = async (data) => {
    let formData = data;
    if (page === "register") {
      formData = new FormData();
      // Append text fields
      formData.append("fullname", data.fullname); // example field

      // Append file
      if (data.avatar && data.avatar[0]) {
        formData.append("image", data.avatar[0]);
      }
    }

    const resultAction = await dispatch(
      page === "register" ? registerUser(formData) : loginUser(formData)
    );

    if (page === "register" && registerUser.fulfilled.match(resultAction)) {
      toast.success("Verification Email sent. Please verify to continue!");
    } else if (page === "login" && loginUser.fulfilled.match(resultAction)) {
      toast.success("Logged in successfully!");
    }

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
      className="shadow-2xl rounded-md p-5 w-1/4 py-10 shadow-zinc-500"
    >
      <Link to="/" className="flex items-center justify-center">
        <p className="text-5xl font-black">
          Swift<span className="text-primary">Cart</span>
        </p>
      </Link>

      <p className="text-2xl text-center font-bold mt-3">Create your Shop</p>

      <div className="flex flex-col mt-5">
        <label className="text-sm font-bold text-zinc-600">Shop Name</label>
        <input
          type="text"
          className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary"
          {...register("shopName", { required: true })}
          placeholder="Enter shop name"
        />
        {errors.shopName && (
          <span className="text-red-500 text-sm font-semibold">
            This field is required
          </span>
        )}
      </div>
      <div className="flex flex-col mt-5">
        <label className="text-sm font-bold text-zinc-600">Phone Number</label>
        <input
          type="number"
          className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary"
          {...register("phoneNumber", { required: true })}
          placeholder="Enter phone number"
        />
        {errors.phoneNumber && (
          <span className="text-red-500 text-sm font-semibold">
            This field is required
          </span>
        )}
      </div>
      <div className="flex flex-col mt-5">
        <label className="text-sm font-bold text-zinc-600">Address</label>
        <input
          type="text"
          className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary"
          {...register("address", { required: true })}
          placeholder="Enter shop address"
        />
        {errors.address && (
          <span className="text-red-500 text-sm font-semibold">
            This field is required
          </span>
        )}
      </div>
      <div className="flex flex-col mt-5">
        <label className="text-sm font-bold text-zinc-600">Zip Code</label>
        <input
          type="number"
          className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary"
          {...register("zipCode", { required: true })}
          placeholder="Enter Zip Code"
        />
        {errors.zipCode && (
          <span className="text-red-500 text-sm font-semibold">
            This field is required
          </span>
        )}
      </div>
      <div className="flex flex-col mt-5">
        <label className="text-sm font-bold text-zinc-600 mb-1">Avatar</label>
        <div className="flex items-center gap-5">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <CircleUserRound size={"28px"} />
          )}
          <label
            for="file-input"
            className="p-1.5 px-2   rounded-md border-2 border-zinc-300 w-[116px] cursor-pointer"
          >
            <span className=" font-medium">Upload a File</span>
            <input
              id="file-input"
              accept=".jpg,.jpeg,.png"
              class="sr-only"
              type="file"
              {...register("avatar")}
            ></input>
          </label>
        </div>
      </div>
      {error ? (
        <p className="text-center text-danger font-bold text-sm mt-2">
          {error}
        </p>
      ) : null}

      <Button
        disabled={isLoading}
        type="submit"
        className={"text-white text-md cursor-pointer w-full mt-8"}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <p>Submit</p>
        )}
      </Button>
    </form>
  );
};

export default CreateShopForm;
