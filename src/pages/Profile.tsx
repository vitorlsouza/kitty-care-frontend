import ChatroomLayout from "../components/Chatroom/Layout";
import SideBar from "../components/Chatroom/SideBar";
import EditProfileField from "../components/Chatroom/EditProfileField";

const Profile = () => {
  return (
    <div className="w-full h-full">
      <ChatroomLayout />
      <SideBar />
      <EditProfileField />
    </div>
  );
};

export default Profile;
