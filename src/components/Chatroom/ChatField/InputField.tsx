import RiveAnimation from "../../RiveAnimation";
import { HiOutlineArrowRight } from "react-icons/hi2";

const InputField = () => {

  return (
    <div className="w-full bottom-10">
      <div className="h-20">
        <RiveAnimation src="riv/V2/Typing_animation.riv" />
      </div>
      <div className="w-full flex items-center relative">
        <input
          className="w-full p-6 border-2 rounded-xl bg-[#F3EDE8] text-opacity-30 font-semibold focus:outline-none"
          placeholder="Type your question... Meow it out!"
        />
        <button
          className="w-20 h-14 text-white bg-blue-600 hover:bg-blue-400 active:bg-purple-700 outline-none border-none absolute right-3 border-2 rounded-xl flex justify-center items-center"
          onClick={() => {}}
        >
          <HiOutlineArrowRight className="text-2xl" />
        </button>
      </div>
      <div className="w-full text-center font-semibold text-lg mt-4">
        Chat with a vet 24/7 for advice and consultations
      </div>
    </div>
  );
};

export default InputField;
