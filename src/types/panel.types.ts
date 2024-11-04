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

export interface Panel15Props {
  previousStep?: () => void;  // Made optional since it's not currently used
} 