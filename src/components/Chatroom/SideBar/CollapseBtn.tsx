const CollapseBtn = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <div
      className="relative"
      onClick={() => {
        handleClick();
      }}
    >
      <div className={`w-16 h-16 rounded-2xl rotate-45 bg-[#FAF6F3]`}>
      <div className={`w-16 h-16 rounded-2xl bg-black opacity-20`}></div></div>
      <span className="absolute top-1/2 left-1/2 -translate-x-7 -translate-y-5 text-2xl">{`‹`}</span>
    </div>
  );
};

export default CollapseBtn;
