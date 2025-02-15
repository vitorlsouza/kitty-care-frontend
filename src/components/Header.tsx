import type { HeaderProps } from './Chatroom/ChatField/types';
import { useEffect, useState } from 'react';
import KittyLogo from './KittyLogo';
import UserInfo from './UserInfo';
import { UserInfoProps } from '../utils/types';
import { isAuthenticated } from '../utils/auth';
import { handleGoogleLogout } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [userInfo, setUserInfo] = useState<UserInfoProps | null>(
    isAuthenticated()
  );

  const navigate = useNavigate();

  useEffect(() => {
    // get current url
    const url = window.location.pathname;
    const isChatroom = url.includes('cat-assistant');

    // Only render header in chatroom
    if (!isChatroom) return;
  }, []);

  const onHandleLogout = async () => {
    await handleGoogleLogout();
    setUserInfo(null);
    navigate('/login');
  };

  return (
    <div className="w-full h-fit flex justify-center items-center ">
      <div>
        {/* <a href="/"> */}
        <header
          className={`w-[400px] h-[240px] sm:h-[200px] sm:w-[900px] sm:mt-0 -mb-20 m-auto relative ${className}`}
          data-testid="kitty-logo"
        >
          <KittyLogo />
          {userInfo && (
            <div className="absolute top-20 right-[50%] translate-x-[50%]">
              <UserInfo {...userInfo} />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 ml-[50%] translate-x-[-50%]"
                onClick={() => onHandleLogout()}
              >
                Logout
              </button>
            </div>
          )}
        </header>
        {/* </a> */}
      </div>
    </div>
  );
};

export default Header;
