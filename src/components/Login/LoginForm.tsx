import { FC } from 'react';
import TextInput from './Input';
import { LoginFormProps } from './types';

export const LoginForm: FC<LoginFormProps> = ({
    error,
    isLoading,
    handleChange,
    handleSubmit,
}) => {
    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-4"
            noValidate
            aria-label="Login form"
        >
            <TextInput
                name="email"
                // label="Email"
                type="email"
                placeholder="name@email.com"
                className={error.email ? 'border-red-500' : ''}
                onChange={handleChange}
                error={error.email}
                aria-invalid={!!error.email}
            />

            <TextInput
                name="password"
                // label="Password"
                type="password"
                placeholder="Password (8+ characters)"
                className={error.password ? 'border-red-500' : ''}
                onChange={handleChange}
                error={error.password}
                aria-invalid={!!error.password}
            />

            {error.general && (
                <div
                    className="text-red-500 text-sm text-center"
                    role="alert"
                    aria-live="polite"
                >
                    {error.general}
                </div>
            )}

            <button
                type="submit"
                className="w-full h-[55px] mt-6 text-base sm:text-xl 
                         bg-blue-600 text-white rounded-2xl
                         hover:bg-blue-700 active:bg-blue-800
                         disabled:bg-blue-400 disabled:cursor-not-allowed
                         transition-colors duration-200"
                disabled={isLoading}
                aria-busy={isLoading}
            >
                {isLoading ? 'Logging in...' : 'Log in'}
            </button>
        </form>
    );
};

export default LoginForm; 