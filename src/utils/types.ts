export interface TextInputProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  className?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface LogBtnByProps {
  src: string;
  alt: string;
  className?: string;
}

export interface ToggleProps {
  name?: string;
  value?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface UserInfo {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
