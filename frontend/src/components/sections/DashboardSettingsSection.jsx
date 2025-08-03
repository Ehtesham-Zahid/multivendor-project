import ProfileImage from "../../assets/images/category-1.jpg";
import { Button } from "../../shadcn/button";

const DashboardSettingSection = () => {
  return (
    <div className="flex justify-center items-center flex-col      w-full rounded-md ">
      <form className="w-full flex flex-col gap-8 justify-center items-center">
        <img
          src={ProfileImage}
          className={"w-40 h-40  rounded-full border-4 border-sky-500"}
        />
        <div className="flex flex-col">
          <label className="text-sm font-bold text-zinc-600">Shop Name</label>
          <input
            type="text"
            className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
            placeholder="Update shop name"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-bold text-zinc-600">
            Shop Description
          </label>
          <input
            type="text"
            className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
            placeholder="Update shop description"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-bold text-zinc-600">
            Shop Address
          </label>
          <input
            type="text"
            className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
            placeholder="Update shop address"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-bold text-zinc-600">
            Shop Phone Number
          </label>
          <input
            type="text"
            className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
            placeholder="Update shop phone number"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-bold text-zinc-600">
            Shop Zip Code
          </label>
          <input
            type="text"
            className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
            placeholder="Update shop zip code"
          />
        </div>
        <Button type="submit" className={"w-md  text-white text-md"}>
          Update Shop
        </Button>
        {/* <div></div> */}
        {/* </div> */}
      </form>
    </div>
  );
};

export default DashboardSettingSection;
