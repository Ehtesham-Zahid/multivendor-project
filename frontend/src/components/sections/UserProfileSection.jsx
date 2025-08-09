import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "../../assets/images/category-1.jpg";
import { Button } from "../../shadcn/button";
import { Camera, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { updateMeThunk } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";

const UserProfileSection = () => {
  const { user, isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(user?.imageUrl);

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
    const formData = new FormData();

    formData.append("fullname", data.fullname); // example field
    // Append file
    if (data.avatar && data.avatar[0]) {
      formData.append("image", data.avatar[0]);
    }

    const resultAction = await dispatch(updateMeThunk(formData));

    if (updateMeThunk.fulfilled.match(resultAction)) {
      toast.success("User Updated!");
    } else {
      toast.error("Error in updating user");
    }
  };
  useEffect(() => {
    if (user) {
      reset({ fullname: user.fullname });
      setPreview(user.imageUrl);
    }
  }, [user, reset]);

  return (
    <div className="flex justify-center items-center flex-col      w-full rounded-md ">
      {isLoading ? (
        <Spinner />
      ) : (
        <form
          className="w-full flex flex-col gap-5 justify-center items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          {" "}
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
            <label className="text-sm font-bold text-zinc-600">Full Name</label>
            <input
              type="text"
              className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-xs sm:w-md"
              {...register("fullname")}
              placeholder="Enter your full name"
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className={"w-xs sm:w-md  mt-5 text-white text-md"}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <p>Update</p>
            )}
          </Button>
        </form>
      )}
    </div>
  );
};

export default UserProfileSection;
