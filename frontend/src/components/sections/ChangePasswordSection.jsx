import { Button } from "../../shadcn/button";

const ChangePasswordSection = () => {
  return (
    <div className="w-full flex flex-col items-center ">
      <p className="flex justify-center items-center font-bold text-3xl mb-10">
        Change Password
      </p>
      <form className="flex flex-col gap-5">
        <div className="flex flex-col">
          <label className=" font-bold text-zinc-600">Old Password</label>
          <input
            type="text"
            className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-lg"
            placeholder="Enter your old password"
          />
        </div>
        <div className="flex flex-col">
          <label className=" font-bold text-zinc-600">New Password</label>
          <input
            type="text"
            className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-lg"
            placeholder="Enter your new password"
          />
        </div>
        <div className="flex flex-col">
          <label className=" font-bold text-zinc-600">
            Confirm New Password
          </label>
          <input
            type="text"
            className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-lg"
            placeholder="Confirm your new password"
          />
        </div>
        <Button className="text-md text-white cursor-pointer">Update</Button>
      </form>
    </div>
  );
};

export default ChangePasswordSection;
