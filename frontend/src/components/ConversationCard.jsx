import { formatDistanceToNow } from "date-fns";
import Logo from "../assets/images/logo.png";
import { Link } from "react-router";

const ConversationCard = ({ conversation, index = 1 }) => {
  return (
    <Link
      to={
        index === 0
          ? `/dashboard/inbox/${conversation._id}?isShop=true`
          : `/profile/inbox/${conversation._id}?isShop=false`
      }
      className="relative flex items-center gap-2 p-3 border border-gray-300 w-full hover:bg-zinc-100 text-black rounded-lg shadow-lg cursor-pointer"
    >
      <div className="w-14 h-14">
        <img
          src={conversation?.participants[index]?.participantId?.imageUrl}
          alt=""
          className="w-14 h-14 rounded-full border border-gray-400 object-contain"
        />
      </div>
      <div>
        <p className="font-bold">
          {conversation?.participants[index]?.participantId?.shopName ||
            conversation?.participants[index]?.participantId?.fullname}
        </p>
        <p className="text-sm text-gray-500 max-w-[200px] sm:max-w-[400px]  truncate">
          {conversation?.lastMessage?.message || "No messages yet"}
        </p>{" "}
        <p className=" text-gray-500 text-right text-xs w-full absolute bottom-2 right-3">
          {" "}
          {formatDistanceToNow(new Date(conversation?.lastMessageAt), {
            addSuffix: true,
          })}
        </p>
      </div>
      {index === 0
        ? conversation?.shopUnreadCount > 0 && (
            <p className="text-xs bg-primary text-white px-1.5 py-1 rounded-full absolute bottom-12 right-3">
              {conversation?.shopUnreadCount}
            </p>
          )
        : conversation?.userUnreadCount > 0 && (
            <p className="text-xs bg-primary text-white px-1.5 py-1 rounded-full absolute bottom-12 right-3">
              {conversation?.userUnreadCount}
            </p>
          )}
    </Link>
  );
};

export default ConversationCard;
