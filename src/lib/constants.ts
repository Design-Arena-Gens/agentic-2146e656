export const INDUSTRIES = [
  "E-commerce",
  "SaaS",
  "Healthcare",
  "Education",
  "Finance",
  "Real Estate",
  "Hospitality",
  "Food & Beverage",
  "Lifestyle",
  "Technology",
  "Consulting",
  "Marketing Agency",
  "Fitness",
  "Nonprofit",
  "Travel",
  "Automotive",
  "Entertainment",
  "Media",
  "Gaming",
  "Legal",
  "Manufacturing",
  "Logistics",
  "Beauty & Wellness",
  "Sports"
] as const;

export const THEMES = [
  "Minimalist",
  "Neo-Brutalist",
  "Futuristic",
  "Organic",
  "Glassmorphism",
  "Neumorphism",
  "Dark Mode",
  "Bold & Vibrant",
  "Pastel",
  "Editorial",
  "Illustrated",
  "High Contrast",
  "Monochrome",
  "Retro",
  "Cyberpunk",
  "Luxury",
  "Earthy",
  "Playful",
  "Zen",
  "Tech Noir"
] as const;

export type Industry = (typeof INDUSTRIES)[number];
export type Theme = (typeof THEMES)[number];
