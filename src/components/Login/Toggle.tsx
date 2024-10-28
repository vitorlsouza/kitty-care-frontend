import { ToggleProps } from "../types";

const Toggle = ({ name, value, onChange }: ToggleProps) => {
  return (
    <label>
      <input
        name={name}
        type="checkbox"
        checked={value}
        className="sr-only peer"
        onChange={onChange}
      />
      <div className="relative w-14 h-7 bg-[#FFA500] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600"></div>
    </label>
  );
};

export default Toggle;
