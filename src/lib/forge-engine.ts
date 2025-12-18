import { INDUSTRIES, THEMES, type Industry, type Theme } from "./constants";
import type {
  ArchitectBlueprint,
  CopywriterBlueprint,
  ForgeBlueprint,
  ForgeBrief,
  IntegrationBlueprint,
  VisualBlueprint,
} from "./types";
import { openai } from "./openai";
import { safeJson, titleCase } from "./utils";

const NOW = () => new Date().toISOString();

const INDUSTRY_KEYWORDS: Record<Industry, string[]> = {
  "E-commerce": ["shop", "store", "commerce", "retail", "marketplace", "product"],
  SaaS: ["software", "platform", "saas", "tool", "automation", "workflow"],
  Healthcare: ["health", "clinic", "wellness", "medical", "care"],
  Education: ["learn", "course", "academy", "education", "school", "teach"],
  Finance: ["finance", "bank", "wealth", "invest", "payments", "accounting"],
  "Real Estate": ["property", "real estate", "listing", "homes", "rent", "broker"],
  Hospitality: ["hotel", "stay", "hospitality", "experience", "resort"],
  "Food & Beverage": ["food", "restaurant", "cafe", "drink", "culinary"],
  Lifestyle: ["lifestyle", "blog", "influencer", "magazine", "culture"],
  Technology: ["tech", "hardware", "innovation", "ai", "cloud"],
  Consulting: ["consult", "advisory", "strategy", "advisor", "expert"],
  "Marketing Agency": ["marketing", "campaign", "agency", "brand", "creative"],
  Fitness: ["fitness", "gym", "training", "health", "workout", "athlete"],
  Nonprofit: ["nonprofit", "charity", "donate", "impact", "mission"],
  Travel: ["travel", "tour", "adventure", "journey", "trip"],
  Automotive: ["auto", "car", "vehicle", "mobility", "transport"],
  Entertainment: ["entertainment", "events", "show", "music", "film"],
  Media: ["media", "news", "publication", "content", "podcast"],
  Gaming: ["gaming", "game", "esports", "play", "interactive"],
  Legal: ["law", "legal", "attorney", "firm", "compliance"],
  Manufacturing: ["manufacturing", "factory", "production", "supply"],
  Logistics: ["logistics", "shipping", "delivery", "supply chain", "freight"],
  "Beauty & Wellness": ["beauty", "spa", "cosmetic", "skincare", "wellness"],
  Sports: ["sports", "team", "athletic", "league", "coach"],
};

const THEME_KEYWORDS: Record<Theme, string[]> = {
  Minimalist: ["clean", "minimal", "clarity", "simple"],
  "Neo-Brutalist": ["brutalist", "bold", "raw", "grid"],
  Futuristic: ["future", "ai", "innovation", "space"],
  Organic: ["organic", "nature", "flow", "natural"],
  Glassmorphism: ["glass", "blur", "translucent"],
  Neumorphism: ["soft", "emboss", "shadow"],
  "Dark Mode": ["dark", "nocturnal", "night"],
  "Bold & Vibrant": ["vibrant", "bold", "punchy"],
  Pastel: ["pastel", "soft", "gentle"],
  Editorial: ["editorial", "magazine", "type"],
  Illustrated: ["illustration", "playful", "hand"],
  "High Contrast": ["contrast", "mono", "black", "white"],
  Monochrome: ["mono", "single", "grayscale"],
  Retro: ["retro", "vintage", "nostalgia"],
  Cyberpunk: ["cyber", "neon", "punk"],
  Luxury: ["luxury", "premium", "elevated"],
  Earthy: ["earth", "nature", "grounded"],
  Playful: ["playful", "fun", "friendly"],
  Zen: ["zen", "calm", "peace"],
  "Tech Noir": ["noir", "tech", "cinematic"],
};

const EFFECTS: Record<Theme, string[]> = {
  Minimalist: ["Whitespace-driven layout", "Ultra-thin typography", "Micro-interactions"],
  "Neo-Brutalist": ["Heavy grid overlays", "Chunky borders", "Hard drop shadows"],
  Futuristic: ["Matrix particle background", "Holographic button hover", "Glowing separators"],
  Organic: ["Curved section dividers", "Soft gradients", "Leaf-like blobs"],
  Glassmorphism: ["Frosted glass panels", "Backdrop blur cards", "Translucent navigation"],
  Neumorphism: ["Soft extruded buttons", "Inset input fields", "Ambient shadow halos"],
  "Dark Mode": ["Starfield background", "High contrast typography", "Animated neon accents"],
  "Bold & Vibrant": ["Diagonal gradient washes", "Oversized typography", "Animated underline reveals"],
  Pastel: ["Soft gradient blobs", "Gentle motion shadows", "Rounded card edges"],
  Editorial: ["Split layout hero", "Layered headline stacks", "Mosaic image grid"],
  Illustrated: ["Hand-drawn doodles", "Animated SVG mascots", "Sketch borders"],
  "High Contrast": ["Black & white duotone imagery", "Thick dividing lines", "Snappy transitions"],
  Monochrome: ["Single hue accent blocks", "Tone-on-tone cards", "Subtle noise background"],
  Retro: ["Gradient sunbursts", "Halftone overlays", "Rounded retro frames"],
  Cyberpunk: ["Neon glow edges", "Animated scanlines", "Chromatic aberration"],
  Luxury: ["Gold foil accents", "Serif display headlines", "Slow parallax scroll"],
  Earthy: ["Organic textures", "Pebble-shaped cards", "Animated fern shadows"],
  Playful: ["Bouncy motion curves", "Emoji confetti", "Rounded pill buttons"],
  Zen: ["Soft breathing animations", "Muted gradients", "Floating cards"],
  "Tech Noir": ["Horizontal light sweeps", "Glass + neon layering", "Diagonal section cuts"],
};

const COLOR_PALETTES: Partial<Record<Theme, VisualBlueprint["colorPalette"]>> = {
  Futuristic: [
    { name: "Nightfall", hex: "#050816", role: "background", contrast: "AAA" },
    { name: "Plasma Blue", hex: "#3F52FF", role: "accent", contrast: "AA" },
    { name: "Violet Pulse", hex: "#A855F7", role: "accent", contrast: "AA" },
    { name: "Ion", hex: "#E0F2FE", role: "text", contrast: "AAA" },
  ],
  Luxury: [
    { name: "Onyx", hex: "#0B0B0F", role: "background", contrast: "AAA" },
    { name: "Champagne", hex: "#F5E6C8", role: "text", contrast: "AAA" },
    { name: "Gilded", hex: "#D4AF37", role: "accent", contrast: "AA" },
    { name: "Pearl", hex: "#FFFAF1", role: "subtle", contrast: "AAA" },
  ],
  Pastel: [
    { name: "Cloud", hex: "#F9FAFB", role: "background", contrast: "AAA" },
    { name: "Lilac Mist", hex: "#D8B4FE", role: "accent", contrast: "AA" },
    { name: "Peach Fuzz", hex: "#FBCFE8", role: "accent", contrast: "AA" },
    { name: "Slate", hex: "#334155", role: "text", contrast: "AAA" },
  ],
  "Bold & Vibrant": [
    { name: "Ink", hex: "#0F172A", role: "background", contrast: "AAA" },
    { name: "Solar", hex: "#F97316", role: "accent", contrast: "AA" },
    { name: "Pulse", hex: "#EC4899", role: "accent", contrast: "AA" },
    { name: "Ice", hex: "#F8FAFC", role: "text", contrast: "AAA" },
  ],
  Glassmorphism: [
    { name: "Midnight", hex: "#0B1120", role: "background", contrast: "AAA" },
    { name: "Frost", hex: "#E3F2FD", role: "subtle", contrast: "AAA" },
    { name: "Aurora", hex: "#60A5FA", role: "accent", contrast: "AA" },
    { name: "Slate", hex: "#94A3B8", role: "text", contrast: "AA" },
  ],
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1400&q=80";

const getScoreMatch = (text: string, keywords: string[]) => {
  const lower = text.toLowerCase();
  return keywords.reduce((score, keyword) => {
    return lower.includes(keyword) ? score + 1 : score;
  }, 0);
};

const pickIndustry = (brief: ForgeBrief): Industry => {
  const blob = `${brief.brandName} ${brief.projectGoals} ${brief.keyFeatures.join(" ")}`;
  let best: { industry: Industry; score: number } | null = null;

  for (const industry of INDUSTRIES) {
    const score = getScoreMatch(blob, INDUSTRY_KEYWORDS[industry] ?? []);
    if (!best || score > best.score) {
      best = { industry, score };
    }
  }

  return best && best.score > 0 ? best.industry : INDUSTRIES[0];
};

const pickTheme = (brief: ForgeBrief): Theme => {
  const blob = `${brief.tone} ${brief.projectGoals} ${brief.brandTagline}`;
  let best: { theme: Theme; score: number } | null = null;

  for (const theme of THEMES) {
    const score = getScoreMatch(blob, THEME_KEYWORDS[theme] ?? []);
    if (!best || score > best.score) {
      best = { theme, score };
    }
  }

  if (brief.tone === "professional" && !best?.score) return "Luxury";
  if (brief.tone === "playful") return "Playful";
  return best?.theme ?? THEMES[0];
};

const buildSiteMap = (industry: Industry) => {
  const baseSections = [
    {
      label: "Home",
      description: "High-impact hero, value proposition, social proof, and quick actions.",
      sections: ["Hero", "Value Props", "Featured Offer", "Testimonials", "CTA"],
    },
    {
      label: "Solutions",
      description: "Deep-dive into capabilities aligned with the target persona.",
      sections: ["Persona Painpoints", "Capabilities Matrix", "Feature Highlights"],
    },
  ];

  const industrySpecific: Record<Industry, { label: string; description: string; sections: string[] }[]> = {
    "E-commerce": [
      {
        label: "Catalog",
        description: "Curated product categories with merchandising hooks.",
        sections: ["Collections", "Bundles", "Dynamic Upsells"],
      },
    ],
    SaaS: [
      {
        label: "Product",
        description: "Detailed feature tour, integrations, automation recipes.",
        sections: ["Feature Grid", "Workflow Examples", "Integration Gallery"],
      },
      {
        label: "Pricing",
        description: "Conversion optimized checkout with transparent tiers.",
        sections: ["Tier Comparison", "Usage Calculator", "Enterprise CTA"],
      },
    ],
    Healthcare: [
      {
        label: "Services",
        description: "Care pathways, practitioners, patient outcomes",
        sections: ["Care Pathways", "Specialist Directory", "Insurance Coverage"],
      },
      {
        label: "Resources",
        description: "Structured content for patient education and compliance.",
        sections: ["Guides", "Clinical Insights", "FAQ"],
      },
    ],
    Education: [
      {
        label: "Programs",
        description: "Curriculum maps, learning outcomes, enrollment flow",
        sections: ["Programs", "Instructors", "Admissions"],
      },
      {
        label: "Resources",
        description: "Content hub, knowledge base, alumni stories",
        sections: ["Knowledge Hub", "Alumni", "Events"],
      },
    ],
    Finance: [
      {
        label: "Solutions",
        description: "Capital products, compliance and trust signals",
        sections: ["Products", "Risk Controls", "Case Studies"],
      },
    ],
    "Real Estate": [
      {
        label: "Listings",
        description: "Live property feed with advanced filtering and CTA",
        sections: ["Featured Listing", "Neighborhood Guides", "Schedule Tour"],
      },
    ],
    Hospitality: [
      {
        label: "Experiences",
        description: "Immersive property story, amenities, booking widget",
        sections: ["Suites", "Dining", "Experiences"],
      },
    ],
    "Food & Beverage": [
      {
        label: "Menu",
        description: "Seasonal menus, pairing suggestions, order flow",
        sections: ["Signature Dishes", "Delivery", "Events"],
      },
    ],
    Lifestyle: [
      {
        label: "Stories",
        description: "Editorial hub for lifestyle content and partnerships",
        sections: ["Spotlights", "Collaborations", "Newsletter"],
      },
    ],
    Technology: [
      {
        label: "Platform",
        description: "Modules, architecture, innovation roadmap",
        sections: ["Tech Stack", "Roadmap", "Security"],
      },
    ],
    Consulting: [
      {
        label: "Practices",
        description: "Service lines, methodology, case studies",
        sections: ["Framework", "Case Library", "Advisory Team"],
      },
    ],
    "Marketing Agency": [
      {
        label: "Work",
        description: "Portfolio, playbooks, growth experiments",
        sections: ["Case Studies", "Process", "Partners"],
      },
    ],
    Fitness: [
      {
        label: "Programs",
        description: "Training plans, streaming classes, membership tiers",
        sections: ["Programs", "Trainers", "Schedule"],
      },
    ],
    Nonprofit: [
      {
        label: "Impact",
        description: "Impact metrics, transparency reports, donation flows",
        sections: ["Impact Map", "Stories", "Financials"],
      },
    ],
    Travel: [
      {
        label: "Destinations",
        description: "Curated itineraries, highlights, booking CTA",
        sections: ["Itineraries", "Gallery", "Trip Planner"],
      },
    ],
    Automotive: [
      {
        label: "Models",
        description: "Vehicle lineup, configurator, financing",
        sections: ["Model Grid", "Configurator", "Test Drive"],
      },
    ],
    Entertainment: [
      {
        label: "Shows",
        description: "Upcoming shows, streaming CTA, merch",
        sections: ["Calendar", "Media", "Community"],
      },
    ],
    Media: [
      {
        label: "Editorial",
        description: "Featured stories, podcasts, subscription CTA",
        sections: ["Top Stories", "Newsletter", "Premium"],
      },
    ],
    Gaming: [
      {
        label: "Game",
        description: "Core loop, features, community, roadmap",
        sections: ["Gameplay", "Lore", "Updates"],
      },
    ],
    Legal: [
      {
        label: "Services",
        description: "Practice areas, attorneys, compliance",
        sections: ["Practice Areas", "Team", "Insights"],
      },
    ],
    Manufacturing: [
      {
        label: "Capabilities",
        description: "Facilities, processes, quality assurance",
        sections: ["Capabilities", "Certifications", "Industries"],
      },
    ],
    Logistics: [
      {
        label: "Network",
        description: "Coverage map, service levels, integrations",
        sections: ["Network", "Tracking", "Partners"],
      },
    ],
    "Beauty & Wellness": [
      {
        label: "Treatments",
        description: "Treatment menu, packages, loyalty",
        sections: ["Treatments", "Practitioners", "Membership"],
      },
    ],
    Sports: [
      {
        label: "Club",
        description: "Teams, schedule, merch, community",
        sections: ["Teams", "Schedule", "Fan Zone"],
      },
    ],
  };

  return [...baseSections, ...(industrySpecific[industry] ?? [])];
};

const architectAgent = async (brief: ForgeBrief): Promise<ArchitectBlueprint> => {
  const industry = pickIndustry(brief);
  const theme = pickTheme(brief);

  return {
    industry,
    theme,
    siteMap: buildSiteMap(industry),
  };
};

const copywriterAgent = async (
  brief: ForgeBrief,
  architecture: ArchitectBlueprint,
): Promise<CopywriterBlueprint> => {
  const sections = architecture.siteMap.map((page) => ({
    title: page.label,
    body: `${page.description} Tailored for ${brief.targetAudience}. Key focus: ${brief.keyFeatures
      .slice(0, 3)
      .join(", ")}.`,
    cta: "Explore more",
  }));

  const metaDescription = `${titleCase(brief.brandName)} delivers ${brief.projectGoals.toLowerCase()} for ${brief.targetAudience}. Discover ${brief.keyFeatures
    .slice(0, 3)
    .join(", ")}.`;

  const keywords = [
    `${brief.brandName} ${architecture.industry}`,
    `${architecture.industry.toLowerCase()} ${brief.keyFeatures[0] ?? "solutions"}`,
    `${brief.targetAudience} ${architecture.theme.toLowerCase()} experience`,
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": architecture.industry === "E-commerce" ? "Store" : "Organization",
    name: titleCase(brief.brandName),
    description: metaDescription,
    slogan: brief.brandTagline,
    url: "https://nexaforge.pro",
    audience: {
      "@type": "Audience",
      audienceType: brief.targetAudience,
    },
    offers: brief.enablePayments
      ? {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "USD",
        }
      : undefined,
  };

  return {
    heroHeadline: `${titleCase(brief.brandName)} – ${brief.brandTagline}`,
    heroSubheadline: brief.projectGoals,
    callToAction: brief.enablePayments ? "Start your plan" : "Book a session",
    metaDescription,
    keywords,
    jsonLd: safeJson(jsonLd),
    pageSections: sections,
  };
};

const getPaletteForTheme = (theme: Theme): VisualBlueprint["colorPalette"] => {
  if (COLOR_PALETTES[theme]) return COLOR_PALETTES[theme]!;

  return [
    { name: "Obsidian", hex: "#05060B", role: "background", contrast: "AAA" },
    { name: "Iris", hex: "#6366F1", role: "accent", contrast: "AA" },
    { name: "Quartz", hex: "#CBD5F5", role: "subtle", contrast: "AAA" },
    { name: "Dove", hex: "#E2E8F0", role: "text", contrast: "AAA" },
  ];
};

const visualAgent = async (
  brief: ForgeBrief,
  architecture: ArchitectBlueprint,
): Promise<VisualBlueprint> => {
  let generatedImageUrl: string | undefined;

  if (openai) {
    try {
      const result = await openai.images.generate({
        model: "gpt-image-1",
        prompt: `Create a cinematic hero image for a ${architecture.theme} ${architecture.industry} website named ${brief.brandName}. Style should align with ${architecture.theme} aesthetics with ${brief.tone} tone.`,
        size: "1024x1024",
      });
      generatedImageUrl = result.data?.[0]?.url ?? FALLBACK_IMAGE;
    } catch {
      generatedImageUrl = FALLBACK_IMAGE;
    }
  }

  const colorPalette = getPaletteForTheme(architecture.theme);
  const aestheticNotes = [
    `Primary aesthetic is ${architecture.theme} with ${brief.tone} tone of voice.`,
    `Typography pairing: Display serif headline + geometric sans body.`,
    `Use gradient overlays to reinforce ${brief.keyFeatures[0] ?? "core"} narrative.`,
  ];

  return {
    heroImagePrompt: `A ${architecture.theme} inspired hero visual showcasing ${brief.projectGoals.toLowerCase()} for ${brief.targetAudience}.`,
    aestheticNotes,
    colorPalette,
    designEffects: EFFECTS[architecture.theme] ?? ["Soft shadow layering", "Animated cards"],
    generatedImageUrl: generatedImageUrl ?? FALLBACK_IMAGE,
  };
};

const integrationAgent = async (brief: ForgeBrief): Promise<IntegrationBlueprint> => {
  const stripeEnabled = brief.enablePayments;
  const products = stripeEnabled
    ? brief.keyFeatures.slice(0, 3).map((feature, index) => ({
        name: `${titleCase(brief.brandName)} ${feature}`,
        price: 49 + index * 20,
        interval: (brief.integrations.includes("subscriptions") ? "month" : "one_time") as
          | "one_time"
          | "month"
          | "year",
        currency: "USD" as const,
      }))
    : [];

  const booking = brief.enableBooking
    ? {
        enabled: true,
        provider: "cal" as const,
        link: `https://cal.com/${brief.brandName.toLowerCase().replace(/\s+/g, "-")}/discovery`,
      }
    : null;

  const contact = {
    enabled: true,
    method: "form" as const,
    endpoint: `/api/contact?brand=${encodeURIComponent(brief.brandName)}`,
  };

  return {
    stripe: stripeEnabled
      ? {
          enabled: true,
          products,
          checkoutMode: brief.integrations.includes("subscriptions") ? "subscription" : "payment",
        }
      : null,
    booking,
    contact,
  };
};

export const runForgePipeline = async (brief: ForgeBrief): Promise<ForgeBlueprint> => {
  const architect = await architectAgent(brief);
  const copywriter = await copywriterAgent(brief, architect);
  const visual = await visualAgent(brief, architect);
  const integration = await integrationAgent(brief);

  return {
    architect,
    copywriter,
    visual,
    integration,
    createdAt: NOW(),
    brief,
  };
};
