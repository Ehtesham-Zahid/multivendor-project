import ProfileImage from "../../assets/images/category-1.jpg";
import { Button } from "../../shadcn/button";

const ProfileSection = () => {
  return (
    <div className="flex justify-center items-center flex-col      w-full rounded-md ">
      <img
        src={ProfileImage}
        className={"w-40 h-40  rounded-full border-4 border-sky-500"}
      />
      <form className="w-full flex flex-col gap-10">
        <div className="flex  justify-around">
          <div className="flex flex-col">
            <label className="text-sm font-bold text-zinc-600">Full Name</label>
            <input
              type="text"
              className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
              placeholder="Enter your full name"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-zinc-600">
              Email Address
            </label>
            <input
              type="text"
              className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
              placeholder="Enter your full name"
            />
          </div>
        </div>
        <div className="flex  justify-around">
          <div className="flex flex-col">
            <label className="text-sm font-bold text-zinc-600">
              Phone Number
            </label>
            <input
              type="text"
              className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
              placeholder="Enter your full name"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-zinc-600">Password</label>
            <input
              type="text"
              className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
              placeholder="Enter your full name"
            />
          </div>
        </div>
        {/* <div className="flex justify-around"> */}
        <Button
          type="submit"
          className={"w-1/8 ml-[150px] mt-5 text-white text-md"}
        >
          Update
        </Button>
        {/* <div></div> */}
        {/* </div> */}
      </form>
    </div>
  );
};

export default ProfileSection;
