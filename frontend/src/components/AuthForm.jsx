import { useForm } from "react-hook-form";
import { Button } from "../shadcn/button";
import { CircleUserRound, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  registerUser,
  loginUser,
  resetError,
} from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AuthForm = ({ page }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [preview, setPreview] = useState(null);

  let navigate = useNavigate();

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
      formData.append("email", data.email); // example field
      formData.append("password", data.password); // example field

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
      const redirect = sessionStorage.getItem("redirectAfterLogin");
      if (redirect === "checkout") {
        navigate("/checkout");
      } else {
        navigate("/");
      }
      sessionStorage.removeItem("redirectAfterLogin");
    }

    reset();
  };

  useEffect(() => {
    dispatch(resetError());
  }, [page]);

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
      <p className="text-2xl text-center font-bold mt-3">
        {page === "register"
          ? "Register your Account"
          : "Login to your Account"}
      </p>
      {page === "register" ? (
        <div className="flex flex-col mt-5">
          <label className="text-sm font-bold text-zinc-600">Full Name</label>
          <input
            type="text"
            className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary"
            {...register("fullname", { required: true })}
            placeholder="Enter your full name"
          />
          {errors.fullname && (
            <span className="text-red-500 text-sm font-semibold">
              This field is required
            </span>
          )}
        </div>
      ) : null}

      <div className="flex flex-col mt-5">
        <label className="text-sm font-bold text-zinc-600">Email</label>
        <input
          type="email"
          className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary"
          {...register("email", { required: true })}
          placeholder="Enter your email"
        />
        {errors.email && (
          <span className="text-red-500 text-sm font-semibold">
            This field is required
          </span>
        )}
      </div>
      <div className="flex flex-col mt-5">
        <label className="text-sm font-bold text-zinc-600">Password</label>
        <input
          type="password"
          className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary"
          {...register("password", { required: true })}
          placeholder="Enter your password"
        />
        {errors.password && (
          <span className="text-red-500 text-sm font-semibold">
            This field is required
          </span>
        )}
        {page === "login" ? (
          <div className="flex justify-between items-center mt-1">
            <div className="flex gap-x-2 items-center ">
              <input
                type="checkbox"
                id="rememberMe"
                {...register("rememberMe")}
                className="bg-primary text-primary cursor-pointer "
              />
              <label
                for="rememberMe"
                className="text-dark font-medium text-sm cursor-pointer"
              >
                Remember Me
              </label>
            </div>
            <Link
              to="/auth/forgotpassword"
              className="text-end text-sm mt-1 text-zinc-500 font-medium hover:underline  "
            >
              Forgot Password?
            </Link>
          </div>
        ) : null}
      </div>

      {page === "register" ? (
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
      ) : null}

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
      {page === "register" ? (
        <p className="text-center  font-normal mt-3">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-primary font-medium cursor-pointer hover:underline decoration-2 underline-offset-2"
          >
            Sign In
          </Link>
        </p>
      ) : (
        <p className="text-center  font-normal mt-3">
          Dont have an account?{" "}
          <Link
            to="/auth/register"
            className="text-primary font-medium cursor-pointer hover:underline decoration-2 underline-offset-2"
          >
            Register
          </Link>
        </p>
      )}
    </form>
  );
};

export default AuthForm;

//   <form onSubmit={handleSubmit(onSubmit)}>
//     {/* register your input into the hook by invoking the "register" function */}
//     <input defaultValue="test" {...register("example")} />

//     {/* include validation with required or other standard HTML validation rules */}
//     <input {...register("exampleRequired", { required: true })} />
//     {/* errors will return when field validation fails  */}
//     {errors.exampleRequired && <span>This field is required</span>}

//     <input type="submit" />
//   </form>;
