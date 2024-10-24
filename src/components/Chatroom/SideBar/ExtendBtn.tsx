const ExtendBtn = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <div className="relative" onClick={handleClick}>
      <div className={`w-[70px] h-[70px] rounded-2xl rotate-45 bg-[#FADFC9]`}></div>
      <span className="absolute top-1/2 left-1/2 translate-x-7 -translate-y-5 text-2xl">{`›`}</span>
    </div>
  );
};

export default ExtendBtn;
