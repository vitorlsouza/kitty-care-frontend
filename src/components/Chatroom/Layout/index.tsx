import TopCorner from "/assets/svg/TopCorner.svg";
import BottomCorner from "/assets/svg/BottomCorner.svg";

const Layout = () => {
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-between absolute bg-[#FAF6F3] -z-50 top-0 right-0">
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
    </>
  );
};

export default Layout;
