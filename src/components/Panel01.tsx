

interface Panel01Props {
  nextStep: () => void;
}

const Panel01: React.FC<Panel01Props> = ({ nextStep }) => {
  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen p-4 globalBackground">
      <div className="w-full max-w-4xl mx-auto relative">
        {/* <div className="hidden custom-lg:flex absolute top-2 right-[-230px] bg-lightWhite mt-2 rounded-3xl h-auto w-[350px] flex-col items-center border-2 borderGrey">
          <h2 className="bg-primaryYellow text-black text-lg rounded-b-[20px] px-10 h-[35px] text-center font-semibold">
            Message
          </h2>
          <p className="text-sm leading-[28px] text-center w-[300px] mx-12 my-6">
            Your cat’s journey to better health, happiness, and well-being
            starts now. We’ve tailored a plan just for your cat, and you'll
            receive ongoing tips and insights to keep them thriving!
          </p>
        </div> */}

        <div className="flex flex-col items-center justify-center w-[486.08px] h-[107px] mt-8 mx-auto">
          <h1 className="text-2xl font-bold text-black font-inter">
            Welcome To The Feline Family!
          </h1>

          <p className="text-md font-light text-center px-5 py-3">
            Thank you for subscribing! 🎉 You’re now part of the best feline
            companion community. We’re excited to help you and your cat achieve
            all your goals!
          </p>
        </div>

        <div className="mt-10 rounded-3xl max-w-md mx-auto h-[270px] flex flex-col justify-start items-center border-2 border-lightGray bg-[url('/assets/White-paw.png')] bg-no-repeat bg-right-bottom">
          <h2 className="bg-primaryOrange text-black text-lg rounded-b-2xl font-semibold py-2 px-5 w-[249px] h-[47px] text-center">
            Feature Highlights
          </h2>
          <h2 className="text-center mt-4 font-semibold">
            Here’s what you’ll get with your subscription
          </h2>

          <ul className="mt-4 space-y-3 w-full max-w-md flex flex-col items-center">
            <li className="flex items-start w-full max-w-sm">
              <img src="/assets/Frame.png" alt="Checkbox" className="w-6 h-6" />
              <span className="ml-4">
                Unlimited access to personalized advice
              </span>
            </li>
            <li className="flex items-start w-full max-w-sm">
              <img src="/assets/Frame.png" alt="Checkbox" className="w-6 h-6" />
              <span className="ml-4">
                Health and training guidance tracking
              </span>
            </li>
            <li className="flex items-start w-full max-w-sm">
              <img src="/assets/Frame.png" alt="Checkbox" className="w-6 h-6" />
              <span className="ml-4">Exclusive tips and expert support</span>
            </li>
            <li className="flex items-start w-full max-w-sm">
              <img src="/assets/Frame.png" alt="Checkbox" className="w-6 h-6" />
              <span className="ml-4">
                Early access to new features and content
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-lightOrange flex-col justify-center items-center mt-1 rounded-3xl max-w-md mx-auto h-auto flex border-2 px-10 py-10 border-lightGray">
          <p className="text-black text-lg">
            Get started by answering a few questions. This will help us create
            your personalized dashboard.
          </p>
        </div>

        <div className="flex justify-center mt-10">
          <button onClick={nextStep} className="bg-primaryBlue text-white px-8 py-3 rounded-2xl hover:bg-opacity-90">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Panel01;

