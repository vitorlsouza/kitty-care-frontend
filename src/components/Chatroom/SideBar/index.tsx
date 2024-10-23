import LCat from "../../../assets/svg/LCat.svg";
import SCat from "../../../assets/svg/SCat.svg";
import Health from "../../../assets/svg/Heart.svg";
import Plan from "../../../assets/svg/My Plan.svg";
import Settings from "../../../assets/svg/Settings.svg";
import Logout from "../../../assets/svg/Logout.svg";
import Frame from "../../../assets/svg/Frame.svg";
import Icon from "./Icon";

const SideBar = () => {
  return (
    <div className="fixed w-20 h-screen flex flex-col justify-center">
      <div className="m-12 w-full h-[90%] bg-[#FADFC9] rounded-2xl p-3 flex flex-col justify-between">
        <div className="flex flex-col gap-10">
          <div className="flex ">
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
    </div>
  );
};

export default SideBar;
