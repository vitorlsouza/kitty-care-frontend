import { useState, useRef, useEffect } from "react";

import Icon from "./Icon";
import ExtendBtn from "./ExtendBtn";
import CollapseBtn from "./CollapseBtn";
import Content from "./Content";

import KittyCare from "../../../assets/svg/KittyCare.svg";
import SmartKitty from "../../../assets/svg/SmartKitty.svg";
import Health from "../../../assets/svg/Health.svg";
import MyPlan from "../../../assets/svg/MyPlan.svg";
import Settings from "../../../assets/svg/Settings.svg";
import Logout from "../../../assets/svg/Logout.svg";
import Profile from "../../../assets/svg/Profile.svg";
import KittyCareText from "../../../assets/svg/KittyCareText.svg";
import KittyCareTextMobile from "../../../assets/svg/KittyCareTextMobile.svg";
import Edit from "../../../assets/svg/Edit.svg";
import MiniBtn from "../../../assets/svg/MiniBtn.svg";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [onHover, setOnHover] = useState("");

  const sideBarRef = useRef(null);
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        isOpen &&
        sideBarRef.current &&
        !(sideBarRef.current as HTMLElement).contains(event.target as Node) &&
        (event.target as HTMLElement).id !== "sideBar"
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div id="sideBar" className="fixed h-screen flex z-20">
      <div className="hidden sm:flex relative my-12 ml-12 w-auto h-[90%] bg-[#FADFC9] rounded-2xl p-[18px] flex-col justify-between">
        <div className="absolute top-[72px] -right-[17%] -translate-x-1 -z-10 hover:cursor-pointer">
          <ExtendBtn handleClick={() => setIsOpen(true)} />
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex">
            <Icon
              id="KittyCare"
              onHover={onHover}
              src={KittyCare}
              handleHover={(id) => setOnHover(id)}
              isOpen={isOpen}
            />
          </div>
          <div className="flex flex-col gap-4">
            {[
              { id: "SmartKitty", src: SmartKitty },
              { id: "Health", src: Health },
              { id: "MyPlan", src: MyPlan },
              { id: "Settings", src: Settings },
            ].map((item) => (
              <Icon
                id={item.id}
                onHover={onHover}
                src={item.src}
                handleHover={(id) => setOnHover(id)}
                isOpen={isOpen}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {[
            { id: "Logout", src: Logout },
            { id: "Profile", src: Profile },
          ].map((item) => (
            <Icon
              id={item.id}
              onHover={onHover}
              src={item.src}
              handleHover={(id) => setOnHover(id)}
              isOpen={isOpen}
            />
          ))}
        </div>
      </div>

      <div
        className="block sm:hidden top-12 left-4 fixed"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <img src={MiniBtn} alt="MiniBtn" />
      </div>

      <div className="block sm:hidden text-black text-base font-medium">
        <div
          className={`h-screen fixed top-0 left-0 bg-[#FADFC9] transition-all duration-500 overflow-hidden ${
            isOpen ? `w-screen py-[32px]` : `w-0 py-0`
          }`}
        >
          <div className="w-screen h-full flex flex-col justify-between pt-[36px] px-[16px]">
            <div className="flex flex-col gap-10">
              <div className="flex">
                <div className="flex items-center">
                  <Icon
                    id="KittyCare"
                    onHover={onHover}
                    src={KittyCare}
                    handleHover={(id) => setOnHover(id)}
                    isOpen={isOpen}
                  />
                  <div className="px-[26px]">
                    <img src={KittyCareTextMobile} alt="KittyCareText" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { id: "SmartKitty", src: SmartKitty },
                  { id: "Health", src: Health },
                  { id: "MyPlan", src: MyPlan },
                  { id: "Settings", src: Settings },
                ].map((item) => (
                  <div className="flex items-center">
                    <Icon
                      id={item.id}
                      onHover={onHover}
                      src={item.src}
                      handleHover={(id) => setOnHover(id)}
                      isOpen={isOpen}
                    />
                    <Content
                      id={item.id}
                      content={item.id}
                      handleHover={(id) => setOnHover(id)}
                      onHover={onHover}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <Icon
                  id={"Logout"}
                  onHover={onHover}
                  src={Logout}
                  handleHover={(id) => setOnHover(id)}
                  isOpen={isOpen}
                />
                <Content
                  id="logout"
                  content="Logout"
                  handleHover={(id) => setOnHover(id)}
                  onHover={onHover}
                />
              </div>
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center">
                  <Icon
                    id={"Profile"}
                    onHover={onHover}
                    src={Profile}
                    handleHover={(id) => setOnHover(id)}
                    isOpen={isOpen}
                  />
                  <Content
                    id="Profile"
                    content="Welcome Rosu"
                    handleHover={(id) => setOnHover(id)}
                    onHover={onHover}
                  />
                </div>
                <div className="py-5 mx-5 tooltip">
                  <span className="tooltiptext">Edit</span>
                  <img src={Edit} alt="Edit" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-32 -right-[47px] -translate-x-1 z-10 hover:cursor-pointer">
            <CollapseBtn handleClick={() => setIsOpen(false)} />
          </div>
        </div>
      </div>

      <div
        className={`hidden sm:flex transition-all duration-500 my-12 h-[90%] bg-[#F5D7BF] rounded-2xl flex-col justify-between 
          ${isOpen ? `w-[333px] py-[18px]` : `w-0 py-0`}`}
        ref={sideBarRef}
      >
        {isOpen && (
          <>
            <div className="flex flex-col gap-10">
              <div className="flex">
                <div
                  className={`text-[20px] px-[26px] w-full h-[70px] flex items-center`}
                >
                  <img src={KittyCareText} alt="KittyCareText" />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { id: "SmartKitty", content: "Smart-Kitty" },
                  { id: "Health", content: "Health & Wellness" },
                  { id: "MyPlan", content: "Planner" },
                  { id: "Settings", content: "Settings" },
                ].map((item) => (
                  <Content
                    id={item.id}
                    content={item.content}
                    handleHover={(id) => setOnHover(id)}
                    onHover={onHover}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Content
                id="logout"
                content="Logout"
                handleHover={(id) => setOnHover(id)}
                onHover={onHover}
              />
              <div className="w-full flex items-center justify-between">
                <Content
                  id="Profile"
                  content="Welcome Rosu"
                  handleHover={(id) => setOnHover(id)}
                  onHover={onHover}
                />
                <div className="py-5 mx-5 tooltip">
                  <span className="tooltiptext">Edit</span>
                  <img src={Edit} alt="Edit" />
                </div>
              </div>
            </div>
            <div className="absolute top-32 -right-[52px] -translate-x-1 z-10 hover:cursor-pointer">
              <CollapseBtn handleClick={() => setIsOpen(false)} />
            </div>
            {/* <div className="absolute -z-40 top-0 left-0 h-screen w-screen bg-black opacity-20"></div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default SideBar;
