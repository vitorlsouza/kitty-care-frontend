export const VALIDATION_PATTERNS = {
    COUNTRY: /^[A-Za-z\s]+$/,
    ZIP_CODE: /^[a-zA-Z0-9\s]+$/,
  };
  
  export const ERROR_MESSAGES = {
    GENDER_REQUIRED: "Please select your cat's gender",
    AGE_REQUIRED: "Please enter your cat's age",
    AGE_INVALID: "Age must be a number greater than zero",
    COUNTRY_REQUIRED: "Please enter your country",
    COUNTRY_INVALID: "Country must not contain numbers or special characters",
    ZIP_REQUIRED: "Please enter a zip/postal code",
    ZIP_INVALID: "Zip code must be alphanumeric",
    BREED_REQUIRED: "Please select your cat's breed",
    WEIGHT_INVALID: "Please enter a valid weight for your cat (e.g., 8.5)",
    UNIT_REQUIRED: "Please select the weight unit",
    TARGET_WEIGHT_INVALID: "Please enter a valid target weight (e.g., 8.5)",
  };
  
  export const STORAGE_KEYS = {
    GENDER: 'gender',
    AGE: 'age',
    COUNTRY: 'country',
    ZIP_CODE: 'zipcode',
  };
  
  export const FEATURE_LIST = [
    "Unlimited access to personalized advice",
    "Health and training guidance tracking",
    "Exclusive tips and expert support",
    "Early access to new features and content",
  ] as const;
  
  export const LOCAL_STORAGE_KEYS = [
    "activity_level",
    "age",
    "breed",
    "check_in_period",
    "country",
    "dietary_restrictions",
    "gender",
    "goals",
    "issues_faced",
    "items",
    "medical_conditions",
    "medications",
    "required_progress",
    "selectedDate",
    "medical_history",
    "target_weight",
    "training_days",
    "unit",
    "weight",
    "zipcode",
    "catFormData"
  ] as const;

  export const CAT_BREEDS = [
  "Domestic shorthair",
  "Domestic longhair",
  "Maine coon",
  "Siamese",
  "Persian",
] as const;

export const WEIGHT_UNITS = {
  KG: "Kg",
  LBS: "Lbs",
} as const;

export const DECIMAL_PATTERN = /^\d+(\.\d{1,2})?$/;