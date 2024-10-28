import React from "react";
import layout from "/assets/png/layout.png";
import layoutMobile from "/assets/png/layoutMobile.png";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full absolute top-0 left-0 -z-10 bg-[#FAF6F3]">
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
      <main>{children}</main>
    </div>
  );
}

export default Layout;
