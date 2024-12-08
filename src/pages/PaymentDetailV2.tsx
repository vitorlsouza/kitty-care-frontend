import { useEffect, useState } from "react";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { loadStripe, StripeCardNumberElement } from "@stripe/stripe-js";
import { JSX } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../Redux/hooks";
import { RootState } from "../Redux/store";
import { getClientSecretKey } from "../services/api";
import { createSubscriptionAsync } from "../Redux/features/subscriptionSlice";
import ReactPixel from 'react-facebook-pixel';
import { setLoading } from "../store/ui/actions";
import Layout from "../components/Layout";
import { useMediaQuery } from "react-responsive";
import { updateBillingOption } from "../Redux/features/billingSlice";
import VWORevenueTracking from "../components/VWORevenueTracking";
import { FaCcAmex, FaCcDiscover, FaCcMastercard, FaUserLock } from "react-icons/fa";
import { RiVisaFill } from "react-icons/ri";
import { LiaCcJcb } from "react-icons/lia";
import { allCountries } from "country-region-data";
import Select from "react-select";

// Constants
const STRIPE_PROMISE = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PAYMENT_CONFIG = {
  TRIAL_DAYS: {
    MONTHLY: 3,
    YEARLY: 7,
  },
  PRICES: {
    MONTHLY: 49.99,
    YEARLY: 299.99,
  },
  CARD_ELEMENT_OPTIONS: {
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
        color: "#28a745",
      },
    },
  },
};

// Types
interface PaymentFormData {
  fullName: string;
  country: string;
  state: string;
  postalCode: string;
  planName: string;
  startDate: string;
  endDate: string;
  provider: string;
  billingPeriod: string;
}

const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

const calculateEndDate = (isYearly: boolean): string => {
  const trialDays = isYearly ? PAYMENT_CONFIG.TRIAL_DAYS.YEARLY : PAYMENT_CONFIG.TRIAL_DAYS.MONTHLY;
  return formatDate(
    new Date(new Date().getTime() + trialDays * 24 * 60 * 60 * 1000)
  );
};

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const billingOption = useAppSelector((state: RootState) => state.billing);
  const userInfo = useAppSelector((state: RootState) => state.user);

  const [_subscriptionId, setSubscriptionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [states, setStates] = useState([{value: "", label: ""}]);


  const [formData, setFormData] = useState<PaymentFormData>({
    fullName: "",
    country: "",
    state: "",
    postalCode: "",
    planName: "Free Trial",
    startDate: formatDate(new Date()),
    endDate: calculateEndDate(billingOption.method),
    provider: "Stripe",
    billingPeriod: billingOption.method ? "Yearly" : "Monthly",
  });

  const countryOptions = allCountries.map(([name, slug, region]) => ({
    value: slug, // Using CountrySlug as the value
    label: name, // Using CountryName as the label
    region: region
  }));


  useEffect(() => {
    let subscriptionId = localStorage.getItem("subscriptionId");
    if (subscriptionId) {
      navigate("/cat-assistant");
    }
  }, [navigate]);

  useEffect(() => {
    if (isMobile) {
      dispatch(updateBillingOption({ method: false }));
    }
  }, [isMobile, dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCountryChange = (selectedOption: any) => {
    const selectedCountry = selectedOption.value;
    setFormData({ ...formData, country: selectedCountry, state: "" });
    console.log("@@@@", selectedOption.region);
    
    setStates(selectedOption.region.map(([label, value]: [string, string]) => ({
      label,
      value,
    })));
  };

  const handleStateChange = (selectedOption: any) => {
    setFormData({ ...formData, state: selectedOption.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setError("Payment system not initialized");
      return;
    }

    try {
      setIsLoading(true);
      dispatch(setLoading(true));

      const paymentMade = localStorage.getItem("paymentMade");

      if (paymentMade) {
        await dispatch(createSubscriptionAsync({
          id: _subscriptionId,
          email: userInfo.email || localStorage.getItem("email"),
          plan: formData.planName,
          end_date: formData.endDate,
          start_date: formData.startDate,
          provider: formData.provider,
          billing_period: formData.billingPeriod
        })).unwrap();

        localStorage.removeItem("paymentMade");
        if (localStorage.getItem("catId")) {
          navigate("/cat-assistant");
        } else {
          navigate("/");
        }
        dispatch(setLoading(false));
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
            country: formData.country,
            state: formData.state,
            postal_code: formData.postalCode,
          },
        },
      });

      ReactPixel.track('AddPaymentInfo');

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
          id: subscriptionId,
          email: userInfo.email || localStorage.getItem("email"),
          plan: formData.planName,
          end_date: formData.endDate,
          start_date: formData.startDate,
          provider: formData.provider,
          billing_period: formData.billingPeriod
        })).unwrap();

        ReactPixel.track('Purchase', {
          value: billingOption.price,
          currency: 'USD'
        });

        <VWORevenueTracking />;

        if (localStorage.getItem("catId")) {
          navigate("/cat-assistant");
        } else {
          navigate("/progress");
        }

        dispatch(setLoading(false));

      }

    } catch (error: any) {
      const errorMessage = error.message || "An unexpected error occurred";

      if (errorMessage == "Get client secret key failed") {
        setError("Invalid card details");
      } else {
        setError(errorMessage);
      }
      console.error("Payment processing error:", error.message);
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
    
  };

  const handleCancel = () => {
    navigate("/paymentmethodV2");
  };

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row justify-between max-w-[1200px] m-auto gap-6 sm:gap-[80px]">
        <div className="m-auto w-full sm:m-0">
          <div className="relative max-w-[90%] m-auto px-[21px] py-[47px] sm:w-[610px]  sm:px-[64px] sm:py-[50px] h-auto bg-white border-2 rounded-3xl border-[#B8B8B8]">
            <p className="absolute top-[-16px] right-[-20px] text-[16px] sm:text-[18px] bg-slate-800 text-white rounded-lg p-3">
              <small>Powered by</small> <big><b>stripe</b></big>
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <div className="text-center text-[#334155] text-[15px] sm:text-[24px] capitalize mb-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-400">
                    <FaUserLock className="text-2xl sm:text-4xl" />
                    Guaranteed <b>safe & secure</b> checkout
                  </div>
                  <div className="flex items-center justify-between ">
                    <RiVisaFill className="text-[50px] sm:text-[80px]" color="#0061EF" />
                    <FaCcMastercard className="text-[50px] sm:text-[80px]" color="#ef4444" />
                    <FaCcAmex className="text-[50px] sm:text-[80px]" color="#0ea5e9" />
                    <LiaCcJcb className="text-[50px] sm:text-[80px]" color="#8b5cf6" />
                    <FaCcDiscover className="text-[50px] sm:text-[80px]" color="#075985" />
                  </div>

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
                  options={PAYMENT_CONFIG.CARD_ELEMENT_OPTIONS}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="ms-3 mb-[10px] block text-base sm:text-[20px] font-medium text-black">
                    Expiry Month
                  </label>
                  <CardExpiryElement
                    className="grid border px-6 py-[14px] h-[55px] rounded-lg border-[#898B90] items-center"
                    options={PAYMENT_CONFIG.CARD_ELEMENT_OPTIONS}
                  />
                </div>
                <div>
                  <label className="ms-3 mb-[10px] block text-base sm:text-[20px] font-medium text-black">
                    Security Code
                  </label>
                  <CardCvcElement
                    className="grid border px-6 py-[14px] h-[55px] rounded-lg border-[#898B90] items-center"
                    options={PAYMENT_CONFIG.CARD_ELEMENT_OPTIONS}
                  />
                </div>
              </div>

              <div>
                <label className="ms-3 mb-[10px] block text-base sm:text-[20px] font-medium text-black">
                  Country
                </label>
                <Select
                  options={countryOptions}
                  value={
                    formData.country
                      ? { value: formData.country, label: countryOptions.find((option) => option.value === formData.country)?.label }
                      : null
                  }
                  onChange={handleCountryChange}
                  placeholder="Select country"
                  isSearchable
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="ms-3 mb-[10px] block text-base sm:text-[20px] font-medium text-black">
                    State
                  </label>
                  <Select
                    options={states}
                    value={
                      formData.state 
                      ? { value: formData.state, label: states.find((option) => option.value === formData.state)?.label } 
                      : null
                    }
                    onChange={handleStateChange}
                    placeholder="State"
                    isDisabled={!formData.country}
                    isSearchable
                  />
                </div>

                <div>
                  <label className="ms-3 mb-[10px] block text-base rounded-lg  sm:text-[20px] font-medium text-black">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="border text-base sm:text-[20px] px-2 py-[8px] h-[38px] rounded-sm border-[#898B90] items-center w-full"
                    required
                  />
                </div>
              </div>
              <div className="text-red-500 text-center text-base">{error}</div>

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
          </div>
        </div>
      </div>
    </Layout>
  );
};

const PaymentDetailV2 = (props: JSX.IntrinsicAttributes) => (
  <Elements stripe={STRIPE_PROMISE}>
    <PaymentForm {...props} />
  </Elements>
);

export default PaymentDetailV2;
