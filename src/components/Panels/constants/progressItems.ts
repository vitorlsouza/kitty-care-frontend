export interface ProgressItem {
  id: number;
  title: string;
  description: string;
  popupTitle: string;
  popupDescription: string;
}

export const PROGRESS_ITEMS: ProgressItem[] = [
  {
    id: 1,
    title: "Weight Loss",
    description: "Help my cat achieve a healthier weight.",
    popupTitle: "Great Choice!",
    popupDescription:
      "Helping your cat lose weight will improve their overall health, increase their energy, and may extend their life expectancy.",
  },
  {
    id: 2,
    title: "Socialization",
    description:
      "Improve my cat's comfort and interactions with other pets or people.",
    popupTitle: "Perfect!",
    popupDescription:
      "Improving your cat's social skills will help them feel more comfortable around people, pets, and new environments.",
  },
  {
    id: 3,
    title: "Litter Box Use",
    description: "Ensure my cat consistently uses the litter box.",
    popupTitle: "Excellent Choice!",
    popupDescription:
      "Focusing on litter box habits can significantly reduce stress for both you and your cat, ensuring a cleaner, happier home.",
  },
  {
    id: 4,
    title: "Reduced Scratching",
    description:
      "Stop my cat from scratching furniture or other inappropriate surfaces.",
    popupTitle: "Great Pick!",
    popupDescription:
      "Focused progress on reducing scratching can improve your cat's well-being and protect your furniture from damage.",
  },
  {
    id: 5,
    title: "Increased Playtime",
    description: "Encourage more active and engaging play for my cat.",
    popupTitle: "Fantastic!",
    popupDescription:
      "Increasing playtime will help your cat stay active, burn off energy, and improve both physical and mental health.",
  },
  {
    id: 6,
    title: "Reduced Anxiety",
    description:
      "Help my cat feel more relaxed and reduce stress or anxious behaviors.",
    popupTitle: "Smart Choice!",
    popupDescription:
      "Reducing anxiety can lead to a happier, calmer cat, and also help improve their behavior and response to changes in their environment.",
  },
]; 