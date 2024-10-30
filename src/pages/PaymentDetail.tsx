import { useState } from "react";
import SwitchMethod from "../components/Payments/SwitchMethod";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentDetail = () => {
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
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        lineHeight: "24px",
        "::placeholder": {
          color: "#aab7c4",
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
    <div>
      <div className="flex flex-col sm:flex-row sm:px-[332px] justify-between">
        <div className="m-auto sm:m-0 w-[359px] sm:w-[432px] max-w-[90%]">
          <SwitchMethod />
        </div>
        <div className="m-auto sm:m-0 my-2">
          <div className="w-[343px] px-[21px] py-[47px] sm:w-[610px] sm:px-[85px] sm:py-[100px] h-auto bg-white border-2 rounded-3xl border-[#B8B8B8]">
            <form onSubmit={handleSubmit}>
              <CardElement options={cardElementOptions} />
              <button
                disabled={!stripe || isLoading}
                className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg"
              >
                {isLoading ? "Processing..." : "Pay Now"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetail;
