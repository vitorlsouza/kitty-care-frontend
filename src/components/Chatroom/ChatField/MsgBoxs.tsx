import { useState } from "react";
import CatinChat from "../../../assets/svg/CatinChat.svg";

interface MsgType {
  msg: string;
  isUser: boolean;
}

const MsgBoxs = () => {
  const [msgList, setMsgList] = useState<MsgType[]>([
    { msg: "Hi", isUser: true },
    { msg: "Hi there, I'm Dr. Emily, a licensed vet. I'd be happy to help. How long has your cat been vomiting? Is there anything else you've noticed?", isUser: false },
    { msg: "How are you?", isUser: true },
  ]);
  return (
    <div className="w-full h-[80vh] flex flex-col justify-end">
      {msgList.length > 0 ? (
        msgList.map((msg, index) => (
          <div key={index} className="w-full">
            <div
              className={`w-2/3 rounded-2xl p-8 my-4 flex gap-4 ${
                msg.isUser ? "bg-[#F3EDE8] float-end" : "bg-[#FADFC9]"
              }`}
            >
              {!msg.isUser && (
                <span className="w-8 h-8 flex justify-center items-center rounded-full bg-[#FFA500]">
                  <img src={CatinChat} alt="CatinChat" />
                </span>
              )}
              <span className="w-4/5">{msg.msg}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full h-10 bg-red-500">
          <div>{/* hereare my */}</div>
          <div>I'm your Purr-Sonal Cat Assistant, here to help you.</div>
        </div>
      )}
    </div>
  );
};

export default MsgBoxs;
