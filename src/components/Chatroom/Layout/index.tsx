import { FC, ReactNode } from 'react';
import TopCorner from "/assets/svg/TopCorner.svg";
import BottomCorner from "/assets/svg/BottomCorner.svg";

interface ChatroomLayoutProps {
  children: ReactNode;
}

/**
 * ChatroomLayout component that provides the common layout structure
 * with decorative corner images and renders child components
 */
const ChatroomLayout: FC<ChatroomLayoutProps> = ({ children }) => {
  return (
    <div className="relative w-screen h-screen">
      {/* Background layout with corner decorations */}
      <div className="w-screen h-screen flex flex-col justify-between fixed bg-[#FAF6F3] -z-50 top-0 right-0">
        <div className="flex justify-end top-0">
          <div className="w-1/4 h-1/4 sm:w-auto">
            <img src={TopCorner} alt="TopCorner" />
          </div>
        </div>
        <div className="flex justify-end items-end">
          <div className="w-1/3 sm:w-auto">
            <img src={BottomCorner} alt="BottomCorner" />
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default ChatroomLayout;
