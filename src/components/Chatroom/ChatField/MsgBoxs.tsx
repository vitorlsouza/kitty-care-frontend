import { useEffect, useRef } from "react";
import CatinChat from "../../../assets/svg/CatinChat.svg";
import RiveAnimation from "../../RiveAnimation";

interface MsgType {
  msg: string;
  isUser: boolean;
}

const MsgBoxs = ({
  msgList,
  response,
}: {
  msgList: MsgType[];
  response: string;
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    scrollContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [msgList, response]);

  return (
    <div className="flex flex-col flex-1 w-full text-centeritems-center overflow-y-auto">
      {msgList.length > 0 ? (
        <>
          <div className="flex-grow ">
            <div className="flex flex-col">
              <div>
                {msgList.map((msg, index) => (
                  <div key={index} className="w-full">
                    <div
                      className={`w-[90%] sm:w-2/3 rounded-2xl p-6 sm:p-8 my-2 sm:my-4 flex gap-4 ${
                        msg.isUser
                          ? "bg-[#F3EDE8] float-end text-right"
                          : "bg-[#FADFC9]"
                      }`}
                    >
                      {!msg.isUser && (
                        <span className="w-6 h-6 sm:w-8 sm:h-8 flex justify-center items-center rounded-full bg-[#FFA500]">
                          <img src={CatinChat} alt="CatinChat" />
                        </span>
                      )}
                      <span
                        className={`${
                          msg.isUser ? "w-full" : "w-[90%]"
                        } text-[14px] sm:text-[18px] font-medium`}
                      >
                        {msg.msg}
                      </span>
                    </div>
                  </div>
                ))}
                {response && (
                  <div className="w-full">
                    <div className="w-[90%] sm:w-2/3 rounded-2xl p-6 sm:p-8 my-2 sm:my-4 flex gap-4 bg-[#FADFC9]">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 flex justify-center items-center rounded-full bg-[#FFA500]">
                        <img src={CatinChat} alt="CatinChat" />
                      </span>
                      <span className="w-[90%] text-[14px] sm:text-[18px] font-medium">
                        {response}
                      </span>
                    </div>
                  </div>
                )}
                <div ref={scrollContainerRef}></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-full justify-center items-center">
          <div className="w-full h-10 mb-40">
            <div className="h-[200px]">
              <RiveAnimation src="riv/V2/Pulse_kitty.riv" />
            </div>
            <div className="w-full text-[18px] sm:text-[28px] font-bold sm:font-semibold text-center">
              I'm your Purr-Sonal Cat Assistant, <br /> here to help you.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MsgBoxs;
