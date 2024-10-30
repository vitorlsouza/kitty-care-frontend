import { useState } from "react";
import Toggle from "../components/Login/Toggle";
import CheckOption from "../components/Login/CheckOption";
import SubscribeBtn from "../components/Payments/SubscribeBtn";
import PayMethodBtn from "../components/Payments/PayMethodBtn";
import SwitchMethod from "../components/Payments/SwitchMethod";

const PaymentMethod = () => {
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

  const handleBillInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingOption({
      ...billingOption,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:px-[332px] justify-between">
        <div className="m-auto sm:m-0 w-[359px] sm:w-[432px] max-w-[90%]">
          <SwitchMethod />
        </div>
        <div className="m-auto sm:m-0 my-2">
          <div className="w-[343px] px-[21px] py-[47px] sm:w-[610px] sm:px-[85px] sm:py-[100px] h-auto bg-white border-2 rounded-3xl border-[#B8B8B8]">
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
                <SubscribeBtn payBy="apple" onClick={() => {}} />
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

export default PaymentMethod;
