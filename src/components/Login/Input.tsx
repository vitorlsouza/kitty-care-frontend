import { useState, ChangeEvent } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { TextInputProps } from '../../utils/types';

// Extract styles to constants for better maintainability
const STYLES = {
  container: 'my-[30px] flex flex-col gap-[20px] h-auto',
  label: 'text-base sm:text-xl font-bold sm:font-medium ml-[24px]',
  inputWrapper: 'w-full h-[52px] relative',
  input: 'w-full h-[55px] p-auto sm:py-4 px-[24px] text-base sm:text-xl border-2 rounded-lg',
  toggleButton: 'absolute right-3 top-[55%] transform -translate-y-1/2 border-none hover:border-none focus:outline-none bg-transparent',
  icon: 'h-5 w-5 text-gray-500',
  errorText: 'text-red-500 text-sm font-medium ms-6 -mt-[6px] relative'
} as const;

export interface TextInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  'aria-label': string;
}

const TextInput = ({
  name,
  label,
  type = 'text',
  placeholder,
  className = '',
  error = '',
  onChange,
  'aria-label': ariaLabel,
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={STYLES.container}>
      {label && (
        <label
          htmlFor={name}
          className={STYLES.label}
        >
          {label}
        </label>
      )}
      <div className={STYLES.inputWrapper}>
        <input
          id={name}
          name={name}
          className={`${STYLES.input} ${className}`}
          type={inputType}
          placeholder={placeholder}
          onChange={handleInputChange}
          aria-label={ariaLabel || label || name}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          required
        />
        {type === 'password' && (
          <button
            type="button"
            className={STYLES.toggleButton}
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible className={STYLES.icon} aria-hidden="true" />
            ) : (
              <AiOutlineEye className={STYLES.icon} aria-hidden="true" />
            )}
          </button>
        )}
      </div>
      {error && (
        <div
          id={`${name}-error`}
          className={STYLES.errorText}
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default TextInput;
