import { Loader2, Mail } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordThunk } from "../features/auth/authSlice";
import { useForm } from "react-hook-form";

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const { isForgotPasswordLoading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const resultAction = await dispatch(forgotPasswordThunk(data));
    if (forgotPasswordThunk.fulfilled.match(resultAction)) {
      toast.success("Reset link sent to your email");
      reset();
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white/70 backdrop-blur shadow-xl rounded-xl border border-zinc-200">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-sky-100 text-sky-600">
          <Mail size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Forgot password</h1>
          <p className="text-sm text-gray-500">
            We’ll send a reset link to your email
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email address
          </label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={isForgotPasswordLoading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
        >
          {isForgotPasswordLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Send reset link"
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
