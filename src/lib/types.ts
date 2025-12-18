import type { Industry, Theme } from "./constants";

export type ForgeBrief = {
  brandName: string;
  brandTagline: string;
  projectGoals: string;
  targetAudience: string;
  tone: "playful" | "professional" | "elevated" | "experimental" | "friendly";
  keyFeatures: string[];
  integrations: string[];
  enableBooking: boolean;
  enablePayments: boolean;
};

export type ArchitectBlueprint = {
  industry: Industry;
  theme: Theme;
  siteMap: {
    label: string;
    description: string;
    sections: string[];
  }[];
};

export type CopywriterBlueprint = {
  heroHeadline: string;
  heroSubheadline: string;
  callToAction: string;
  metaDescription: string;
  keywords: string[];
  jsonLd: Record<string, unknown>;
  pageSections: {
    title: string;
    body: string;
    cta?: string;
  }[];
};

export type VisualBlueprint = {
  heroImagePrompt: string;
  aestheticNotes: string[];
  colorPalette: {
    name: string;
    hex: string;
    role: "background" | "accent" | "text" | "subtle";
    contrast: string;
  }[];
  designEffects: string[];
  generatedImageUrl: string;
};

export type IntegrationBlueprint = {
  stripe: {
    enabled: boolean;
    products: {
      name: string;
      price: number;
      interval: "one_time" | "month" | "year";
      currency: string;
    }[];
    checkoutMode: "payment" | "subscription";
  } | null;
  booking: {
    enabled: boolean;
    provider: "calendly" | "cal" | "savvycal" | "tidyclub" | "custom";
    link: string;
  } | null;
  contact: {
    enabled: boolean;
    method: "form" | "email" | "chat";
    endpoint: string;
  };
};

export type ForgeBlueprint = {
  architect: ArchitectBlueprint;
  copywriter: CopywriterBlueprint;
  visual: VisualBlueprint;
  integration: IntegrationBlueprint;
  createdAt: string;
  brief: ForgeBrief;
};
