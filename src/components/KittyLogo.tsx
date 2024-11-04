import React, { FC } from 'react';

// Constants for styling
const LOGO_DIMENSIONS = {
  mobile: {
    width: 150,
    height: 30,
  },
  desktop: {
    width: 200,
    height: 40,
  },
  marginTop: {
    mobile: '6vh',
    desktop: '3vh',
  },
} as const;

interface KittyLogoProps {
  className?: string;
}

/**
 * KittyLogo Component
 * 
 * Renders the application logo with responsive dimensions and navigation functionality.
 * The logo links to the dashboard when clicked.
 *
 * @component
 * @example
 * return (
 *   <KittyLogo />
 * )
 */
const KittyLogo: FC<KittyLogoProps> = ({ className = '' }) => {
  // Add memoization for the logo URL
  const logoUrl = "/assets/svg/KittyLogo.svg";

  return (
    <header
      className={`w-[150px] h-[30px] sm:w-[200px] sm:h-[40px] my-[6vh] sm:mt-[3vh] m-auto relative ${className}`}
      data-testid="kitty-logo"
    >
      <a
        href="/dashboard"
        aria-label="Go to dashboard"
      >
        <img
          className="w-full h-full"
          src={logoUrl}
          alt="Kitty Logo"
          loading="eager"
          width={LOGO_DIMENSIONS.desktop.width}
          height={LOGO_DIMENSIONS.desktop.height}
          onError={(e) => {
            console.error('Failed to load logo:', e);
            // Optionally set a fallback image
            // e.currentTarget.src = '/fallback-logo.png';
          }}
        />
      </a>
    </header >
  );
};

// Add memoization to prevent unnecessary re-renders
export default React.memo(KittyLogo);
