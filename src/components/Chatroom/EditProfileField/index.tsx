import KittyLogo from "/assets/svg/KittyLogo.svg";
import { useAppSelector, useAppDispatch } from "../../../Redux/hooks";
import { Message } from "../../../utils/types";
import { useEffect } from "react";
import { updateConversationAsync } from "../../../Redux/features/chatSlice";

export type MsgType = Message;

const EditProfileField = () => {
  const { messages, isLoading, needsSync, error } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (needsSync && messages.length > 0) {
      dispatch(updateConversationAsync({ messages }));
    }
  }, [needsSync, messages, dispatch]);

  return (
    <div className="max-w-full sm:w-[800px] p-4 pb-6 mx-auto">
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
      <div className="border-2 border-black rounded-lg p-4 flex-1">
        <h1>Edit Profile</h1>
      </div>
    </div>
  );
};

export default EditProfileField;
