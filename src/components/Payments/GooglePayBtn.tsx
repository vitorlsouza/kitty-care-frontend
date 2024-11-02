import GooglePayButton from "@google-pay/button-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../Redux/hooks";
import { RootState } from "../../Redux/store";

const GooglePayBtn = () => {
  const billingOption = useAppSelector((state: RootState) => state.billing);

  const navigate = useNavigate();

  const handleGooglePayPayment = (paymentData: any) => {
    console.log("Success", paymentData);
    navigate("/progress");
  };
  return (
    <GooglePayButton
      environment={"TEST"}
      paymentRequest={{
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: "CARD",
            parameters: {
              allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
              allowedCardNetworks: ["MASTERCARD", "VISA"],
            },
            tokenizationSpecification: {
              type: "PAYMENT_GATEWAY",
              parameters: {
                gateway: "example",
                gatewayMerchantId: "exampleGatewayMerchantId",
              },
            },
          },
        ],
        merchantInfo: {
          merchantId: "12345678901234567890",
          merchantName: "Demo Merchant",
        },
        transactionInfo: {
          totalPriceStatus: "FINAL",
          totalPrice: billingOption.method
            ? billingOption.yearly.toString()
            : billingOption.monthly.toString(),
          currencyCode: "USD",
        },
      }}
      onLoadPaymentData={handleGooglePayPayment}
      className="w-full"
      buttonColor="white"
      buttonType="subscribe"
      buttonSizeMode="fill"
    />
  );
};

export default GooglePayBtn;