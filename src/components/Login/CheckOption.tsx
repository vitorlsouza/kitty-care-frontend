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
    <div>
      <div className="flex gap-2 items-center">
        <div className="border-2 border-black w-[19px] h-[19px] flex items-center rounded-md">
          <input
            name={name}
            type="checkbox"
            checked={checked}
            className="accent-[#FFCE01] w-full h-full className border-none"
            onChange={onChange}
          />
        </div>

        <label className="text-[18px] font-bold">{label}</label>
      </div>
      <div className="text-[18px] font-medium ms-7 leading-6">
        {content}
      </div>
    </div>
  );
};

export default CheckOption;
