import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
import { fetchOrCreatePlan } from "../../services/api";
import { useAppSelector } from "../../Redux/hooks";
import { RootState } from "../../Redux/store";

interface SubscriberDetails {
  name: {
    given_name: string;
    surname: string;
  };
  email_address: string;
  shipping_address: {
    name: {
      full_name: string;
    };
    address: {
      address_line_1: string;
      address_line_2?: string;
      admin_area_2: string;
      admin_area_1: string;
      postal_code: string;
      country_code: string;
    };
  };
}

const PayPalSubscriptionBtn: React.FC = () => {
  const [planId, setPlanId] = useState<string | null>(null);
  const billingOption = useAppSelector((state: RootState) => state.billing);

  useEffect(() => {
    const payPeriod = billingOption.method ? "Annual" : "Monthly";
    (async () => {
      try {
        const id = await fetchOrCreatePlan(payPeriod);
        setPlanId(id);
      } catch (error) {
        console.error("Error fetching or creating plan:", error);
      }
    })();
  }, []);

  // Handle subscription approval
  const handleApprove = async (_data: any, actions: any) => {
    try {
      const subscriptionDetails = await actions.subscription.get();
      console.log("Subscription approved:", subscriptionDetails);

      // Optionally, send subscription details to your backend for processing
      const subscriberDetails : SubscriberDetails = {
        name: subscriptionDetails.subscriber.name,
        email_address: subscriptionDetails.subscriber.email_address,
        shipping_address: subscriptionDetails.subscriber.shipping_address,
      };
      // await axios.post(`${backendURL}/create-subscription`, {
      //   planId,
      //   subscriberDetails,
      // });
      console.log("@#@#@#@#@#@#@", subscriberDetails);
      
    } catch (error) {
      console.error("Error during subscription approval:", error);
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId: import.meta.env.VITE_CLIENT_ID,
        vault: true, 
        components: "buttons",
      }}
    >
      {planId ? (
        <PayPalButtons
          createSubscription={(_data, actions) => {
            return actions.subscription.create({
              plan_id: planId,
            });
          }}
          onApprove={handleApprove}
          onError={(error: any) => console.error("PayPal error:", error)}
          style={{
            layout: "vertical",
            shape: "rect",
            label: "subscribe",
          }}
          fundingSource={FUNDING.PAYPAL}
        />
      ) : (
        <p className="text-center">Loading PayPal Button...</p>
      )}
    </PayPalScriptProvider>
  );
};
export default PayPalSubscriptionBtn;
