export const CAT_BREEDS = [
  "Domestic shorthair",
  "Domestic longhair",
  "Maine coon",
  "Siamese",
  "Persian",
] as const;

export type CatBreed = (typeof CAT_BREEDS)[number];

export type WeightUnit = "Kg" | "Lbs";

export const WEIGHT_REGEX = /^\d+(\.\d{1,2})?$/; 