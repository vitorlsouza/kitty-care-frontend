import ChatroomLayout from "../components/Chatroom/Layout";
import SideBar from "../components/Chatroom/SideBar";
import ChatField from "../components/Chatroom/ChatField";

const Chatroom = () => {
  return (
    <div className="w-full h-screen">
      <ChatroomLayout />
      <SideBar />
      <ChatField />
    </div>
  );
};

export default Chatroom;
