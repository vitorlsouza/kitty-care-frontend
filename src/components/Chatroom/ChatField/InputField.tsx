import { useState } from "react";
import { MsgType } from ".";
import RiveAnimation from "../../RiveAnimation";
import { HiOutlineArrowRight } from "react-icons/hi2";
import React from "react";

const InputField = ({
  onTyping,
  msgList,
  setMsgList,
  setOnTyping,
  setResponse,
}: {
  onTyping: boolean;
  msgList: MsgType[];
  setMsgList: (msgList: MsgType[]) => void;
  setOnTyping: (onTyping: boolean) => void;
  setResponse: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [msg, setMsg] = useState("");
  const randomMsg = [
    "Hi there! I'm your friendly Cat assistant. How can I help you with your feline-related questions today?",
    "Meow! That's cat for 'Hello!' What would you like to chat about regarding our feline friends?",
    "What's up, cat lover? I'm here to discuss all things cats - from whiskers to tails!",
    "Meow meow! I'm all ears (and whiskers). What cat-related topic shall we explore together?",
    "I'm intrigued! Could you provide me with more details about your cat question or concern?",
    "Awesome! I'm excited to dive into this cat conversation. What else would you like to know?",
    "You're doing great with your cat care! Is there anything specific you'd like to improve or learn more about?",
    "Purr-fect! I'm here to help with any cat queries. What aspect of cat care are you curious about today?",
    "Welcome to the world of cats! I'm your go-to source for feline facts and advice. What shall we discuss?",
    "Feline fine and ready to chat! What cat-related topic has caught your curiosity today?",
  ];

  const handleSubmit = () => {
    if (onTyping || msg.trim() === "") return;
    setMsgList([...msgList, { msg, isUser: true } as MsgType]);
    const newMsg = randomMsg[Math.floor(Math.random() * randomMsg.length)];
    setOnTyping(true);
    newMsg.split("").map((char, index) => {
      setTimeout(() => {
        setResponse((prev) => prev + char);
      }, 50 * index);
    });
    setTimeout(() => {
      setMsgList([
        ...msgList,
        { msg, isUser: true },
        {
          msg: newMsg,
          isUser: false,
        } as MsgType,
      ]);
      setResponse("");
      setOnTyping(false);
    }, newMsg.split("").length * 50 + 200);
    setMsg("");
  };

  return (
    <div className="w-full pt-7">
      <div className="w-full flex items-center relative">
        <div className={`h-20 ${onTyping ? "w-20" : "w-0"} absolute -top-[80%]`}>
          <RiveAnimation src="riv/V2/Typing_animation.riv" />
        </div>
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
