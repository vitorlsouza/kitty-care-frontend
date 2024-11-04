import TextInput from './Input';

interface LoginFormProps {
    error: {
        email: string;
        password: string;
        general: string;
    };
    isLoading: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
    error,
    isLoading,
    handleChange,
    handleSubmit,
}) => (
    <div className="w-full h-full flex-col justify-between">
        <TextInput
            name="email"
            label="Email"
            type="email"
            placeholder="name@email.com"
            className={error.email ? 'border-red-500' : ''}
            onChange={handleChange}
            error={error.email}
        />
        <TextInput
            name="password"
            label="Password"
            type="password"
            placeholder="Password (8+ characters)"
            className={error.password ? 'border-red-500' : ''}
            onChange={handleChange}
            error={error.password}
        />

        {error.general && (
            <div className="text-red-500 text-sm text-center mt-2">
                {error.general}
            </div>
        )}

        <div className="my-3">
            <div className="w-full h-[52px] my-[30px]">
                <input
                    className="w-full h-[55px] text-base sm:text-xl border-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 active:bg-blue-800 cursor-pointer disabled:bg-blue-400"
                    type="submit"
                    value={isLoading ? 'Logging in...' : 'Log in'}
                    onClick={handleSubmit}
                    disabled={isLoading}
                />
            </div>
        </div>
    </div>
); 