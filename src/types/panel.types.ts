export interface MedicalHistoryForm {
  medicalCondition: string | null;
  medication: string;
  dietaryRestrictions: string;
  surgeryHistory: string;
}

export interface Panel11Props {
  nextStep: () => void;
  previousStep: () => void;
} 