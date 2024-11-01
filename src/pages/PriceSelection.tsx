import { useState } from "react";
import PriceSelectBox from "../components/Payments/PriceSelectBox";
import { useNavigate } from "react-router-dom";

const PriceSelection = () => {
  const [checked, setChecked] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/paymentmethod");
  }

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
            <div className="w-full" onClick={() => setChecked(true)}>
              <PriceSelectBox
                checked={checked}
                method={true}
                isBest={true}
                annual={359.99}
                daily={0.98}
              />
            </div>
            <div className="w-full" onClick={() => setChecked(false)}>
              <PriceSelectBox
                checked={!checked}
                method={false}
                isBest={false}
                monthly={49.99}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-[14px] sm:text-[18px] text-center font-semibold">
              After your free trial, the annual subscription is{" "}
              <b>$359.99 USD</b> and automatically renews each year.
            </div>
            <div className="text-[16px] sm:text-[18px] text-center font-semibold text-[#0061EF]">
              <span>
                <a href="#">Terms & Conditions</a>
              </span>{" "}
              <span className="hidden sm:inline">-</span>{" "}
              <span className="block sm:inline">Cancel Anytime</span>
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
