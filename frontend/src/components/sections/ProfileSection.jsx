import ProfileImage from "../../assets/images/category-1.jpg";

const ProfileSection = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <img src={ProfileImage} className={"w-64 h-64  rounded-full"} />
      <form>
        <div>
          <input className="" />
        </div>
        <div></div>
      </form>
    </div>
  );
};

export default ProfileSection;
