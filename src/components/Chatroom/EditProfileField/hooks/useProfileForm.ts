import { useState } from 'react';
import { useAppDispatch } from "../../../../Redux/hooks";
import { useNavigate } from "react-router-dom";
import { updateCatAsync } from "../../../../Redux/features/catsSlice";
import { setLoading } from "../../../../store/ui/actions";
import { ProfileInfo, PhotoData } from '../types';
import { INITIAL_PROFILE_STATE } from '../constants';

export const useProfileForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [photo, setPhoto] = useState<File>();
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

  const handleInputChange = (field: keyof ProfileInfo) => (value: string) => {
    setProfileInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleProfileUpdate = async () => {
    if (!isFormValid() || !photo) return;

    dispatch(setLoading(true));

    try {
      const arrayBuffer = await photo.arrayBuffer();
      const buffer = Array.from(new Uint8Array(arrayBuffer));

      const photoData: PhotoData = {
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
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    photo,
    profileInfo,
    handlePhotoChange,
    handleInputChange,
    handleProfileUpdate,
    isFormValid
  };
}; 