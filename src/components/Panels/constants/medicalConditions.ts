export const MEDICAL_CONDITIONS = [
  "diabetes",
  "obesity",
  "allergies",
  "arthritis",
  "urinary tract issues",
  "dental problems",
  "respiratory issues",
  "other",
] as const;

export const STORAGE_KEYS = {
  MEDICAL_CONDITIONS: "medical_conditions",
  MEDICATIONS: "medications",
  DIETARY_RESTRICTIONS: "dietary_restrictions",
  MEDICAL_HISTORY: "medical_history",
} as const; 