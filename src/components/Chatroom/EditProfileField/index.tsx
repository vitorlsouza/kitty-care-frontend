import KittyLogo from "/assets/svg/KittyLogo.svg";
import { useState } from "react";
import CustomDropdown from "./CustomDropdown";
import CustomInput from "./CustomInput";
import CustomTextArea from "./CustomTextArea";
import CancelModal from "./CancelModal";
import { useAppDispatch } from "../../../Redux/hooks";
import { updateCatAsync } from "../../../Redux/features/catsSlice";
import { useNavigate } from "react-router-dom";

// Types
interface ProfileInfo {
  name: string;
  breed: string;
  gender: string;
  target_weight: string;
  medical_history: string;
  dietary_restrictions: string;
}

// Constants
const BREED_OPTIONS = [
  "Domestic shorthair",
  "Domestic longhair",
  "Maine coon",
  "Siamese",
  "Persian",
  "Bengal",
  "Other/Unkown",
] as string[];

const GENDER_OPTIONS = ["Male", "Female"] as string[];

const INITIAL_PROFILE_STATE: ProfileInfo = {
  name: "",
  breed: "",
  gender: "",
  target_weight: "",
  medical_history: "",
  dietary_restrictions: "",
};

const EditProfileField = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [photo, setPhoto] = useState<File>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>(INITIAL_PROFILE_STATE);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const isFormValid = (): boolean => {
    return !!(
      photo &&
      Object.values(profileInfo).every(value => value.trim() !== "")
    );
  };

  const handleProfileUpdate = async () => {
    if (!isFormValid() || !photo) return;

    try {
      const arrayBuffer = await photo.arrayBuffer();
      const buffer = Array.from(new Uint8Array(arrayBuffer));

      const photoData = {
        buffer,
        mimetype: photo.type,
        originalname: photo.name
      };

      await dispatch(updateCatAsync({
        data: { ...profileInfo, photo: photoData }
      })).unwrap();

      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to update cat profile:', error);
    }
  };

  const handleInputChange = (field: keyof ProfileInfo) => (value: string) => {
    setProfileInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleCancelSubscription = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-full sm:w-[1130px] p-2 pb-6 mx-auto">
      <header className="w-full h-[120px] flex justify-center items-center">
        <a href="/dashboard">
          <img src={KittyLogo} alt="KittyLogo" />
        </a>
      </header>

      <main className="px-4">
        <section className="text-center mb-6">
          <h2 className="text-4xl font-bold capitalize mb-4">Edit Profile</h2>
          <h5 className="text-2xl font-medium w-full sm:w-[400px] mx-auto">
            Update your details to keep your profile current.
          </h5>
        </section>

        <section className="flex flex-col sm:flex-row justify-between gap-[30px] my-6">
          {/* Photo Upload Section */}
          <div className="w-full sm:w-[442px] m-auto flex flex-col gap-4">
            <label className="text-xl font-semibold text-center">Add Photo</label>
            <div className="w-full sm:w-[442px] h-[415px] relative">
              {photo ? (
                <img
                  className="h-full w-full rounded-[20px] object-cover"
                  src={URL.createObjectURL(photo)}
                  alt="Selected cat"
                />
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center bg-[#D1D6E2] bg-opacity-30 border-2 border-dashed rounded-[20px] border-[#898B90] border-opacity-30">
                  <img
                    className="m-3"
                    src="/assets/svg/upload.svg"
                    alt="upload icon"
                  />
                  <p className="text-xl font-medium m-1">Upload photo</p>
                  <p className="text-base font-medium opacity-60">At least 256px X 256px</p>
                  <p className="text-base font-medium opacity-60">PNG or JPG</p>
                </div>
              )}
              <input
                className="w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </div>
          </div>

          {/* Form Fields Section */}
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[30px]">
              <CustomInput
                label="Name"
                value={profileInfo.name}
                onChange={handleInputChange('name')}
                placeholder="Enter your name"
              />
              <CustomDropdown
                label="Breed"
                options={BREED_OPTIONS}
                selectedOption={profileInfo.breed}
                onSelect={handleInputChange('breed')}
                placeholder="Select a breed"
              />
              <CustomDropdown
                label="Gender"
                options={GENDER_OPTIONS}
                selectedOption={profileInfo.gender}
                onSelect={handleInputChange('gender')}
                placeholder="Select gender"
              />
              <CustomInput
                label="Target Weight"
                value={profileInfo.target_weight}
                type="number"
                onChange={handleInputChange('target_weight')}
                placeholder="Enter target weight"
              />
              <CustomTextArea
                label="Medical History"
                value={profileInfo.medical_history}
                onChange={handleInputChange('medical_history')}
                placeholder="Enter medical history"
              />
              <CustomTextArea
                label="Dietary Restrictions"
                value={profileInfo.dietary_restrictions}
                onChange={handleInputChange('dietary_restrictions')}
                placeholder="Enter dietary preferences"
              />
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex gap-[10px] sm:gap-[30px] justify-start flex-col sm:flex-row-reverse">
          <button
            className={`h-[55px] px-[42px] py-[14px] rounded-[20px] border
              ${isFormValid()
                ? "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700"
                : "bg-[#D1D6E2] text-[#898B90]"
              }`}
            onClick={handleProfileUpdate}
          >
            Save Profile
          </button>
          <button
            className="h-[55px] px-[42px] py-[14px] rounded-[20px] border border-[#898B90] text-[#898B90] hover:bg-[#dddddd]/70 active:bg-[#cccccc]"
            onClick={() => setIsModalOpen(true)}
          >
            Cancel Subscription
          </button>
        </div>
      </main>

      <CancelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCancelSubscription}
      />
    </div>
  );
};

export default EditProfileField;
