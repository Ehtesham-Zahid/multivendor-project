import { Link, useNavigate, useSearchParams } from "react-router";
import MessageCard from "../MessageCard";
import { ArrowLeftIcon, Loader2, SendIcon } from "lucide-react";
import socket from "../../socket.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessageThunk,
  addMessage,
  getMessagesThunk,
  getShopUnreadCountThunk,
  getUserUnreadCountThunk,
} from "../../features/chat/chatSlice";
import Spinner from "../Spinner.jsx";
import { useRef } from "react";

const SingleInboxSection = () => {
  const { conversationId } = useParams();
  const { messages, isMessagesLoading } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isShop = searchParams.get("isShop");
  const userId = isShop === "true" ? user?.shopId : user?._id;

  // scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const getMessages = async () => {
    const resultAction = await dispatch(
      getMessagesThunk({ conversationId, isShop })
    );
    if (getMessagesThunk.fulfilled.match(resultAction)) {
      if (isShop === "true") {
        dispatch(getShopUnreadCountThunk());
      } else {
        dispatch(getUserUnreadCountThunk());
      }
    }
  };

  useEffect(() => {
    // Join the room when this conversation is opened
    socket.emit("join-room", { roomId: conversationId, userId });

    // Listen for incoming messages
    socket.on("receive-message", (newMessage) => {
      console.log(newMessage);
      dispatch(addMessage(newMessage)); // <- no stale state
    });

    getMessages();

    // Cleanup on unmount
    return () => {
      socket.off("receive-message");
    };
  }, [conversationId, dispatch]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const resultAction = await dispatch(
      sendMessageThunk({ conversationId, message, isShop })
    );

    if (sendMessageThunk.fulfilled.match(resultAction)) {
      setMessage(""); // Clear input
      // No need to listen here — socket already handles it
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <Link
        to="/profile/inbox"
        className="text-md text-gray-500 cursor-pointer flex items-center gap-1 hover:text-primary"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon className="w-4 h-4" /> Back
      </Link>

      <div className="flex flex-col gap-3 w-full border border-gray-300 rounded-lg p-3 h-[450px] overflow-y-auto">
        {isMessagesLoading ? (
          <Spinner />
        ) : (
          <>
            {messages.map((msg) => (
              <MessageCard key={msg._id} message={msg} isShop={isShop} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="flex flex-row gap-3 w-full">
        <input
          type="text"
          placeholder="Type your message here"
          className="w-full border border-gray-300 rounded-lg p-3 outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <button
          className="bg-primary text-white px-3 py-1 rounded-lg cursor-pointer flex items-center gap-2"
          onClick={handleSendMessage}
        >
          Send <SendIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SingleInboxSection;
