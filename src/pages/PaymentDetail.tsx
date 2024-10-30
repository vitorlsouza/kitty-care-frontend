import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toggle from "../components/Login/Toggle";
import CheckOption from "../components/Login/CheckOption";
import { useAppDispatch } from "../Redux/hooks";
import SubscribeBtn from "../components/Payments/SubscribeBtn";
import PayMethodBtn from "../components/Payments/PayMethodBtn";

const PaymentDetail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const handleBillInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingOption({
      ...billingOption,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full h-full sm:h-screen mt-10 sm:mt-0 flex flex-col sm:items-center sm:justify-around">
      <div className="w-[150px] h-[30px] sm:w-[200px] sm:h-[40px] m-auto my-6">
        <img
          className="w-full h-full"
          src="/assets/svg/KittyLogo.svg"
          alt="Kitty Logo"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-[170px]">
        <div className="w-full m-auto">
          <div className="w-[343px] sm:w-[430px] max-w-[90%] m-auto mb-6">
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
          <div className="m-auto w-[343px] sm:w-[660px] h-auto max-w-[90%] px-[21px] py-[47px] sm:px-[85px] sm:py-[145px] bg-white border-2 rounded-3xl border-[#B8B8B8]">
            <div className="w-full h-full flex flex-col items-center justify-between">
              <div className="text-center">
                <h2 className="text-[28px] sm:text-[40px] font-semibold mb-6">
                  Choose How to Pay
                </h2>
                <div className="text-base sm:text-lg font-medium mb-10">
                  {billingOption.method
                    ? "$0.00 for 7-day free trial; converts to $299.99 annually renewing subscription."
                    : "$0.00 for 3-day free trial; converts to $49.99 monthly renewing subscription."}
                </div>
              </div>

              <div className="w-full h-full flex flex-col justify-between gap-[30px]">
                <PayMethodBtn payBy="card" onClick={() => {}} />
                <PayMethodBtn payBy="paypal" onClick={() => {}} />
                <div>
                  <SubscribeBtn payBy="apple" onClick={() => {}} />
                  {error.general && (
                    <div className="text-red-500 text-sm text-center mt-2">
                      {error.general}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-[14px] font-semibold opacity-60 text-center">
                    Applicable VAT, sales or other applicable taxes may apply.
                  </div>
                  <div className="text-[#0061EF] text-center text-[18px] font-semibold underline cursor-pointer">
                    Cancel anytime
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetail;
