import { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PayMethodBtn from "../components/Payments/PayMethodBtn";
import SwitchMethod from "../components/Payments/SwitchMethod";
import { useNavigate } from "react-router-dom";
import ApplePayBtn from "../components/Payments/ApplePayBtn";
import GooglePayBtn from "../components/Payments/GooglePayBtn";

const PaymentMethod = () => {
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

  const [isApplePayAvailable, setIsApplePayAvailable] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if Apple Pay is available
    const checkApplePayAvailability = () => {
      if ('ApplePaySession' in window) {
        setIsApplePayAvailable((window as any).ApplePaySession.canMakePayments());
      }
    };

    checkApplePayAvailability();
  }, []);

  const initialPayPalOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID, // Replace with your PayPal client ID
    currency: "USD",
    intent: "capture",
  };

  // @ts-ignore
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

  // @ts-ignore
  const handlePayPalApprove = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      // Handle successful payment
      console.log("Payment completed", details);
      navigate("/success"); // Navigate to success page
    });
  };

  const handleApplePayClick = async () => {
    try {
      const session = new (window as any).ApplePaySession(3, {
        countryCode: "US",
        currencyCode: "USD",
        supportedNetworks: ["visa", "masterCard", "amex"],
        merchantCapabilities: ["supports3DS"],
        total: {
          label: "Your Company Name",
          amount: billingOption.method
            ? billingOption.yearly
            : billingOption.monthly,
        },
      });

      session.onvalidatemerchant = async (event: any) => {
        // Here you would typically make an API call to your backend to validate the merchant
        try {
          const merchantSession = await fetch(
            "/api/apple-pay/validate-merchant",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                validationURL: event.validationURL,
              }),
            }
          ).then((res) => res.json());

          session.completeMerchantValidation(merchantSession);
        } catch (err) {
          console.error("Merchant validation failed:", err);
          session.abort();
        }
      };

      session.onpaymentauthorized = async () => {
        try {
          // Process the payment here
          // You would typically make an API call to your backend

          session.completePayment((window as any).ApplePaySession.STATUS_SUCCESS);
          navigate("/success");
        } catch (err) {
          console.error("Payment failed:", err);
          session.completePayment((window as any).ApplePaySession.STATUS_FAILURE);
        }
      };

      session.begin();
    } catch (error) {
      console.error("Apple Pay error:", error);
    }
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
                  onClick={() => navigate("/paymentdetail")}
                />
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
                {isApplePayAvailable ? (
                  <ApplePayBtn
                    onClick={handleApplePayClick}
                    disabled={false}
                  />
                ) : (
                  <GooglePayBtn />
                )}
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
