const PayMethodBtn = ({
  payBy,
  onClick,
}: {
  payBy: string;
  onClick: () => void;
}) => {
  return (
    <div>
      {payBy === "card" ? (
        <label className="block sm:hidden mb-3 ms-5 font-semibold sm:font-normal text-[16px] sm:text-[18px]">
          Credit or Debit Card
        </label>
      ) : (
        <label className="block sm:hidden mb-3 ms-5 font-semibold sm:font-normal text-[16px] sm:text-[18px]">PayPal</label>
      )}
      <div className="h-[55px] w-full border border-[#898B90] rounded-lg flex justify-between items-center ps-5 pe-2">
        {payBy === "card" ? (
          <label className="hidden sm:block text-[18px]">
            Credit or Debit Card
          </label>
        ) : (
          <label className="hidden sm:block text-[18px]">PayPal</label>
        )}
        <div className="flex gap-4 items-center">
          {payBy === "card" ? (
            <>
              <img src="/assets/svg/visa.svg" alt="Visa" />
              <img src="/assets/svg/master.svg" alt="Mastercard" />
            </>
          ) : (
            <img src="/assets/svg/paypal.svg" alt="Visa" />
          )}
        </div>
        <button
          className="top-1/2 bg-[#0061EF] hover:bg-blue-700 active:bg-blue-800 focus:outline-none h-10 w-16 flex items-center justify-center rounded-xl"
          onClick={onClick}
        >
          <img src="/assets/svg/arrow.svg" alt="Mastercard" />
        </button>
      </div>
    </div>
  );
};

export default PayMethodBtn;
