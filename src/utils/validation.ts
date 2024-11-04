import { UserInfo } from "./types";

export const validateEmail = (email: string): string => {
  if (!email) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Invalid email format";
  return "";
};

export const validateName = (name: string, fieldName: string): string => {
  if (!name.trim()) return `${fieldName} is required`;
  if (name.length < 2) return `${fieldName} must be at least 2 characters`;
  return "";
};

export const validatePassword = (password: string): string => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
  }
  return "";
};

export const validateUserInfo = (userInfo: UserInfo, isChecked: boolean) => {
  const errors = {
    first_name: validateName(userInfo.first_name, "First name"),
    last_name: validateName(userInfo.last_name, "Last name"),
    email: validateEmail(userInfo.email),
    password: validatePassword(userInfo.password),
    general: "",
  };

  if (!isChecked) {
    errors.general = "Please accept the Terms and Privacy Policy";
  }

  const isValid = !Object.values(errors).some(error => error !== "");
  return { isValid, errors };
}; 