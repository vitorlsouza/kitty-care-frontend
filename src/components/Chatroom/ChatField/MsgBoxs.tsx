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
  return (
    <>
      {msgList.length > 0 ? (
        <>
          <div className="h-28 w-full"></div>
          <div className="w-full h-[62vh] flex flex-col justify-end overflow-auto">
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
          </div>
        </>
      ) : (
        <div className="w-[300px] m-auto h-[70vh] sm:h-[73vh] flex justify-center items-center">
          <div className="w-full h-10 mb-40">
            <div className="h-[200px]">
              <RiveAnimation src="riv/V2/Pulse_kitty.riv" />
            </div>
            <div className="w-full sm:w-[472px] text-[18px] sm:text-[28px] font-bold sm:font-semibold text-center m-auto">
              I'm your Purr-Sonal Cat Assistant, here to help you.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MsgBoxs;
