export interface TextInputProps {
  label: string;
  type: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface LogBtnByProps {
  src: string;
  alt: string;
  className?: string;
}