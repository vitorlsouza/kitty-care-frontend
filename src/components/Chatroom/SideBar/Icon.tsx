const Icon = ({ src, className }: { src: string; className: string }) => {
  return (
    <div className={`w-full h-auto rounded-lg ${className}`}>
      <img src={src} alt="LCat" />
    </div>
  );
};

export default Icon;
