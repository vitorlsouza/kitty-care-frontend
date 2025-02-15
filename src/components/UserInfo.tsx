import { FC } from 'react';

interface UserInfoProps {
  name: string;
  email: string;
  picture: string;
}

const UserInfo: FC<UserInfoProps> = ({ name, email, picture }) => {
  return (
    <div className="py-4 px-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-4">
        <img
          className="w-12 h-12 rounded-full
          border-2 border-white"
          src={picture}
          alt="User profile picture"
        />
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
