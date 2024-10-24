import CatinChat from "../../../assets/svg/CatinChat.svg";
import RiveAnimation from "../../RiveAnimation";

interface MsgType {
  msg: string;
  isUser: boolean;
}

const MsgBoxs = ({ msgList }: { msgList: MsgType[] }) => {
  return (
    <>
      {msgList.length > 0 ? (
        <div className="w-full h-[73vh] flex flex-col justify-end">
          {msgList.map((msg, index) => (
            <div key={index} className="w-full">
              <div
                className={`w-2/3 rounded-2xl p-8 my-4 flex gap-4 ${
                  msg.isUser
                    ? "bg-[#F3EDE8] float-end text-right"
                    : "bg-[#FADFC9]"
                }`}
              >
                {!msg.isUser && (
                  <span className="w-8 h-8 flex justify-center items-center rounded-full bg-[#FFA500]">
                    <img src={CatinChat} alt="CatinChat" />
                  </span>
                )}
                <span className="w-full text-[18px] font-medium">
                  {msg.msg}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-[73vh] flex justify-center items-center">
          <div className="w-full h-10 mb-40">
            <div className="h-[200px]">
              <RiveAnimation src="riv/V2/Pulse_kitty.riv" />
            </div>
            <div className="text-[28px] font-semibold w-[472px] text-center m-auto">
              I'm your Purr-Sonal Cat Assistant, here to help you.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MsgBoxs;
