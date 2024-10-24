const CollapseBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <div>
      <div className="relative" onClick={()=>{onClick}}>
        <div className={`w-16 h-16 rounded-2xl rotate-45 bg-[#FAF6F3]`}></div>
        <span className="absolute top-1/2 left-1/2 -translate-x-7 -translate-y-5 text-2xl">{`‹`}</span>
      </div>
    </div>
  );
};

export default CollapseBtn;
