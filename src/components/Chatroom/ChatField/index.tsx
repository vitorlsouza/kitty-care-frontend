import { useState } from "react";
import InputField from "./InputField";
import MsgBoxs from "./MsgBoxs";

export interface MsgType {
  msg: string;
  isUser: boolean;
}

const ChatField = () => {
  const [msgList, setMsgList] = useState<MsgType[]>([]);
  const [onTyping, setOnTyping] = useState(false);
  const [response, setResponse] = useState("");

  return (
    <div className="w-[90%] sm:w-2/5 m-auto">
      <MsgBoxs msgList={msgList} />
      <InputField
        onTyping={onTyping}
        msgList={msgList}
        setOnTyping={setOnTyping}
        setMsgList={setMsgList}
      />
    </div>
  );
};

export default ChatField;
