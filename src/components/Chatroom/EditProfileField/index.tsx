import KittyLogo from "/assets/svg/KittyLogo.svg";
import { useAppSelector, useAppDispatch } from "../../../Redux/hooks";
import { Message } from "../../../utils/types";
import { useEffect } from "react";
import { updateConversationAsync } from "../../../Redux/features/chatSlice";
import CustomDropdown from "./CustomDropdown";
import CustomInput from "./CustomInput";
import CustomTextArea from "./CustomTextArea";

export type MsgType = Message;

const EditProfileField = () => {
  const { messages, isLoading, needsSync, error } = useAppSelector(
    (state) => state.chat
  );
  const breedOption = ["Persian", "Siamese", "Maine Coon", "Ragdoll"];
  const genderOption = ["Male", "Female"];
  const colorOption = ["White", "Black", "Gray", "Brown", "Red", "Blue"];
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (needsSync && messages.length > 0) {
      dispatch(updateConversationAsync({ messages }));
    }
  }, [needsSync, messages, dispatch]);

  return (
    <div className="max-w-full sm:w-[1130px] p-4 pb-6 mx-auto">
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <div className="w-full h-[120px] flex justify-center items-center">
        <div>
          <a href="/">
            <img src={KittyLogo} alt="KittyLogo" />
          </a>
        </div>
      </div>
      <div className="border-2 border-black rounded-lg p-4 flex-1">
        <div>
          <h2 className="text-4xl font-bold capitalize text-center">
            Edit Profile
          </h2>
          <h5 className="text-2xl font-medium text-center w-[400px] m-auto">
            Update your details to keep your profile current.
          </h5>
        </div>
        <div className="flex justify-between gap-[30px]">
          <div>
            <div className="w-[442px] flex flex-col gap-4 justify-center">
              <label className="text-xl font-semibold self-stretch text-center m-auto">
                Add Photo
              </label>
              <div className="w-[442px] h-[415px] relative">
                <div className="w-full h-full flex flex-col justify-center items-center bg-[#D1D6E2] bg-opacity-30 border-2 border-dashed rounded-[20px] border-[#898B90] border-opacity-30 self-stretch">
                  <div className="m-3">
                    <img
                      className="w-full h-full"
                      src="/assets/svg/upload.svg"
                      alt="upload"
                    />
                  </div>
                  <div className="text-xl font-medium m-1">Upload photo</div>
                  <div className="text-base font-medium opacity-60">
                    At least 256px X 256px
                  </div>
                  <div className="text-base font-medium opacity-60">
                    PNG or JPG
                  </div>
                </div>
                <div className="w-full h-full opacity-0 absolute top-0 left-0">
                  <input className="w-full h-full" type="file" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-2 gap-[30px]">
              <CustomInput
                label="Name"
                value=""
                onChange={() => {}}
                placeholder="Enter your name"
              />
              <CustomDropdown
                label="Breed"
                options={breedOption}
                selectedOption=""
                onSelect={() => {}}
                placeholder="Select a breed"
              />
              <CustomDropdown
                label="Gender"
                options={genderOption}
                selectedOption=""
                onSelect={() => {}}
                placeholder="Select gender"
              />
              <CustomDropdown
                label="Color"
                options={colorOption}
                selectedOption=""
                onSelect={() => {}}
                placeholder="Select a color"
              />
              <CustomTextArea
                label="Medical History"
                value=""
                onChange={() => {}}
                placeholder="Enter medical History"
              />
              <CustomTextArea
                label="Enter Dietary Preferences"
                value=""
                onChange={() => {}}
                placeholder="Enter Dietary Preferences"
              />
            </div>
            <div></div>
          </div>
        </div>
        <div className="flex gap-[30px] justify-end">
          <button className="h-[55px] px-[42px] py-[14px] justify-center items-center rounded-[20px] border text-[#898B90] bg-[#D1D6E2]">
            Save Profile
          </button>
          <button className="h-[55px] px-[42px] py-[14px] justify-center items-center rounded-[20px] border border-[#898B90] text-[#898B90]">
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileField;
