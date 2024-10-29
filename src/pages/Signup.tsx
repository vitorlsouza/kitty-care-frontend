import { useState } from "react";
import Divider from "../components/Login/Divider";
import TextInput from "../components/Login/Input";
import LogBtnBy from "../components/Login/LogBtnBy";
import Toggle from "../components/Login/Toggle";
import CheckOption from "../components/Login/CheckOption";
import { useAppDispatch } from '../Redux/hooks';
import { signUpUser } from '../Redux/features/userSlice';

const Signup = () => {
  const dispatch = useAppDispatch();

  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleBillInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingOption({
      ...billingOption,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    });
    if (userInfo.first_name === "")
      setError({ ...error, first_name: "First name is required." });
    else if (userInfo.last_name === "")
      setError({ ...error, last_name: "Last name is required." });
    else if (userInfo.email === "")
      setError({ ...error, email: "Email is required." });
    else if (userInfo.password === "")
      setError({ ...error, password: "Password is required." });
    else {
      dispatch(signUpUser({
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        email: userInfo.email,
        password: userInfo.password,
        isAuthenticated: true,
      }));
      console.log(userInfo);
    }
    setTimeout(() => {
      setError({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      });
    }, 3000);
  };
  return (
    <div className="w-full h-full sm:h-screen mt-10 sm:mt-0 flex flex-col sm:items-center sm:justify-around">
      <div className="w-[150px] h-[30px] sm:w-[200px] sm:h-[40px] m-auto my-6">
        <img
          className="w-full h-full"
          src="/assets/svg/KittyLogo.svg"
          alt="kitty logo"
        />
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="w-full m-auto">
          <div className="w-[343px] sm:w-[430px] max-w-[90%] sm:me-[120px] m-auto mb-6">
            <label className="flex gap-[16px] items-center cursor-pointer my-8">
              <span
                className={`text-[18px] text-black dark:text-gray-300 capitalize  ${
                  billingOption.method ? "font-medium opacity-60" : "font-bold"
                }`}
              >
                Monthly
              </span>
              <Toggle
                value={billingOption.method}
                name="method"
                onChange={handleBillInfo}
              />
              <span
                className={`text-[18px] text-black dark:text-gray-300 capitalize  ${
                  !billingOption.method ? "font-medium opacity-60" : "font-bold"
                }`}
              >
                Annually
              </span>
            </label>
            <div className="text-xl font-semibold capitalize opacity-60">
              Get Full Access To
              <br />
              Kitty Care's Expert Advice For
            </div>
            <div className="text-[50px] font-semibold text-[#0061EF] my-3">
              ${billingOption.price} Today
            </div>
            <div className="text-2xl font-semibold leading-normal my-3">
              {billingOption.method
                ? `$0.82 USD/Daily, billed annually at $299.99/year after your 7-day
              trial. Cancel anytime.`
                : `$49.99/month after your 3-day trial.
              Cancel anytime.`}
            </div>
            <div className="flex flex-col gap-[20px]">
              <CheckOption
                label="Your Trusted Cat Care Expert"
                content="Providing fast, tailored advice on your cat's health, behavior, and overall well being all from the palm of your hand."
                checked={billingOption.trustOption}
                name="trustOption"
                onChange={handleBillInfo}
              />
              <CheckOption
                label="No strings attached"
                content="Enjoy a 7-day free trial with our flexible monthly or annual plans, giving you peace of mind without commitment."
                checked={billingOption.nostringOption}
                name="nostringOption"
                onChange={handleBillInfo}
              />
              <CheckOption
                label="Save time and money on vet visits"
                content="With expert advice at your fingertips, KittyCare helps you manage minor issues at home, reducing unnecessary vet trips."
                checked={billingOption.saveOption}
                name="saveOption"
                onChange={handleBillInfo}
              />
            </div>
          </div>
        </div>
        <div className="w-full m-auto mb-10">
          <div className="m-auto w-[343px] sm:w-[610px] h-auto max-w-[90%] px-[21px] py-[47px] sm:px-[104px] sm:py-[70px] bg-white border-2 rounded-3xl border-[#B8B8B8]">
            <div className="w-full h-full flex flex-col items-center justify-between">
              <div className="text-center">
                <h2 className="text-[28px] sm:text-[40px] font-semibold pb-4">
                  Sign up
                </h2>
                <div className="text-base sm:text-lg font-medium">
                  Already have an account?{" "}
                  <span>
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
                      className="w-full h-[55px] text-base sm:text-xl border-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 active:bg-blue-800 cursor-pointer"
                      type="submit"
                      value="Create account"
                      onClick={handleSubmit}
                    />
                  </div>
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
