import { getUserConversationsThunk } from "../../features/chat/chatSlice";
import ConversationCard from "../ConversationCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Spinner from "../Spinner";

const UserConversationsSection = () => {
  const { userConversations, isUserConversationsLoading } = useSelector(
    (state) => state.chat
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserConversationsThunk());
  }, [dispatch]);
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-center uppercase mb-4">
        All Conversations
      </h1>
      <div className="flex flex-col gap-3 w-full">
        {isUserConversationsLoading ? (
          <Spinner />
        ) : (
          <>
            {userConversations.length === 0 && (
              <p className="text-center text-gray-500">
                No conversations found
              </p>
            )}
            {userConversations.map((conversation) => (
              <ConversationCard
                key={conversation._id}
                conversation={conversation}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default UserConversationsSection;
