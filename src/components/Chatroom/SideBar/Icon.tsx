const Icon = ({
  src,
  id,
  onHover,
  isOpen,
  handleHover,
  onClick,
}: {
  src: string;
  className?: string;
  id: string;
  onHover: string;
  isOpen: boolean;
  handleHover: (id: string) => void;
  onClick?: () => void;
}) => {
  return (
    <div className="tooltip">
      <button
        id={id}
        className={`flex justify-center items-center w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-lg p-3.5 ${
          id == "KittyCare"
            ? "bg-[#FFA500]"
            : onHover == id
            ? "bg-[#FFEEE2]"
            : "bg-[#F1D3BB]"
        }`}
        onMouseOver={() => handleHover(id)}
        onMouseLeave={() => handleHover("")}
        onClick={onClick}
      >
        <img src={src} alt={id} />
      </button>
      {!isOpen && <div className="tooltiptext">{id}</div>}
    </div>
  );
};

export default Icon;
