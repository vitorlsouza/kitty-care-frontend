export interface LoginFormErrors {
    email: string;
    password: string;
    general: string;
}

export interface LoginFormProps {
    error: LoginFormErrors;
    isLoading: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
} 