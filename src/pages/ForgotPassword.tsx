import { useState } from 'react';
import Layout from '../components/Layout';
import TextInput from '../components/Login/Input';
import { useNavigate } from 'react-router-dom';
import { useRive, UseRiveParameters } from 'rive-react';
import styles from '../components/LoadingOverlay/LoadingOverlay.module.css';
import axios from 'axios';
// Constants
const RIVE_ANIMATION_CONFIG: UseRiveParameters = {
  src: 'riv/V2/Pulse_kitty.riv',
  autoplay: true,
};

const baseURL = import.meta.env.VITE_BASE_API_URL || 'https://kittycare-nodejs.vercel.app';

const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { RiveComponent } = useRive(RIVE_ANIMATION_CONFIG);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(`${baseURL}/api/supabase/password-reset/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // here is param.
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        navigate('/sent-mail')
      } else {
        setIsLoading(false);
        setMessage('Error: ' + data.message);
      }
    } catch (error: unknown) {
      setIsLoading(false);
      if (error instanceof Error) {
        setMessage('Network error: ' + error.message);
      } else {
        setMessage('An unknown error occurred');
      }
    }
    console.log('Form submitted');
  };

  if (isLoading) return (
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
  )

  return (
    <Layout>
      <div className="w-[343px] m-auto sm:w-[600px] max-w-[90%] px-[21px] py-[47px] sm:px-[100px] sm:py-[70px] bg-white border-2 rounded-3xl border-[#B8B8B8]">
        <div className="w-full h-full flex flex-col items-center">
          <div className="text-center">
            <h2 className="text-[28px] sm:text-[40px] font-semibold pb-4">
              Password Reset
            </h2 >
          </div >
        </div >
        <div className='w-full text-center'>
          <p className='text-base sm:text-lg'>Enter your email address and we'll send you an email with instructions to reset your password.</p>
        </div>
        <form
          onSubmit={handleSubmit}
        >
          <TextInput
            name="email"
            label="Email"
            type="email"
            placeholder="name@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
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
            Send Reset Link
          </button>
        </form>
        {message && <p className='text-red-500'>{message}</p>}
        <div className='flex w-full justify-between text-center mt-5'>
          <a href="/login" className='flex px-4 py-3 hover:bg-gray-100 rounded-lg text-[#0061EF] font-medium text-base'>Login</a>
          <a href="/signup" className='flex px-4 py-3 hover:bg-gray-100 rounded-lg text-[#0061EF] font-medium text-base'>Sign up</a>
        </div>
      </div >
    </Layout >

  );
};
export default ForgotPassword;

