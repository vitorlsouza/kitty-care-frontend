import { useState } from "react";
import { MsgType } from ".";
import RiveAnimation from "../../RiveAnimation";
import { HiOutlineArrowRight } from "react-icons/hi2";

const InputField = ({
  onTyping,
  setMsgList,
  setOnTyping,
}: {
  onTyping: boolean;
  setMsgList: (msgList: MsgType[]) => void;
  setOnTyping: (onTyping: boolean) => void;
}) => {
  const [msg, setMsg] = useState("");
  const [response, setResponse] = useState("");
  const randomMsg = [
    "Hi, I am a Cat assistant. How can I help you today?",
    "Meow!",
    "What's up?",
    "Meow meow!",
    "Could you provide me more detail!",
    "Awesome!",
    "You are great!",
  ];

  const handleSubmit = () => {
    setMsgList((prev: MsgType[]) => {
      return [...prev, { msg, isUser: true } as MsgType];
    });
    setOnTyping(true);
    setTimeout(() => {
      setMsgList((prev: MsgType[]) => {
        return [
          ...prev,
          {
            msg: randomMsg[Math.floor(Math.random() * randomMsg.length)],
            isUser: false,
          } as MsgType,
        ];
      });
      setOnTyping(false);
    }, 2000);
    setMsg("");
  };

  return (
    <div className="w-full bottom-20">
      <div className={`h-20 ${onTyping ? "w-20" : "w-0"}`}>
        <RiveAnimation src="riv/V2/Typing_animation.riv" />
      </div>
      <div className="w-full flex items-center relative">
        <input
          className="w-full text-[14px] sm:text-[16px] p-[22px] sm:p-6 border-2 rounded-[20px] bg-[#F3EDE8] text-opacity-30 font-semibold focus:outline-none"
          placeholder="Type your question... Meow it out!"
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          value={msg}
        />
        <button
          className="w-[50px] h-[38px] sm:w-20 sm:h-14 text-white bg-blue-600 hover:bg-blue-400 active:bg-purple-700 outline-none border-none absolute right-3 border-2 rounded-md sm:rounded-xl flex justify-center items-center"
          onClick={handleSubmit}
        >
          <HiOutlineArrowRight className="text-md sm:text-2xl" />
        </button>
      </div>
      <div className="w-[210px] sm:w-full m-auto text-center font-bold sm:font-semibold text-[14px] sm:text-lg mt-4">
        Chat with a vet 24/7 for advice and consultations
      </div>
    </div>
  );
};

export default InputField;
