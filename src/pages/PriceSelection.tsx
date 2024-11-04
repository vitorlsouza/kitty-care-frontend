import PriceSelectBox from "../components/Payments/PriceSelectBox";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { RootState } from "../Redux/store";
import { changeMethod, removePlanAsync } from "../Redux/features/billingSlice";
import { useEffect } from "react";

const PriceSelection = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const subscriptionId = localStorage.getItem("subscriptionId");
    if (subscriptionId) {
      navigate("/cat-assistant");
    }

    const urlParams = new URLSearchParams(window.location.search);
    const planSelection = urlParams.get('planSelection');

    if (planSelection) {
      const isYearly = planSelection.toLowerCase() === "yearly";
      dispatch(changeMethod({ method: isYearly }));

      navigate("/paymentmethod?");
    }
  }, [dispatch, navigate]);

  const billingOption = useAppSelector((state: RootState) => state.billing);

  const handleSubmit = () => {
    navigate("/paymentmethod");
  };

  const handleChecked = (value: boolean) => {
    dispatch(changeMethod({ method: value }));
  };

  const handleCancel = () => {
    dispatch(removePlanAsync());
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-[90%] m-auto flex flex-col gap-10">
        <div>
          <div className="text-[16px] sm:text-[18px] text-center font-semibold opacity-60">
            Your Cat's Wellness, Purrfected.
          </div>
          <div className="text-[30px] sm:text-[40px] text-center font-semibold capitalize">
            Care For Your Cat, Care For Yourself
          </div>
          <div className="text-[16px] sm:text-[18px] text-center font-medium w-[425px] m-auto opacity-60">
            Simplify cat care, reduce stress, and enjoy a happier bond with
            KittyCare
          </div>
        </div>
        <div className="w-full flex flex-col gap-8">
          <div className="w-full sm:w-[1000px] flex flex-col sm:flex-row gap-8 m-auto">
            <div className="w-full" onClick={() => handleChecked(true)}>
              <PriceSelectBox
                checked={billingOption.method}
                method={true}
                isBest={true}
                annual={billingOption.yearly}
                daily={billingOption.daily}
              />
            </div>
            <div className="w-full" onClick={() => handleChecked(false)}>
              <PriceSelectBox
                checked={!billingOption.method}
                method={false}
                isBest={false}
                monthly={billingOption.monthly}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-[14px] sm:text-[18px] text-center font-semibold">
              After your free trial, the{" "}
              {billingOption.method ? "annual" : "monthly"} subscription is{" "}
              <b>
                $
                {billingOption.method
                  ? billingOption.yearly
                  : billingOption.monthly}{" "}
                USD
              </b>{" "}
              and automatically renews each {billingOption.method ? "year" : "month"}.
            </div>
            <div className="text-[16px] sm:text-[18px] text-center font-semibold text-[#0061EF]">
              <span>
                <a href="#">Terms & Conditions</a>
              </span>{" "}
              <span className="hidden sm:inline">-</span>{" "}
              <span className="block sm:inline" onClick={handleCancel}>Cancel Anytime</span>
            </div>
          </div>
        </div>
        <div className="w-full">
          <button
            className="w-full sm:w-auto h-[55px] px-[42px] py-[14px] flex justify-center items-center rounded-[8px] sm:rounded-[20px] bg-[#0061EF] text-[18px] font-semibold text-[#FAF6F3] capitalize m-auto"
            onClick={handleSubmit}
          >
            Start Your Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceSelection;
