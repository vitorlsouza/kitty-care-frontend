import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import TextInput from '../components/Login/Input';
import { useLocation, useNavigate } from 'react-router-dom';
import { requestResetPasswordAPI } from '../services/api';
import { useRive, UseRiveParameters } from 'rive-react';
import styles from '../components/LoadingOverlay/LoadingOverlay.module.css';
import { validatePassword } from '../utils/validation';

interface FormErrors {
    newPassword: string,
    confirmPassword: string,
    response: string,
}

const initialErrors: FormErrors = {
    newPassword: '',
    confirmPassword: '',
    response: ''
};

const RIVE_ANIMATION_CONFIG: UseRiveParameters = {
    src: 'riv/V2/Pulse_kitty.riv',
    autoplay: true,
};

const ResetPassword: React.FC = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = React.useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState<FormErrors>(initialErrors);
    const [isLoading, setIsLoading] = useState(false);
    const { RiveComponent } = useRive(RIVE_ANIMATION_CONFIG);
    const location = useLocation();
    const [token, setToken] = useState<string | null>('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tokenValue = params.get('token');
        setToken(tokenValue);
    }, [location]);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Update form values
        setFormValues((prev) => ({ ...prev, [name]: value }));

        // Handle new password validation
        if (name === "newPassword") {
            setError((prevError) => ({
                ...prevError,
                newPassword: validatePassword(value),
            }));
        }

        // Handle confirm password validation
        if (name === "confirmPassword") {
            setFormValues((prev) => {
                const isMatch = prev.newPassword === value;
                setError((prevError) => ({
                    ...prevError,
                    confirmPassword: isMatch ? "" : "Password not same",
                }));
                return prev;
            });
        }
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (Object.values(error).some((error) => error !== "")) return;

        setIsLoading(true);

        if (token) {
            const response = await requestResetPasswordAPI(token, formValues.newPassword);
            if (response.success) {
                setIsLoading(false);
                navigate('/login');
            } else {
                setError((prevError) => ({
                    ...prevError,
                    response: response.message,
                }));
                setIsLoading(false);
            }
        }
    };

    if (isLoading) {
        return (
            <div
                className={styles.overlay}
                role="alert"
                aria-busy="true"
                aria-label="Loading content"
            >
                <div className={styles.animationContainer}>
                    {RiveComponent && <RiveComponent />}
                </div>
            </div>
        );
    }

    return (
        <Layout>
            <div className="w-[343px] m-auto sm:w-[600px] max-w-[90%] px-[21px] py-[47px] sm:px-[100px] sm:py-[70px] bg-white border-2 rounded-3xl border-[#B8B8B8]">
                <div className="w-full h-full flex flex-col items-center">
                    <div className="text-center">
                        <h2 className="text-[28px] sm:text-[40px] font-semibold pb-4">
                            Password Reset
                        </h2>
                    </div>
                </div>
                <div className='w-full text-center'>
                    <p className='text-base sm:text-lg'>Enter your new passowrd.</p>
                </div>
                <form
                    onSubmit={handleSubmit}
                >
                    <TextInput
                        name="newPassword"
                        label="New Password"
                        type="password"
                        placeholder="Enter your new password"
                        onChange={handlePasswordChange}
                    />
                    {error.newPassword && (
                        <p className='text-sm text-red-600 mt-4'>{error.newPassword}</p>
                    )}
                    <TextInput
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm your new password"
                        onChange={handlePasswordChange}
                    />
                    {error.confirmPassword && (
                        <p className='text-sm text-red-600 mt-4'>{error.confirmPassword}</p>
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
                        Reset Password
                    </button>
                    {error.response && (
                        <p className='text-sm text-red-600 mt-4'>{error.response}</p>
                    )}
                </form>
            </div>
        </Layout>
    );
};
export default ResetPassword;

