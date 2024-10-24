import RiveAnimation from "../../RiveAnimation";

const InputField = () => {

  return (
    <div className="w-full bottom-3">
      <div className="h-20">
        <RiveAnimation src="riv/V2/Typing_animation.riv" />
      </div>
      <div className="w-full flex items-center relative">
        <input
          className="w-full p-4 border-2 rounded-xl bg-[#F3EDE8] text-opacity-30 font-semibold"
          placeholder="Type your question... Meow it out!"
        />
        <button className="w-16 h-10 text-white bg-blue-600 outline-none border-none absolute right-2 border-2 rounded-xl">
          {"→"}
        </button>
      </div>
      <div className="w-full text-center font-semibold text-lg mt-4">
        Chat with a vet 24/7 for advice and consultations
      </div>
    </div>
  );
};

export default InputField;
