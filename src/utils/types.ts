export interface UserState {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  isAuthenticated: boolean;
  status: string;
  error: string;
}

export interface BillingState {
  method: boolean;
  price: number;
  daily: number;
  monthly: number;
  yearly: number;
  trustOption: boolean;
  nostringOption: boolean;
  saveOption: boolean;
  status: string;
  error: string;
}

export interface PlanState {
  plan: string;
  end_date: string;
  provider: string;
}

export interface SignupState {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface LoginState {
  email: string;
  password: string;
}

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

export interface ApplePayButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export interface PriceSelectBoxProps {
  checked: boolean;
  method: boolean;
  annual?: number;
  monthly?: number;
  daily?: number;
  isBest: boolean;
}
