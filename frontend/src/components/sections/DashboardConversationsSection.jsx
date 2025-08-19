import { getShopConversationsThunk } from "../../features/chat/chatSlice";
import ConversationCard from "../ConversationCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Spinner from "../Spinner";

const DashboardConversationsSection = () => {
  const { shopConversations, isShopConversationsLoading } = useSelector(
    (state) => state.chat
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getShopConversationsThunk());
  }, [dispatch]);
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-center uppercase mb-4">
        All Conversations
      </h1>
      <div className="flex flex-col gap-3 w-full">
        {isShopConversationsLoading ? (
          <Spinner />
        ) : (
          <>
            {shopConversations.length === 0 && (
              <p className="text-center text-gray-500">
                No conversations found
              </p>
            )}
            {shopConversations.map((conversation) => (
              <ConversationCard
                key={conversation._id}
                conversation={conversation}
                index={0}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardConversationsSection;
