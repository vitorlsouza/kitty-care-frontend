import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TextInputProps } from "../types";

const TextInput = ({
  label,
  type,
  placeholder,
  className,
  onChange,
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="my-3 flex flex-col">
      <label className="text-base sm:text-xl font-bold sm:font-medium m-4">
        {label}
      </label>
      <div className="w-full h-[52px] relative">
        <input
          className={`w-full h-[55px] p-auto sm:py-4 px-4 text-base sm:text-xl border-2 rounded-lg pr-12 ${className}`}
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          onChange={onChange}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-[55%] transform -translate-y-1/2 hover:border-none focus:outline-none bg-transparent"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <FaEyeSlash className="h-5 w-5 text-gray-500" />
            ) : (
              <FaEye className="h-5 w-5 text-gray-500" />
            )}
          </button>
        )}
      </div>
      {type === "password" && (
        <div className="relative mt-5 ml-5 text-[14px] font-medium">
          <a href="#">Forgot Password?</a>
        </div>
      )}
    </div>
  );
};

export default TextInput;
