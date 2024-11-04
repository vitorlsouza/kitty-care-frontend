import { useEffect, useState } from "react";
import SwitchMethod from "../components/Payments/SwitchMethod";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { getCode } from "country-list";

import { loadStripe, StripeCardNumberElement } from "@stripe/stripe-js";
import { JSX } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../Redux/hooks";
import { RootState } from "../Redux/store";
import { getClientSecretKey } from "../services/api";
import { createSubscriptionAsync } from "../Redux/features/subscriptionSlice";
import { useAppDispatch } from "../Redux/hooks";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = () => {
  useEffect(() => {
    const subscriptionId = localStorage.getItem("subscriptionId");
    if (subscriptionId) {
      navigate("/cat-assistant");
    }
  }, []);

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();
  const [_subscriptionId, setSubscriptionId] = useState("");

  const billingOption = useAppSelector((state: RootState) => state.billing);
  const userInfo = useAppSelector((state: RootState) => state.user);

  const [error, setError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    general: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]; // This will format to YYYY-MM-DD
  };

  const [formData, setFormData] = useState({
    fullName: "",
    expiryMonth: "",
    expiryYear: "",
    securityCode: "",
    passcodeKey: "",
    country: "",
    state: "",
    postalCode: "",
    planName: "Free Trial", // TODO: change this to the actual plan name
    start_date: formatDate(new Date()),
    end_date: formatDate(new Date(new Date().getTime() + (billingOption.method ? 7 : 3) * 24 * 60 * 60 * 1000)),
    provider: "Stripe",
    billing_period: billingOption.method ? "Yearly" : "Monthly"
  });

  const navigate = useNavigate();

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
      const paymentMade = localStorage.getItem("paymentMade");

      if (paymentMade) {
        await dispatch(createSubscriptionAsync({
          id: _subscriptionId,
          plan: formData.planName,
          end_date: formData.end_date,
          start_date: formData.start_date,
          provider: formData.provider,
          billing_period: formData.billing_period
        })).unwrap();

        navigate("/progress");
      }

      const { paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(
          CardNumberElement
        ) as StripeCardNumberElement,
        billing_details: {
          name: formData.fullName,
          email: userInfo.email || localStorage.getItem("email"),
          address: {
            country: getCode(formData.country),
            state: formData.state,
            postal_code: formData.postalCode,
          },
        },
      });

      const trial_end = (billingOption.method ? 7 : 3) * 24 * 3600 + Math.floor(new Date().getTime() / 1000);
      const priceId = billingOption.method ? import.meta.env.VITE_STRIPE_ANNUAL_PRICE_ID : import.meta.env.VITE_STRIPE_MONTHLY_PRICE_ID;


      const { subscriptionId, success } = await getClientSecretKey({
        name: formData.fullName,
        email: userInfo.email || localStorage.getItem("email"),
        paymentMethodId: paymentMethod?.id,
        priceId,
        trial_end
      });
      setSubscriptionId(subscriptionId);

      if (success) {
        localStorage.setItem("paymentMade", "true");

        await dispatch(createSubscriptionAsync({
          id: _subscriptionId,
          plan: formData.planName,
          end_date: formData.end_date,
          start_date: formData.start_date,
          provider: formData.provider,
          billing_period: formData.billing_period
        })).unwrap();

        navigate("/progress");
      }

    } catch (err) {
      console.log("err", err);
      setError({ ...error, general: "An unexpected error occurred." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/paymentmethod");
  };

  const cardElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Inter, "Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: window.innerWidth < 640 ? "16px" : "20px",
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
    <div className="flex flex-col sm:flex-row justify-between max-w-[1200px] m-auto gap-6 sm:gap-[80px]">
      <div className="m-auto sm:m-0 max-w-[90%] sm:w-1/2">
        <SwitchMethod />
      </div>
      <div className="m-auto w-full sm:m-0">
        <div className="max-w-[90%] m-auto px-[21px] py-[47px] sm:w-[610px]  sm:px-[104px] sm:py-[70px] h-auto bg-white border-2 rounded-3xl border-[#B8B8B8]">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <div className="text-center text-[40px] font-semibold capitalize">
                ${0} Today
              </div>
              <div className="text-center text-[18px] font-medium opacity-60 text-black">
                {billingOption.method
                  ? "$0.00 for 7-day free trial; converts to $299.99 annually renewing subscription."
                  : "$0.00 for 3-day free trial; converts to $49.99 annually renewing subscription."}
              </div>
            </div>
            <div>
              <label className="ms-3 mb-[10px] block text-base sm:text-[20px] font-medium text-black">
                Full Name on Card
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="border text-base sm:text-[20px] px-6 py-[14px] h-[55px] rounded-lg border-[#898B90] items-center w-full"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="rounded-lg overflow-hidden">
              <label className="ms-3 mb-[10px] block text-base sm:text-[20px] font-medium text-black">
                Card Number
              </label>
              <CardNumberElement
                className="grid border px-6 py-[14px] h-[55px] rounded-lg border-[#898B90] items-center"
                options={cardElementOptions}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="ms-3 mb-[10px] block text-base sm:text-[20px] font-medium text-black">
                  Expiry Month
                </label>
                <CardExpiryElement
                  className="grid border px-6 py-[14px] h-[55px] rounded-lg border-[#898B90] items-center"
                  options={cardElementOptions}
                />
              </div>
              <div>
                <label className="ms-3 mb-[10px] block text-base sm:text-[20px] font-medium text-black">
                  Security Code
                </label>
                <CardCvcElement
                  className="grid border px-6 py-[14px] h-[55px] rounded-lg border-[#898B90] items-center"
                  options={cardElementOptions}
                />
              </div>
            </div>

            <div>
              <label className="ms-3 mb-[10px] block text-base sm:text-[20px] font-medium text-black">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="border text-base sm:text-[20px] px-6 py-[14px] h-[55px] rounded-lg border-[#898B90] items-center w-full"
                placeholder="Select country"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="ms-3 mb-[10px] block text-base sm:text-[20px] font-medium text-black">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="border text-base sm:text-[20px] px-6 py-[14px] h-[55px] rounded-lg border-[#898B90] items-center w-full"
                  required
                />
              </div>

              <div>
                <label className="ms-3 mb-[10px] block text-base sm:text-[20px] font-medium text-black">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="border text-base sm:text-[20px] px-6 py-[14px] h-[55px] rounded-lg border-[#898B90] items-center w-full"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                disabled={!stripe || isLoading}
                className="text-[#898B90] font-semibold text-[18px] w-[146px] h-[55px] items-center text-center border-[#898B90] border rounded-[20px]"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!stripe || isLoading}
                className="text-[#FAF6F3] font-semibold text-[18px] w-[146px] h-[55px] items-center text-center border-[#898B90] border rounded-[20px] bg-[#0061EF]"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
          <div className="text-red-500">{error.general}</div>
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
