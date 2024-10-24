const Icon = ({
  src,
  id,
  onHover,
  isOpen,
  handleHover,
}: {
  src: string;
  className?: string;
  id: string;
  onHover: string;
  isOpen: boolean;
  handleHover: (id: string) => void;
}) => {
  return (
    <div className="tooltip">
      <button
        id={id}
        className={`flex justify-center items-center w-[70px] h-[70px] rounded-lg p-3.5 ${
          onHover == id
            ? "bg-[#FFEEE2]"
            : id == "lCat"
            ? "bg-[#FFA500]"
            : "bg-[#F1D3BB]"
        }`}
        onMouseOver={() => handleHover(id)}
        onMouseLeave={() => handleHover("")}
      >
        <img src={src} alt="LCat" />
      </button>
      {!isOpen && <div className="tooltiptext">{id}</div>}
    </div>
  );
};

export default Icon;
