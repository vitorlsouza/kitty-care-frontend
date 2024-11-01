const KittyLogo = () => {
  return (
    <div
      className="w-[150px] h-[30px] sm:w-[200px] sm:h-[40px] my-[6vh] sm:mt-[3vh] m-auto relative "
      data-id="mainLY"
    >
      <a href="/dashboard">
        <img
          className="w-full h-full"
          src="/assets/svg/KittyLogo.svg"
          alt="kitty logo"
        />
      </a>
    </div>
  );
};

export default KittyLogo;
