import { FC } from 'react';

interface ContentProps {
  /** The text content to display */
  content: string;
  /** Optional CSS classes to apply */
  className?: string;
  /** Unique identifier for the content item */
  id: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Handler for hover state changes */
  handleHover: (id: string) => void;
  /** ID of currently hovered item */
  onHover: string;
}

/**
 * Content component displays sidebar items with hover and click interactions
 */
const Content: FC<ContentProps> = ({
  content,
  className = '', // Provide default value
  id,
  onClick,
  handleHover,
  onHover,
}) => {
  const isHovered = onHover === id;

  const baseClasses = [
    'text-base',
    'sm:text-[20px]',
    'px-[26px]',
    'text-left',
    'h-[70px]',
    'overflow-hidden',
    'leading-10',
    'text-black',
    'sm:text-[#625042]',
    'hover:font-bold',
  ].join(' ');

  const hoverClasses = isHovered ? 'bg-[#FFEEE2] font-bold' : '';

  // Use div if no onClick handler, button if interactive
  const Element = onClick ? 'button' : 'div';

  return (
    <Element
      id={id}
      className={`${baseClasses} ${hoverClasses} ${className}`.trim()}
      onMouseEnter={() => handleHover(id)}
      onMouseLeave={() => handleHover('')}
      onClick={onClick}
      role={onClick ? 'button' : 'none'}
    >
      {content}
    </Element>
  );
};

export default Content;
