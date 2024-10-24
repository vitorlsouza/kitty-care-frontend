const Icon = ({ src, className }: { src: string; className: string }) => {
  return (
    <button className={`flex justify-center items-center w-[70px] h-[70px] rounded-lg ${className}`}>
      <img src={src} alt="LCat" />
    </button>
  );
};

export default Icon;
