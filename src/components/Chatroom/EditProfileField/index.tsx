import KittyLogo from "/assets/svg/KittyLogo.svg";
import { Message } from "../../../utils/types";
import { useState } from "react";
import CustomDropdown from "./CustomDropdown";
import CustomInput from "./CustomInput";
import CustomTextArea from "./CustomTextArea";

export type MsgType = Message;

const EditProfileField = () => {
  const [avatar, setAvatar] = useState<File | undefined>();
  const [profileInfo, setProfileInfo] = useState({
    name: "",
    breed: "",
    gender: "",
    color: "",
    medicalHistory: "",
    dietaryPreferences: "",
  });
  const breedOption = [
    "Domestic shorthair",
    "Domestic longhair",
    "Maine coon",
    "Siamese",
    "Persian",
    "Bengal",
    "Other/Unkown",
  ];
  const genderOption = ["Male", "Female"];
  const colorOption = ["White", "Black", "Gray", "Brown", "Red", "Blue"];

  const changeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const checkValidate = () => {
    if (
      avatar === undefined ||
      profileInfo.name === "" ||
      profileInfo.breed === "" ||
      profileInfo.gender === "" ||
      profileInfo.color === "" ||
      profileInfo.medicalHistory === "" ||
      profileInfo.dietaryPreferences === ""
    ) {
      return false;
    }
    return true;
  };

  const saveProfile = () => {
    console.log(profileInfo);
  };

  return (
    <div className="max-w-full sm:w-[1130px] p-4 pb-6 mx-auto">
      <div className="w-full h-[120px] flex justify-center items-center">
        <div>
          <a href="/">
            <img src={KittyLogo} alt="KittyLogo" />
          </a>
        </div>
      </div>
      <div className="flex-1">
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
                {avatar ? (
                  <img
                    className="h-full w-full rounded-[20px]"
                    src={URL.createObjectURL(avatar)}
                    alt="avatar"
                  />
                ) : (
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
                )}
                <div className="w-full h-full opacity-0 absolute top-0 left-0">
                  <input
                    className="w-full h-full"
                    type="file"
                    onChange={changeAvatar}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-2 gap-[30px]">
              <CustomInput
                label="Name"
                value={profileInfo.name}
                onChange={(e) => setProfileInfo({ ...profileInfo, name: e })}
                placeholder="Enter your name"
              />
              <CustomDropdown
                label="Breed"
                options={breedOption}
                selectedOption={profileInfo.breed}
                onSelect={(e) => setProfileInfo({ ...profileInfo, breed: e })}
                placeholder="Select a breed"
              />
              <CustomDropdown
                label="Gender"
                options={genderOption}
                selectedOption={profileInfo.gender}
                onSelect={(e) => setProfileInfo({ ...profileInfo, gender: e })}
                placeholder="Select gender"
              />
              <CustomDropdown
                label="Color"
                options={colorOption}
                selectedOption={profileInfo.color}
                onSelect={(e) => setProfileInfo({ ...profileInfo, color: e })}
                placeholder="Select a color"
              />
              <CustomTextArea
                label="Medical History"
                value={profileInfo.medicalHistory}
                onChange={(e) =>
                  setProfileInfo({ ...profileInfo, medicalHistory: e })
                }
                placeholder="Enter medical History"
              />
              <CustomTextArea
                label="Enter Dietary Preferences"
                value={profileInfo.dietaryPreferences}
                onChange={(e) =>
                  setProfileInfo({ ...profileInfo, dietaryPreferences: e })
                }
                placeholder="Enter Dietary Preferences"
              />
            </div>
            <div></div>
          </div>
        </div>
        <div className="flex gap-[30px] justify-end">
          <button
            className={`h-[55px] px-[42px] py-[14px] justify-center items-center rounded-[20px] border  ${
              checkValidate() ? "bg-blue-500 text-[#ffffff] hover:bg-blue-600 active:bg-blue-700" : "bg-[#D1D6E2] text-[#898B90]"
            }`}
            onClick={saveProfile}
          >
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
