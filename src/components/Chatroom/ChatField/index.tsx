import InputField from "./InputField";
import KittyLogo from "/assets/svg/KittyLogo.svg";
import { useAppSelector, useAppDispatch } from "../../../Redux/hooks";
import { Message } from "../../../utils/types";
import { useEffect } from "react";
import { updateConversationAsync } from "../../../Redux/features/chatSlice";
import MessageBoxes from "./MessageBoxes";

export type MsgType = Message;

const ChatField = () => {
  const { messages, isLoading, needsSync, error } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (needsSync && messages.length > 0) {
      dispatch(updateConversationAsync({ messages }));
    }
  }, [needsSync, messages, dispatch]);

  return (
    <div className="flex flex-col max-w-full sm:w-[800px] p-4 pb-6 mx-auto h-full">
      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}
      <div className="w-full h-[120px] flex justify-center items-center">
        <div>
          <a href="/"><img src={KittyLogo} alt="KittyLogo" /></a>
        </div>
      </div>
      <MessageBoxes messageList={messages} response={""} />
      <InputField
        onTyping={isLoading}
        messageList={messages}
      />
    </div>
  );
};

export default ChatField;
