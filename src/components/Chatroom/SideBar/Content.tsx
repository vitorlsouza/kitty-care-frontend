const Content = ({
  content,
  className,
  id,
  handleHover,
  onHover,
}: {
  content: string;
  className?: string;
  id: string;
  handleHover: (id: string) => void;
  onHover: string;
}) => {
  return (
    <button
      id={id}
      className={`text-base sm:text-[20px] px-[26px] text-left h-[70px] overflow-hidden leading-10 text-black sm:text-[#625042] hover:font-bold ${
        onHover == id ? "bg-[#FFEEE2] font-bold" : ""
      } ${className}`}
      onMouseOver={() => handleHover(id)}
      onMouseLeave={() => handleHover("")}
    >
      {content}
    </button>
  );
};

export default Content;
