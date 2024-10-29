import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { TextInputProps } from "../types";

const TextInput = ({
  name,
  label,
  type,
  placeholder,
  className,
  error,
  onChange,
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="my-[30px] flex flex-col gap-[20px] h-auto">
      {label && (
        <label className="text-base sm:text-xl font-bold sm:font-medium ml-[24px]">
          {label}
        </label>
      )}
      <div className="w-full h-[52px] relative">
        <input
          name={name}
          className={`w-full h-[55px] p-auto sm:py-4 px-[24px] text-base sm:text-xl border-2 rounded-lg ${className}`}
          type={
            type === "password" ? (showPassword ? "password" : "text") : type
          }
          placeholder={placeholder}
          onChange={onChange}
          required
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-0 sm:right-3 top-[55%] transform -translate-y-1/2 border-none hover:border-none focus:outline-none bg-transparent"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <AiOutlineEye className="h-5 w-5 text-gray-500" />
            ) : (
              <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
            )}
          </button>
        )}
      </div>
      {error && (
        <div className="text-red-500 text-sm font-medium ms-6 -mt-[6px] relative">
          {error}
        </div>
      )}
    </div>
  );
};

export default TextInput;
