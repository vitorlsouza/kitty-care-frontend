import KittyLogo from "/assets/svg/KittyLogo.svg";
import type { HeaderProps } from "./types";
import { useEffect } from "react";

const Header: React.FC<HeaderProps> = () => {
    useEffect(() => {
        // get current url
        const url = window.location.pathname;
        const isChatroom = url.includes("cat-assistant");

        // Only render header in chatroom
        if (!isChatroom) return;
    }, []);

    return (
        <div className="w-full h-[120px] flex justify-center items-center">
            <div>
                <a href="/dashboard">
                    <img src={KittyLogo} alt="KittyLogo" />
                </a>
            </div>
        </div>
    );
};

export default Header; 