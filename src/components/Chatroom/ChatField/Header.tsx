import type { HeaderProps } from "./types";
import { useEffect } from "react";
import KittyLogo from "../../KittyLogo";

const Header: React.FC<HeaderProps> = () => {
  useEffect(() => {
    // get current url
    const url = window.location.pathname;
    const isChatroom = url.includes("cat-assistant");

    // Only render header in chatroom
    if (!isChatroom) return;
  }, []);

  return <KittyLogo />;
};

export default Header;
