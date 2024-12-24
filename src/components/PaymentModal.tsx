import React, { useEffect, useState } from 'react';
import { useMediaQuery } from "react-responsive";
import ReactPixel from "react-facebook-pixel";

import { useAppDispatch } from "../Redux/hooks";
import { updateBillingOption } from "../Redux/features/billingSlice";

import PayMethodBtn from './Payments/PayMethodBtn';
// import PayPalSubscriptionBtn from './Payments/PayPalSubscriptionBtn';
import PaymentDetailV2 from '../pages/PaymentDetailV2';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
    const [showCardFields, setShowCardFields] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isMobile) {
            dispatch(updateBillingOption({ method: false }));
        }
    }, [isMobile, dispatch]);

    useEffect(() => {
        const checkSubscriptionStatus = () => {
            const subscriptionId = localStorage.getItem('subscriptionId');
            setIsSuccess(!!subscriptionId && subscriptionId !== 'null');
        };

        ReactPixel.track("InitiateCheckout");
        checkSubscriptionStatus();

        // Listen for changes in localStorage
        window.addEventListener('storage', checkSubscriptionStatus);

        return () => {
            window.removeEventListener('storage', checkSubscriptionStatus);
        };
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className={`bg-white rounded-3xl p-6 shadow-lg w-[380px] md:max-w-xl md:w-full transition-all duration-300 h-auto`}>
                {!isSuccess ? (
                    <>
                        {!showCardFields ? (
                            <div className="w-full h-full flex flex-col items-center justify-between">
                                <div className="text-center">
                                    <h2 className="text-[22px] sm:text-[36px] font-semibold mb-6">
                                        3-Day Access for $0
                                    </h2>
                                    <div className="text-base sm:text-lg font-medium mb-4">
                                        Unlock all the exclusive features of KittyCare <b>at zero cost</b> to you for the first three days. $49.99 per month once your trial has expired.
                                    </div>
                                </div>

                                <div className="w-full h-full flex flex-col justify-between gap-[20px]">
                                    <PayMethodBtn onClick={() => setShowCardFields(true)} />
                                    {/* <PayPalSubscriptionBtn /> */}
                                    <div>
                                        <div className="text-[14px] font-semibold opacity-60 text-center">
                                            Applicable VAT, sales or other applicable taxes may apply.
                                            Cancel anytime.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <PaymentDetailV2 onClose={onClose} />
                        )}
                    </>
                ) : (
                    <div className="mt-4 text-center">
                        <p className="text-lg">Thank you for your purchase!</p>
                        <button onClick={onClose} className="mt-4 text-[#FAF6F3] font-semibold text-[18px] w-auto px-3 py-2 md:h-[55px] items-center text-center border-[#898B90] border rounded-xl bg-[#0061EF]">Confirm Subscription</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentModal;
