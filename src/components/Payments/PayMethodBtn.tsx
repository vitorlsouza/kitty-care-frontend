const PayMethodBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="cursor-pointer hover:shadow-sm active:shadow-lg" onClick={onClick}>
      <div className="h-[55px] w-full border border-[#898B90] rounded-lg flex justify-between items-center ps-5 pe-2">
        <label className="hidden sm:block text-[18px]">
          Credit or Debit Card
        </label>
        <div className="flex gap-4 items-center">
          <img src="/assets/svg/visa.svg" alt="Visa" />
          <img src="/assets/svg/master.svg" alt="Mastercard" />
        </div>
        <button className="top-1/2 bg-[#0061EF] hover:bg-blue-700 active:bg-blue-800 focus:outline-none h-10 w-16 flex items-center justify-center rounded-xl">
          <img src="/assets/svg/arrow.svg" alt="Mastercard" />
        </button>
      </div>
    </div>
  );
};

export default PayMethodBtn;
