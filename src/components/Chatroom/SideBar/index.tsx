import { useState, useRef, useEffect } from "react";

import Icon from "./Icon";
import ExtendBtn from "./ExtendBtn";
import CollapseBtn from "./CollapseBtn";
import Content from "./Content";

import LCat from "../../../assets/svg/LCat.svg";
import SCat from "../../../assets/svg/SCat.svg";
import Health from "../../../assets/svg/Heart.svg";
import Plan from "../../../assets/svg/My Plan.svg";
import Settings from "../../../assets/svg/Settings.svg";
import Logout from "../../../assets/svg/Logout.svg";
import Frame from "../../../assets/svg/Frame.svg";
import KittyCare from "../../../assets/svg/KittyCare.svg";

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
      <div className="relative my-12 ml-12 w-auto h-[90%] bg-[#FADFC9] rounded-2xl p-[18px] flex flex-col justify-between">
        <div className="absolute top-[72px] -right-[17%] -translate-x-1 -z-10 hover:cursor-pointer">
          <ExtendBtn handleClick={() => setIsOpen(true)} />
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex">
            <Icon
              id="lCat"
              onHover={onHover}
              src={LCat}
              handleHover={(id) => setOnHover(id)}
            />
          </div>
          <div className="flex flex-col gap-4">
            {[
              { id: "sCat", src: SCat },
              { id: "health", src: Health },
              { id: "plan", src: Plan },
              { id: "settings", src: Settings },
            ].map((item) => (
              <Icon
                id={item.id}
                onHover={onHover}
                src={item.src}
                handleHover={(id) => setOnHover(id)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {[
            { id: "logout", src: Logout },
            { id: "frame", src: Frame },
          ].map((item) => (
            <Icon
              id={item.id}
              onHover={onHover}
              src={item.src}
              handleHover={(id) => setOnHover(id)}
            />
          ))}
        </div>
      </div>
      <div
        className={`transition-all duration-500 my-12 h-[90%] bg-[#F5D7BF] rounded-2xl flex flex-col justify-between overflow-hidden
          ${isOpen ? `w-[333px] py-[18px]` : `w-0 py-0`}`}
        ref={sideBarRef}
      >
        {isOpen && (
          <>
            <div className="flex flex-col gap-10">
              <div className="flex">
                <button
                  className={`text-[20px] px-[26px] w-full h-[70px] flex items-center ${
                    onHover == "lCat" ? "bg-[#FFEEE2] font-bold" : ""
                  }`}
                  onMouseOver={() => setOnHover("lCat")}
                  onMouseLeave={() => setOnHover("")}
                >
                  <img src={KittyCare} alt="KittyCare" />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { id: "sCat", content: "Smart-Kitty" },
                  { id: "health", content: "Health & Wellness" },
                  { id: "plan", content: "Planner" },
                  { id: "settings", content: "Settings" },
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
              {[
                { id: "logout", content: "Logout" },
                { id: "frame", content: "Welcome Rosu" },
              ].map((item) => (
                <Content
                  id={item.id}
                  content={item.content}
                  handleHover={(id) => setOnHover(id)}
                  onHover={onHover}
                />
              ))}
            </div>
            <div className="absolute top-32 -right-[52px] -translate-x-1 z-10 hover:cursor-pointer">
              <CollapseBtn handleClick={() => setIsOpen(false)} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SideBar;
