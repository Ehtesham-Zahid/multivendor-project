import { useForm } from "react-hook-form";
import { toast } from "react-toastify"; // Optional for notifications
import { changePasswordThunk } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../shadcn/button";
import { Loader2 } from "lucide-react";

const UserChangePasswordSection = () => {
  const { error, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    const resultAction = await dispatch(changePasswordThunk(data));

    if (changePasswordThunk.fulfilled.match(resultAction)) {
      toast.success("Password Changed Successfully");
      reset();
    } else {
      toast.error("Error in changing password");
    }
  };

  return (
    <div className="w-full flex flex-col items-center ">
      <p className="flex justify-center items-center font-bold text-3xl mb-10">
        Change Password
      </p>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label className=" font-bold text-zinc-600">Old Password</label>
          <input
            type="password"
            className="p-1.5 px-2 rounded-md border-2 border-zinc-300 outline-primary w-lg"
            placeholder="Enter your old password"
            {...register("oldPassword", {
              required: "Old password is required",
            })}
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className=" font-bold text-zinc-600">New Password</label>
          <input
            type="password"
            className="p-1.5 px-2 rounded-md border-2 border-zinc-300 outline-primary w-lg"
            placeholder="Enter your new password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "New password must be at least 6 characters",
              },
            })}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className=" font-bold text-zinc-600">
            Confirm New Password
          </label>
          <input
            type="password"
            className="p-1.5 px-2 rounded-md border-2 border-zinc-300 outline-primary w-lg"
            placeholder="Confirm your new password"
            {...register("confirmNewPassword", {
              required: "Please confirm your new password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
          />
          {errors.confirmNewPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmNewPassword.message}
            </p>
          )}
        </div>

        {error ? (
          <p className="text-center text-danger font-bold text-sm mt-2">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={isLoading}
          className={"w-lg  mt-5 text-white text-md"}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <p>Update</p>
          )}
        </Button>
      </form>
    </div>
  );
};

export default UserChangePasswordSection;
