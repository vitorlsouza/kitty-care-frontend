import { useState } from "react";
import InputField from "./InputField";
import MsgBoxs from "./MsgBoxs";
import KittyLogo from "../../../assets/svg/KittyLogo.svg";

export interface MsgType {
  msg: string;
  isUser: boolean;
}

const ChatField = () => {
  const [msgList, setMsgList] = useState<MsgType[]>([]);
  const [onTyping, setOnTyping] = useState(false);
  const [response, setResponse] = useState("");

  return (
    <div className="flex flex-col max-w-full sm:w-[800px] p-4 pb-6 mx-auto h-screen">
      <div className="w-full h-[120px] flex justify-center items-center">
        <div className="">
          <img src={KittyLogo} alt="KittyLogo" />
        </div>
      </div>
      <MsgBoxs msgList={msgList} response={response} />
      <InputField
        onTyping={onTyping}
        msgList={msgList}
        setOnTyping={setOnTyping}
        setMsgList={setMsgList}
        setResponse={setResponse}
      />
    </div>
  );
};

export default ChatField;
