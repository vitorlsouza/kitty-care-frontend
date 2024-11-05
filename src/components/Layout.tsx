import React, { useEffect } from "react";
import layout from "/assets/png/layout.png";
import layoutMobile from "/assets/png/layoutMobile.png";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

interface BackgroundProps {
  className?: string;
}

// Preload background images with promise handling
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

const preloadImages = async () => {
  try {
    await Promise.all([
      preloadImage(layout),
      preloadImage(layoutMobile)
    ]);
  } catch (error) {
    console.error('Error preloading images:', error);
  }
};

// Background component with improved loading strategy
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
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
    </div>
  </div>
);

// Add this to your head section
const addPreloadLinks = () => {
  const head = document.head;
  const preloadLinks = [
    { href: layout, media: '(min-width: 640px)' },
    { href: layoutMobile, media: '(max-width: 639px)' }
  ];

  preloadLinks.forEach(({ href, media }) => {
    if (!head.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = href;
      if (media) link.media = media;
      head.appendChild(link);
    }
  });
};

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

  useEffect(() => {
    // Add preload links as soon as possible
    addPreloadLinks();
    // Preload images
    preloadImages();

    // Cleanup function to remove preload links when component unmounts
    return () => {
      const links = document.head.querySelectorAll('link[rel="preload"][as="image"]');
      links.forEach(link => link.remove());
    };
  }, []);

  // Only return children for chatroom and profile pages
  if (isChatroom || isProfile) {
    return <>{children}</>;
  }

  return (
    <div className="w-screen relative">
      <main role="main" className="min-h-screen">
        <div className="w-full">
          <Header />
          <div className="flex-1">{children}</div>
          <div className="w-full h-5" aria-hidden="true" />
        </div>
      </main>
      <Background />
    </div>
  );
};
export default Layout;

