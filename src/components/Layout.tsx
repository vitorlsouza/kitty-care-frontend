import React from "react";
import layout from "../assets/png/layout.png";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <div className="w-screen h-screen fixed top-0 left-0 -z-10">
        <img src={layout} alt="layout" className="w-full h-full object-cover" />
      </div>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
}

export default Layout;
