import { Loader2, Lock } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordThunk } from "../features/auth/authSlice";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const { isResetPasswordLoading, error } = useSelector((state) => state.auth);
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const passwordValue = watch("password");

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const payload = { token, newPassword: data.password };
    const resultAction = await dispatch(resetPasswordThunk(payload));
    if (resetPasswordThunk.fulfilled.match(resultAction)) {
      toast.success("Password reset successfully");
      reset();
      navigate("/auth/login");
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white/70 backdrop-blur shadow-xl rounded-xl border border-zinc-200">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-sky-100 text-sky-600">
          <Lock size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Reset password</h1>
          <p className="text-sm text-gray-500">
            Enter and confirm your new password
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            New password
          </label>
          <input
            type="password"
            id="password"
            autoComplete="new-password"
            placeholder="Enter new password"
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              maxLength: {
                value: 20,
                message: "Password must be less than 20 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium"
          >
            Confirm new password
          </label>
          <input
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            placeholder="Confirm new password"
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === passwordValue || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={isResetPasswordLoading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
        >
          {isResetPasswordLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Reset password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
