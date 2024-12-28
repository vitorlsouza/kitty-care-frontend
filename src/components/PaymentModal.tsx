import React, { useEffect, useState, useCallback } from 'react';
import { useMediaQuery } from "react-responsive";
import ReactPixel from "react-facebook-pixel";
import { useRive, UseRiveParameters } from '@rive-app/react-canvas';

import { useAppDispatch } from "../Redux/hooks";
import { updateBillingOption } from "../Redux/features/billingSlice";

import PayMethodBtn from './Payments/PayMethodBtn';
import PayPalSubscriptionBtn from './Payments/PayPalSubscriptionBtn';
import PaymentDetailV2 from '../pages/PaymentDetailV2';
import styles from './LoadingOverlay/LoadingOverlay.module.css';

const RIVE_ANIMATION_CONFIG: UseRiveParameters = {
    src: 'riv/V2/Pulse_kitty.riv',
    autoplay: true,
};

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
    const [showCardFields, setShowCardFields] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const dispatch = useAppDispatch();
    const { RiveComponent } = useRive(RIVE_ANIMATION_CONFIG);
    const isPhone = window.innerWidth < 768;

    const playMeow = useCallback(() => {
        const audio = new Audio('/assets/sounds/meow.mp3');
        audio.play().catch(error => console.log('Audio playback failed:', error));
    }, []);

    useEffect(() => {
        if (isMobile) {
            dispatch(updateBillingOption({ method: false }));
        }
    }, [isMobile, dispatch]);

    useEffect(() => {
        const checkSubscriptionStatus = () => {
            const subscriptionId = localStorage.getItem('subscriptionId');
            const isNewSuccess = !!subscriptionId && subscriptionId !== 'null';
            if (isNewSuccess && !isSuccess) {
                playMeow();
            }
            setIsSuccess(isNewSuccess);
        };

        ReactPixel.track("InitiateCheckout");
        console.log('ReactPixel.track("InitiateCheckout");');
        checkSubscriptionStatus();

        window.addEventListener('storage', checkSubscriptionStatus);

        return () => {
            window.removeEventListener('storage', checkSubscriptionStatus);
        };
    }, [isSuccess, playMeow]);

    if (!isOpen) return null;

    const handleClose = () => {
        setShowCardFields(false);
    };

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
                                    <PayPalSubscriptionBtn onClose={() => setIsSuccess(true)} />
                                    <div>
                                        <div className="text-[14px] font-semibold opacity-60 text-center">
                                            Applicable VAT, sales or other applicable taxes may apply.
                                            Cancel anytime.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <PaymentDetailV2 onCancel={handleClose} onClose={() => setIsSuccess(true)} />
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className={`${styles.animationContainer} mx-auto h-[200px] ${isPhone ? 'hidden' : ''}`}>
                            {RiveComponent && <RiveComponent />}
                        </div>
                        <div className="text-center space-y-6">
                            <h3 className="text-2xl font-bold text-primaryBlue">
                                Purr-fect! 🐱
                            </h3>
                            <p className="text-lg text-gray-700">
                                Thank you for joining KittyCare! Your cat's wellness journey begins now.
                            </p>
                            <button
                                onClick={onClose}
                                className="mt-4 w-full md:w-auto px-8 py-3 text-white font-semibold text-lg 
                                         bg-primaryBlue hover:bg-blue-700 
                                         rounded-xl transition-colors duration-200
                                         shadow-lg hover:shadow-xl
                                         transform hover:-translate-y-0.5"
                            >
                                Start My Journey
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentModal;
