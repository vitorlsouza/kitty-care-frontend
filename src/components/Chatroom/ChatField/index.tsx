import InputField from "./InputField";
import MsgBoxs from "./MsgBoxs";

const ChatField = () => {
  return (
    <div className="w-2/5 m-auto">
      <MsgBoxs msgList={[]} />
      <InputField />
    </div>
  );
};

export default ChatField;
