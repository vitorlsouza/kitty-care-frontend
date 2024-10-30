import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import SubscribeBtn from "../components/Payments/SubscribeBtn";
import PayMethodBtn from "../components/Payments/PayMethodBtn";
import SwitchMethod from "../components/Payments/SwitchMethod";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const handleBillInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingOption({
      ...billingOption,
      [e.target.name]: e.target.checked,
    });
  };

  const initialPayPalOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID, // Replace with your PayPal client ID
    currency: "USD",
    intent: "capture",
  };

  const handlePayPalOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: billingOption.method
              ? billingOption.yearly
              : billingOption.monthly,
          },
        },
      ],
    });
  };

  const handlePayPalApprove = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      // Handle successful payment
      console.log("Payment completed", details);
      navigate("/success"); // Navigate to success page
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
                <PayMethodBtn
                  payBy="card"
                  onClick={() => {
                    navigate("/paymentdetail");
                  }}
                />
                {/* <PayMethodBtn payBy="paypal" onClick={() => {}} /> */}
                <PayPalScriptProvider options={initialPayPalOptions}>
                  <PayPalButtons
                    style={{
                      layout: "horizontal",
                      tagline: false,
                      label: "paypal",
                    }}
                    createOrder={(data, actions) =>
                      handlePayPalOrder(data, actions)
                    }
                    onApprove={(data, actions) =>
                      handlePayPalApprove(data, actions)
                    }
                  />
                </PayPalScriptProvider>
                <SubscribeBtn payBy="google" onClick={() => {}} />
                {/* <SubscribeBtn payBy="apple" onClick={() => {}} /> */}
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
