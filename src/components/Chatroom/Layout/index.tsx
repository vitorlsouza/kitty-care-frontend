import TopCorner from "../../../assets/svg/TopCorner.svg";
import BottomCorner from "../../../assets/svg/BottomCorner.svg";

const Layout = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-between absolute">
      <div className="flex justify-end top-0">
        <img src={TopCorner} alt="TopCorner" />
      </div>
      <div className="flex justify-end items-end ">
        <img src={BottomCorner} alt="TopCorner" />
      </div>
    </div>
  );
};

export default Layout;
