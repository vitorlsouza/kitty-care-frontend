import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from "../Redux/hooks";
import { changeMethod } from "../Redux/features/billingSlice";
import ReactPixel from 'react-facebook-pixel';
import { useMediaQuery } from 'react-responsive';

// Components
import Layout from "../components/Layout";
import TextInput from "../components/Login/Input";
import SwitchMethod from "../components/Payments/SwitchMethod";
import { SignupHeader } from "../components/Signup/SignupHeader";
import { TermsCheckbox } from "../components/Signup/TermsCheckbox";
import { SubmitButton } from "../components/Signup/SubmitButton";

// Hooks
import { useSignupForm, FormErrors } from "../hooks/useSignupForm";

// Constants
const REDIRECT_PATHS = {
  PRICE_SELECTION: "/priceselection",
  PROGRESS: "/progress",
  CAT_ASSISTANT: "/cat-assistant"
} as const;

interface SignupFormProps {
  error: FormErrors;
  isLoading: boolean;
  checked: boolean;
  setChecked: (checked: boolean) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  error,
  isLoading,
  checked,
  setChecked,
  handleChange,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit} className="w-full h-full flex-col justify-between">
    <TextInput
      label=""
      name="first_name"
      type="text"
      placeholder="First name"
      className={error.first_name ? "border-red-500" : ""}
      onChange={handleChange}
      error={error.first_name}
    />
    <TextInput
      label=""
      name="last_name"
      type="text"
      placeholder="Last name"
      className={error.last_name ? "border-red-500" : ""}
      onChange={handleChange}
      error={error.last_name}
    />
    <TextInput
      label=""
      name="email"
      type="email"
      placeholder="name@email.com"
      className={error.email ? "border-red-500" : ""}
      onChange={handleChange}
      error={error.email}
    />
    <TextInput
      label=""
      name="password"
      type="password"
      placeholder="Password (8+ characters)"
      className={error.password ? "border-red-500" : ""}
      onChange={handleChange}
      error={error.password}
    />
    <TermsCheckbox checked={checked} setChecked={setChecked} />
    {error.general && (
      <div className="text-red-500 text-base text-center mt-2">
        {error.general}
      </div>
    )}
    <SubmitButton isLoading={isLoading} />
  </form>
);

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const [isShowPaywall, setIsShowPaywall] = useState(true);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });


  const {
    error,
    isLoading,
    checked,
    setChecked,
    handleChange,
    handleSubmit,
  } = useSignupForm();

  // Handle plan selection from URL
  useEffect(() => {
    ReactPixel.track('ViewContent');

    const planSelection = urlParams.get('planSelection');
    if (planSelection) {
      const isYearly = planSelection.toLowerCase() === "yearly";
      dispatch(changeMethod({ method: isYearly }));
    }
  }, [dispatch, urlParams]);

  // Handle authentication and navigation
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const subscriptionId = localStorage.getItem("subscriptionId");
    const catId = localStorage.getItem("catId");

    if (!subscriptionId || subscriptionId === "undefined") {
      navigate(`${REDIRECT_PATHS.PRICE_SELECTION}?${urlParams.toString()}`);
    } else if (!catId || catId === "undefined") {
      navigate(REDIRECT_PATHS.PROGRESS);
    } else {
      navigate(REDIRECT_PATHS.CAT_ASSISTANT);
    }
  }, [navigate, urlParams]);

  useEffect(() => {
    if (isMobile) {
      const layoutBackground = document.querySelector('[data-testid="layout-background"]') as HTMLElement;

      if (layoutBackground) {
        const images = layoutBackground.querySelectorAll<HTMLImageElement>('img');

        images.forEach((img) => {
          img.style.display = 'none'; // Hides the element completely
        });
      }
    }
  }, [isMobile]);

  const handleClickPaywall = () => {
    setIsShowPaywall(false);
    if (isMobile) {
      const layoutBackground = document.querySelector('[data-testid="layout-background"]') as HTMLElement;

      if (layoutBackground) {
        const images = layoutBackground.querySelectorAll<HTMLImageElement>('img');

        images.forEach((img) => {
          img.style.display = 'block'; // Hides the element completely
        });
      }
    }
  };

  return (
    <Layout>
      {isShowPaywall && isMobile ? (
        <div className='flex flex-col gap-6 w-full p-[16px_16px] h-auto overflow-hidden'>
          <div className='flex flex-col gap-2 text-center'>
            <h1 className='text-black [leading-trim:both] [text-edge:cap] font-inter text-[24px] font-bold capitalize'>Get KittyCare Today</h1>
            <p className='text-[#404040] text-center [leading-trim:both] [text-edge:cap] font-inter text-[18px] font-medium leading-[1.3]'>
              Unlock every exclusive feature - for $0 right now
            </p>
          </div>
          <div className='flex flex-col gap-[20px] w-full rounded-[22px] border-2 border-[#DBCEC4] bg-[#F3EDE8] p-[0_48px_24px_48px]'>
            <h3 className='w-full bg-[#FFA500] rounded-b-[14px] px-[28px] py-[8px] text-black text-center [leading-trim:both] [text-edge:cap] font-inter text-sm font-semibold leading-[1.4]'>
              Why KittyCare?
            </h3>
            <ul className='flex flex-col gap-[16px] text-sm text-black'>
              <li className='flex gap-[10px]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <path d="M2.84766 9.6533C2.84766 6.07128 2.84766 4.28027 3.96803 3.16748C5.08841 2.05469 6.89162 2.05469 10.498 2.05469C14.1044 2.05469 15.9077 2.05469 17.0281 3.16748C18.1484 4.28027 18.1484 6.07128 18.1484 9.6533C18.1484 13.2353 18.1484 15.0263 17.0281 16.1391C15.9077 17.2519 14.1044 17.2519 10.498 17.2519C6.89162 17.2519 5.08841 17.2519 3.96803 16.1391C2.84766 15.0263 2.84766 13.2353 2.84766 9.6533Z" fill="#FFCE01" stroke="black" stroke-width="1.19973" />
                  <path d="M7.2793 10.0533L9.29248 12.0528L13.7215 7.25391" stroke="black" stroke-width="1.19973" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p>
                  <b>Cat-Specific Care</b><br />
                  Personalized for your feline.
                </p>
              </li>
              <li className='flex gap-[10px]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <path d="M2.84766 9.6533C2.84766 6.07128 2.84766 4.28027 3.96803 3.16748C5.08841 2.05469 6.89162 2.05469 10.498 2.05469C14.1044 2.05469 15.9077 2.05469 17.0281 3.16748C18.1484 4.28027 18.1484 6.07128 18.1484 9.6533C18.1484 13.2353 18.1484 15.0263 17.0281 16.1391C15.9077 17.2519 14.1044 17.2519 10.498 17.2519C6.89162 17.2519 5.08841 17.2519 3.96803 16.1391C2.84766 15.0263 2.84766 13.2353 2.84766 9.6533Z" fill="#FFCE01" stroke="black" stroke-width="1.19973" />
                  <path d="M7.2793 10.0533L9.29248 12.0528L13.7215 7.25391" stroke="black" stroke-width="1.19973" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p>
                  <b>24/7 Expert Advice</b><br />
                  Answers when you need them.
                </p>
              </li>
              <li className='flex gap-[10px]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <path d="M2.84766 9.6533C2.84766 6.07128 2.84766 4.28027 3.96803 3.16748C5.08841 2.05469 6.89162 2.05469 10.498 2.05469C14.1044 2.05469 15.9077 2.05469 17.0281 3.16748C18.1484 4.28027 18.1484 6.07128 18.1484 9.6533C18.1484 13.2353 18.1484 15.0263 17.0281 16.1391C15.9077 17.2519 14.1044 17.2519 10.498 17.2519C6.89162 17.2519 5.08841 17.2519 3.96803 16.1391C2.84766 15.0263 2.84766 13.2353 2.84766 9.6533Z" fill="#FFCE01" stroke="black" stroke-width="1.19973" />
                  <path d="M7.2793 10.0533L9.29248 12.0528L13.7215 7.25391" stroke="black" stroke-width="1.19973" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p>
                  <b>Tailored Plans</b><br />
                  Health and behavior support.
                </p>
              </li>
              <li className='flex gap-[10px]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <path d="M2.84766 9.6533C2.84766 6.07128 2.84766 4.28027 3.96803 3.16748C5.08841 2.05469 6.89162 2.05469 10.498 2.05469C14.1044 2.05469 15.9077 2.05469 17.0281 3.16748C18.1484 4.28027 18.1484 6.07128 18.1484 9.6533C18.1484 13.2353 18.1484 15.0263 17.0281 16.1391C15.9077 17.2519 14.1044 17.2519 10.498 17.2519C6.89162 17.2519 5.08841 17.2519 3.96803 16.1391C2.84766 15.0263 2.84766 13.2353 2.84766 9.6533Z" fill="#FFCE01" stroke="black" stroke-width="1.19973" />
                  <path d="M7.2793 10.0533L9.29248 12.0528L13.7215 7.25391" stroke="black" stroke-width="1.19973" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p>
                  <b>Early Issue Detection</b><br />
                  Prevent expensive emergencies.
                </p>
              </li>
              <li className='flex gap-[10px]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <path d="M2.84766 9.6533C2.84766 6.07128 2.84766 4.28027 3.96803 3.16748C5.08841 2.05469 6.89162 2.05469 10.498 2.05469C14.1044 2.05469 15.9077 2.05469 17.0281 3.16748C18.1484 4.28027 18.1484 6.07128 18.1484 9.6533C18.1484 13.2353 18.1484 15.0263 17.0281 16.1391C15.9077 17.2519 14.1044 17.2519 10.498 17.2519C6.89162 17.2519 5.08841 17.2519 3.96803 16.1391C2.84766 15.0263 2.84766 13.2353 2.84766 9.6533Z" fill="#FFCE01" stroke="black" stroke-width="1.19973" />
                  <path d="M7.2793 10.0533L9.29248 12.0528L13.7215 7.25391" stroke="black" stroke-width="1.19973" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p>
                  <b>3-Day Free Trial</b><br />
                  Full access, cancel anytime.
                </p>
              </li>
            </ul>
          </div>
          <div className='flex flex-col gap-[10px]'>
            <button
              className="w-full h-[50px] text-base bg-blue-600 text-white rounded-2xl hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200"
              onClick={handleClickPaywall}
            >
              Try For Free
            </button>
            <p className='text-black text-center [leading-trim:both] [text-edge:cap] font-inter text-sm font-medium leading-[1.4]'>
              Auto-renews for <b>$49.99</b>/month until canceled
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-between max-w-[1200px] m-auto gap-6 sm:gap-[140px]">
            {!isMobile && (
              <div className="m-auto sm:m-0 max-w-[90%] sm:w-full">
                <SwitchMethod />
              </div>
            )}
            <div className="m-auto w-full sm:m-0">
              <div className="max-w-[90%] m-auto px-[21px] py-[47px] sm:w-[610px] sm:px-[104px] sm:py-[40px] h-auto bg-white border-2 rounded-3xl border-[#B8B8B8]">
                <div className="w-full sm:w-full m-auto h-full flex flex-col items-center justify-between">
                  <SignupHeader urlParams={urlParams} />
                  <SignupForm
                    error={error}
                    isLoading={isLoading}
                    checked={checked}
                    setChecked={setChecked}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Signup;
