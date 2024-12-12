import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js";

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
  const [subscriberDetails, setSubscriberDetails] = useState<SubscriberDetails | null>(null);

  const handleApprove = async (_data: any, actions: any) => {
    try {
      // Fetch the subscription details after approval
      const details = await actions.subscription.get();

      // Extract and type the subscriber details
      const subscriberInfo: SubscriberDetails = {
        name: details.subscriber.name,
        email_address: details.subscriber.email_address,
        shipping_address: details.subscriber.shipping_address,
      };

      // Update state
      setSubscriberDetails(subscriberInfo);
      console.log("Subscription approved! Subscriber details:", subscriberInfo);
    } catch (error) {
      console.error("Error fetching subscription details:", error);
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
      <div>
        <PayPalButtons
          createSubscription={(_data, actions) => {
            return actions.subscription.create({
              plan_id: "P-5ML4271244454362WXNWU5NQ", // Replace with your Plan ID
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
      </div>
    </PayPalScriptProvider>
  );
};
export default PayPalSubscriptionBtn;
