import { FC } from 'react';
import Divider from './Divider';

interface SocialAuthProps {
  children: React.ReactNode;
}

const SocialAuth: FC<SocialAuthProps> = ({ children }) => {
  return (
    <div className="flex items-center w-full mt-[34.31px]">
      <Divider width={400} />
      <div className="flex px-4 gap-4">{children}</div>
      <Divider width={400} />
    </div>
  );
};

export default SocialAuth;
