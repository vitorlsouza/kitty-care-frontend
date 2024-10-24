import TopCorner from "../../../assets/svg/TopCorner.svg";
import BottomCorner from "../../../assets/svg/BottomCorner.svg";
import KittyLogo from "../../../assets/svg/KittyLogo.svg";

const Layout = () => {
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-between absolute bg-[#FAF6F3] -z-50">
        <div className="flex justify-end top-0">
          <div className="w-1/3 h-1/3 sm:w-auto">
            <img src={TopCorner} alt="TopCorner" />
          </div>
        </div>
        <div className="flex justify-end items-end">
          <div className="w-1/3 sm:w-auto">
            <img src={BottomCorner} alt="TopCorner" />
          </div>
        </div>
      </div>
      <div className="w-full h-[30px] flex justify-center absolute top-[52px]">
        <div className="h-full">
          <img src={KittyLogo} alt="KittyLogo" />
        </div>
      </div>
    </>
  );
};

export default Layout;
