import React, { useEffect } from "react";
import layout from "/assets/png/layout.png";
import layoutMobile from "/assets/png/layoutMobile.png";
import KittyLogo from "./KittyLogo";

interface LayoutProps {
  children: React.ReactNode;
}

interface BackgroundProps {
  className?: string;
}

// Preload background images
const preloadImages = () => {
  const images = [layout, layoutMobile];
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

// Background component extracted for better organization and reusability
const Background: React.FC<BackgroundProps> = ({ className = "" }) => (
  <div
    className={`w-full h-full fixed top-0 left-0 -z-10 bg-[#FAF6F3] ${className}`}
    data-testid="layout-background"
  >
    <div className="w-full h-full relative">
      <picture>
        <source media="(min-width: 640px)" srcSet={layout} />
        <img
          src={layoutMobile}
          alt="Decorative background pattern"
          className="w-full h-full"
          loading="eager"
          fetchPriority="high"
        />
      </picture>
    </div>
  </div>
);

/**
 * Layout component that wraps the main content of the application
 * Provides consistent layout structure and background across pages
 * @param {LayoutProps} props - Component props
 * @returns {React.ReactElement} Layout component
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = window.location.pathname;
  const isChatroom = pathname === "/cat-assistant";
  const isProfile = pathname === "/cat-profile";

  // Preload images when component mounts
  useEffect(() => {
    preloadImages();
  }, []);

  // Only return children for chatroom and profile pages
  if (isChatroom || isProfile) {
    return <>{children}</>;
  }

  return (
    <div className="w-screen relative">
      <main role="main" className="min-h-screen">
        <div className="w-full">
          <KittyLogo />
          <div className="flex-1">{children}</div>
          <div className="w-full h-5" aria-hidden="true" />
        </div>
      </main>
      <Background />
    </div>
  );
};
export default Layout;

