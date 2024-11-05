import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from "../Redux/hooks";
import { changeMethod } from "../Redux/features/billingSlice";
import ReactPixel from 'react-facebook-pixel';

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
      <div className="text-red-500 text-sm text-center mt-2">
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

  return (
    <Layout>
      <div className="w-full">
        <div className="flex flex-col sm:flex-row justify-between max-w-[1200px] m-auto gap-6 sm:gap-[140px]">
          <div className="m-auto sm:m-0 max-w-[90%] sm:w-full">
            <SwitchMethod />
          </div>
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
    </Layout>
  );
};

export default Signup;
