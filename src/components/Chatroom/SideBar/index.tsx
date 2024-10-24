import { useState } from "react";
import LCat from "../../../assets/svg/LCat.svg";
import SCat from "../../../assets/svg/SCat.svg";
import Health from "../../../assets/svg/Heart.svg";
import Plan from "../../../assets/svg/My Plan.svg";
import Settings from "../../../assets/svg/Settings.svg";
import Logout from "../../../assets/svg/Logout.svg";
import Frame from "../../../assets/svg/Frame.svg";
import KittyCare from "../../../assets/svg/KittyCare.svg";
import Icon from "./Icon";
import ExtendBtn from "./ExtendBtn";
import CollapseBtn from "./CollapseBtn";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed h-screen flex">
      <div className="relative my-12 ml-12 w-auto h-[90%] bg-[#FADFC9] rounded-2xl p-[18px] flex flex-col justify-between">
        <div className="absolute top-[72px] -right-[17%] -translate-x-1 -z-10 hover:cursor-pointer">
          <ExtendBtn onClick={() => setIsOpen(!isOpen)} />
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex">
            <Icon src={LCat} className="bg-[#FFA500] p-2.5" />
          </div>
          <div className="flex flex-col gap-4">
            <Icon src={SCat} className="bg-[#FFEEE2] p-3.5" />
            <Icon src={Health} className="bg-[#F1D3BB] p-3.5" />
            <Icon src={Plan} className="bg-[#F1D3BB] p-3.5" />
            <Icon src={Settings} className="bg-[#F1D3BB] p-3.5" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Icon src={Logout} className="bg-[#F1D3BB] p-3.5" />
          <Icon src={Frame} className="bg-[#F1D3BB] p-3.5" />
        </div>
      </div>
      <div
        className={`transition-all duration-300 ${
          isOpen ? `w-[333px] p-[18px]` : `w-0 p-0`
        }  my-12 h-[90%] bg-[#F5D7BF] rounded-2xl flex flex-col justify-between overflow-hidden`}
      >
        {isOpen && (
          <>
            <div className="flex flex-col gap-10">
              <div className="flex">
                <button className="text-[20px] mr-[26px] h-[70px] flex items-center">
                  <img src={KittyCare} alt="KittyCare" />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <button className="text-[20px] mr-[26px] text-left h-[70px] overflow-hidden leading-10 text-[#625042] hover:font-bold">
                  Smart-Kitty
                </button>
                <button className="text-[20px] mr-[26px] text-left h-[70px] overflow-hidden leading-10 text-[#625042] hover:font-bold">
                  Health & Wellness
                </button>
                <button className="text-[20px] mr-[26px] text-left h-[70px] overflow-hidden leading-10 text-[#625042] hover:font-bold">
                  Planner
                </button>
                <button className="text-[20px] mr-[26px] text-left h-[70px] overflow-hidden leading-10 text-[#625042] hover:font-bold">
                  Settings
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <button className="text-[20px] mr-[26px] text-left h-[70px] overflow-hidden leading-10 text-[#625042] hover:font-bold">
                Logout
              </button>
              <button className="text-[20px] mr-[26px] text-left h-[70px] overflow-hidden leading-10 text-[#625042] hover:font-bold">
                Welcome <b>Rosu</b>
              </button>
            </div>
            <div className="absolute top-24 -right-[52px] -translate-x-1 z-10 hover:cursor-pointer">
              <CollapseBtn onClick={() => setIsOpen(!isOpen)} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SideBar;
