import { LogBtnByProps } from "../types";

const LogBtnBy = ({ src, alt, className }: LogBtnByProps) => {
  return (
    <div className={`w-[56px] h-[56px] p-3 flex-col items-center justify-center border-2 border-[#898B90] rounded-[20px] cursor-pointer ${className}`}>
      <div className="w-[31px] h-[31px]">
        <img
          className="w-full h-full"
          src={src}
          alt={alt}
        />
      </div>
    </div>
  );
};

export default LogBtnBy;
                   