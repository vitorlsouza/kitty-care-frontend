import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Divider from "../components/Login/Divider";
import TextInput from "../components/Login/Input";
import LogBtnBy from "../components/Login/LogBtnBy";
// import Toggle from "../components/Login/Toggle";
// import CheckOption from "../components/Login/CheckOption";
import { useAppDispatch } from '../Redux/hooks';
import { signUpUserAsync } from '../Redux/features/userSlice';
import { validateUserInfo } from '../utils/validation';
import SwitchMethod from "../components/Payments/SwitchMethod";

const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  // @ts-ignore
  const [billingOption, setBillingOption] = useState({
    method: true,
    price: 0,
    daily: 0.82,
    monthly: 49.99,
    yearly: 299.99,
    trustOption: true,
    nostringOption: true,
    saveOption: true,
  });

  const [error, setError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    general: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const { isValid, errors } = validateUserInfo(userInfo);
    setError(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
    // Clear errors when user types
    setError(prev => ({ ...prev, [name]: "", general: "" }));
  };

  // const handleBillInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setBillingOption({
  //     ...billingOption,
  //     [e.target.name]: e.target.checked,
  //   });
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(signUpUserAsync({
        first_name: userInfo.first_name.trim(),
        last_name: userInfo.last_name.trim(),
        email: userInfo.email.trim(),
        password: userInfo.password,
      })).unwrap();

      // Clear form and errors on success
      setUserInfo({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      });
      setError({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        general: "",
      });

      // Redirect on success
      navigate('/dashboard');
    } catch (err: any) {
      setError(prev => ({
        ...prev,
        general: err.message || "Signup failed. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:px-[381px] justify-between">
        <div className="m-auto sm:m-0 w-[359px] sm:w-[432px] max-w-[90%]">
          <SwitchMethod />
        </div>
        <div className="m-auto sm:m-0">
          <div className="w-[343px] px-[21px] py-[47px] sm:w-[610px] sm:px-[104px] sm:py-[50px] h-auto bg-white border-2 rounded-3xl border-[#B8B8B8]">
            <div className="w-full h-full flex flex-col items-center justify-between">
              <div className="text-center">
                <h2 className="text-[28px] sm:text-[40px] font-semibold pb-4">
                  Sign up
                </h2>
                <div className="text-base sm:text-lg font-medium">
                  Already have an account?{" "}
                  <span className="text-[#0061EF]">
                    <a href="/login">Login</a>
                  </span>
                </div>
              </div>

              <div className="w-full h-full flex-col justify-between">
                <TextInput
                  name="first_name"
                  label=""
                  type="text"
                  placeholder="First name"
                  className={error.first_name === "" ? "" : "border-red-500"}
                  onChange={handleChange}
                  error={error.first_name}
                />
                <TextInput
                  name="last_name"
                  label=""
                  type="text"
                  placeholder="Last name"
                  className={error.last_name === "" ? "" : "border-red-500"}
                  onChange={handleChange}
                  error={error.last_name}
                />
                <TextInput
                  name="email"
                  label=""
                  type="email"
                  placeholder="name@email.com"
                  className={error.email === "" ? "" : "border-red-500"}
                  onChange={handleChange}
                  error={error.email}
                />
                <TextInput
                  name="password"
                  label=""
                  type="password"
                  placeholder="Password (8+ characters)"
                  className={error.password === "" ? "" : "border-red-500"}
                  onChange={handleChange}
                  error={error.password}
                />
                <div className="flex sm:hidden my-3 gap-2">
                  <div>
                    <input type="checkbox" />
                  </div>
                  <div>
                    I agree to the{" "}
                    <a href="/termsofconditions">Terms of Conditions</a> and{" "}
                    <a href="/privacypolicy">Privacy Policy.</a>
                  </div>
                </div>
                <div className="my-3">
                  <div className="w-full h-[52px] my-10">
                    <input
                      className="w-full h-[55px] text-base sm:text-xl border-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 active:bg-blue-800 cursor-pointer disabled:bg-blue-400"
                      type="submit"
                      value={isLoading ? "Creating account..." : "Create account"}
                      onClick={handleSubmit}
                      disabled={isLoading}
                    />
                  </div>
                  {error.general && (
                    <div className="text-red-500 text-sm text-center mt-2">
                      {error.general}
                    </div>
                  )}
                </div>
                <div className="flex gap-4 items-center justify-between">
                  <Divider />
                  <LogBtnBy
                    src="/assets/png/google.png"
                    alt="Google"
                    className="hidden sm:flex"
                  />
                  <div className="sm:hidden">Or</div>
                  <LogBtnBy
                    src="/assets/png/apple.png"
                    alt="Apple"
                    className="hidden sm:flex"
                  />
                  <Divider />
                </div>
                <div className="flex sm:hidden gap-4 items-center justify-center m-4">
                  <LogBtnBy
                    src="/assets/png/google.png"
                    alt="Google"
                    className="flex"
                  />
                  <LogBtnBy
                    src="/assets/png/apple.png"
                    alt="Apple"
                    className="flex"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
