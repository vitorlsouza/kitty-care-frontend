const CheckOption = ({
  name,
  checked,
  label,
  content,
  onChange,
}: {
  name: string;
  checked: boolean;
  label: string;
  content: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="w-full">
      <div className="flex gap-2 items-center">
        <div className="border-2 border-black w-[19px] h-[19px] flex items-center rounded-md">
          <input
            name={name}
            type="checkbox"
            checked={checked}
            className="accent-[#FFCE01] w-full h-full border-none"
            onChange={onChange}
          />
        </div>

        <label className="text-[14px] sm:text-[18px] font-bold">{label}</label>
      </div>
      <div className="text-[14px] sm:text-[18px] font-medium ms-7 leading-6 opacity-60">
        {content}
      </div>
    </div>
  );
};

export default CheckOption;
