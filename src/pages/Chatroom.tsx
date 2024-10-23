import Layout from "../components/Chatroom/Layout";
import SideBar from "../components/Chatroom/SideBar";
import ChatField from "../components/Chatroom/ChatField";

const Chatroom = () => {
  return (
    <div className="w-full max-h-screen">
      <Layout />
      <SideBar />
      <ChatField />
    </div>
  );
};

export default Chatroom;
