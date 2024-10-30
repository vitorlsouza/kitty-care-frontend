import { useState } from "react";
import SwitchMethod from "../components/Payments/SwitchMethod";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import { JSX } from "react/jsx-runtime";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    general: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    expiryMonth: "",
    expiryYear: "",
    securityCode: "",
    passcodeKey: "",
    country: "",
    state: "",
    postalCode: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-complete`,
        },
      });

      if (result.error) {
        setError({ ...error, general: result.error?.message || "" });
      }
    } catch (err) {
      setError({ ...error, general: "An unexpected error occurred." });
    } finally {
      setIsLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Inter, "Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "20px",
        lineHeight: "normal",
        fontWeight: 500,
        "::placeholder": {
          color: "#B8B9BC",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
      complete: {
        color: "#28a745", // Example completion color
      },
    },
  };

  return (
    <div className="flex flex-col sm:flex-row sm:px-[332px] justify-between">
      <div className="m-auto sm:m-0 w-[359px] sm:w-[432px] max-w-[90%]">
        <SwitchMethod />
      </div>
      <div className="m-auto sm:m-0 my-2">
        <div className="w-[343px] px-[21px] py-[20px] sm:w-[610px] sm:px-[50px] sm:py-[44px] h-auto bg-white border-2 rounded-3xl border-[#B8B8B8]">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <div className="text-center text-[40px] font-semibold capitalize">$0 Today</div>
              <div className="text-center text-[18px] font-medium opacity-60 text-black">$0.00 for 7-day free trial; converts to $299.99 annually renewing subscription.</div>
            </div>
            <div>
              <label className="ms-3 mb-[10px] block text-[20px] font-medium text-black">
                Full Name on Card
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="border px-6 py-[14px] h-[55px] rounded-lg border-[#898B90] items-center w-full"
                required
              />
            </div>

            <div className="rounded-lg overflow-hidden">
              <label className="ms-3 mb-[10px] block text-[20px] font-medium text-black">
                Card Number
              </label>
              <CardNumberElement
                className="border px-6 py-[14px] h-[55px] rounded-lg border-[#898B90] items-center"
                options={cardElementOptions}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="ms-3 mb-[10px] block text-[20px] font-medium text-black">
                  Expiry Month
                </label>
                <CardExpiryElement
                  className="border px-6 py-[14px] h-[55px] rounded-lg border-[#898B90] items-center w-full"
                  options={cardElementOptions}
                />
              </div>
              <div>
                <label className="ms-3 mb-[10px] block text-[20px] font-medium text-black">
                  Security Code
                </label>
                <CardCvcElement
                  className="border px-6 py-[14px] h-[55px] rounded-lg border-[#898B90] items-center w-full"
                  options={cardElementOptions}
                />
              </div>
            </div>

            <div>
              <label className="ms-3 mb-[10px] block text-[20px] font-medium text-black">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="border px-6 py-[14px] h-[55px] rounded-lg border-[#898B90] items-center w-full"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="ms-3 mb-[10px] block text-[20px] font-medium text-black">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="border px-6 py-[14px] h-[55px] rounded-lg border-[#898B90] items-center w-full"
                  required
                />
              </div>

              <div>
                <label className="ms-3 mb-[10px] block text-[20px] font-medium text-black">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="border px-6 py-[14px] h-[55px] rounded-lg border-[#898B90] items-center w-full"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                disabled={!stripe || isLoading}
                className="text-[#898B90] font-semibold text-[18px] w-[146px] h-[55px] items-center text-center border-[#898B90] border rounded-[20px]"
              >
                Cancel
              </button>
              <button
                disabled={!stripe || isLoading}
                className="text-[#FAF6F3] font-semibold text-[18px] w-[146px] h-[55px] items-center text-center border-[#898B90] border rounded-[20px] bg-[#0061EF]"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const PaymentDetail = (props: JSX.IntrinsicAttributes) => (
  <Elements stripe={stripePromise}>
    <PaymentForm {...props} />
  </Elements>
);

export default PaymentDetail;
