import React from "react";
import layout from "/assets/png/layout.png";
import layoutMobile from "/assets/png/layoutMobile.png";
import KittyLogo from "./KittyLogo";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="w-screen relative" >
      <main>
        <div className="w-full">
          <KittyLogo />
          <div className="flex-1">{children}</div>
          <div className="w-full h-5"></div>
        </div>
      </main>
      <div className="w-full h-full fixed top-0 left-0 -z-10 bg-[#FAF6F3]" data-id="mainLY">
        <div className="w-full h-full relative">
          <img
            src={layout}
            alt="layout"
            className="w-full h-full hidden sm:block"
          />
          <img
            src={layoutMobile}
            alt="layoutMobile"
            className="w-full h-full block sm:hidden"
          />
        </div>
      </div>
    </div>
  );
}

export default Layout;
