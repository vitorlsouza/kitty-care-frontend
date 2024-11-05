import React, { FC } from 'react';
import RiveAnimation from './RiveAnimation';

interface KittyLogoProps {
  className?: string;
}

const KittyLogo: FC<KittyLogoProps> = ({ className = '' }) => {
  return (
    <header
      className={`w-[150px] h-[30px] sm:w-[900px] sm:h-[200px] my-[6vh] sm:mt-0 -mb-20 m-auto relative ${className}`}
      data-testid="kitty-logo"
    >
      <a
        href="/dashboard"
        aria-label="Go to dashboard"
      >
        <RiveAnimation src='/riv/V2/Logo_Kitty.riv' autoplay={true} stateMachines="State Machine 1" />
      </a>
    </header >
  );
};

// Add memoization to prevent unnecessary re-renders
export default React.memo(KittyLogo);
