"use client";

import { motion } from "framer-motion";
import { Brain, Palette, Sparkles, Workflow } from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";

import { buildBlueprint } from "@/app/actions/build-blueprint";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { ForgeBlueprint } from "@/lib/types";
import { cn } from "@/lib/utils";

const toneOptions = [
  { value: "professional", label: "Professional" },
  { value: "playful", label: "Playful" },
  { value: "elevated", label: "Elevated" },
  { value: "experimental", label: "Experimental" },
  { value: "friendly", label: "Friendly" },
] as const;

const integrationOptions = [
  "subscriptions",
  "crm",
  "analytics",
  "email",
  "live chat",
] as const;

const featurePlaceholder = [
  "AI-assisted layout composer",
  "SEO keyword clustering",
  "Stripe-powered checkout",
];

export const ForgeForm = () => {
  const [features, setFeatures] = useState<string[]>(featurePlaceholder);
  const [integrations, setIntegrations] = useState<string[]>(["analytics", "email"]);
  const [tone, setTone] = useState<(typeof toneOptions)[number]["value"]>("professional");
  const [result, setResult] = useState<ForgeBlueprint | null>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleFeatureChange = (value: string, index: number) => {
    setFeatures((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleIntegrationToggle = (integration: string) => {
    setIntegrations((prev) =>
      prev.includes(integration)
        ? prev.filter((item) => item !== integration)
        : [...prev, integration],
    );
  };

  const handleSubmit = (formData: FormData) => {
    const brandName = (formData.get("brandName") as string)?.trim();
    const brandTagline = (formData.get("brandTagline") as string)?.trim();
    const projectGoals = (formData.get("projectGoals") as string)?.trim();
    const targetAudience = (formData.get("targetAudience") as string)?.trim();
    const enableBooking = formData.get("enableBooking") === "on";
    const enablePayments = formData.get("enablePayments") === "on";

    startTransition(async () => {
      setError(null);
      const cleanedFeatures = features.map((item) => item.trim()).filter(Boolean);
      const payload = {
        brandName,
        brandTagline,
        projectGoals,
        targetAudience,
        tone,
        keyFeatures: cleanedFeatures.length ? cleanedFeatures : featurePlaceholder,
        integrations,
        enableBooking,
        enablePayments,
      };

      const response = await buildBlueprint(payload);

      if (!response.success) {
        setError(response.error ?? "Unable to generate blueprint");
        setResult(null);
        return;
      }

      setResult(response.blueprint);
    });
  };

  return (
    <div className="grid gap-14 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <Card className="relative border-white/5 bg-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-purple-500/20" />
        <CardHeader>
          <Badge variant="glass" className="w-fit">
            Forge Engine
          </Badge>
          <CardTitle className="text-3xl font-semibold leading-tight">
            Describe the brand.<br /> Let agents forge the launch stack.
          </CardTitle>
          <CardDescription>
            Architect, Copywriter, Visual and Integration agents collaborate to generate a production-ready blueprint.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="brandName">Brand Name</Label>
                <Input id="brandName" name="brandName" defaultValue="NexaForge" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brandTagline">Tagline</Label>
                <Input
                  id="brandTagline"
                  name="brandTagline"
                  defaultValue="Agents that craft launch-ready experiences"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  name="targetAudience"
                  defaultValue="Growth-stage SaaS founders"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Voice & Tone</Label>
                <div className="flex flex-wrap gap-2">
                  {toneOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setTone(opt.value)}
                      className={cn(
                        "rounded-xl border border-white/10 px-4 py-2 text-sm transition-all",
                        tone === opt.value
                          ? "bg-white text-slate-900 shadow-lg"
                          : "bg-white/5 text-white/70 hover:bg-white/10",
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectGoals">Mission Brief</Label>
              <Textarea
                id="projectGoals"
                name="projectGoals"
                defaultValue="Launch an adaptive AI website builder that composes conversion-optimized SaaS sites with Stripe subscriptions built-in."
              />
            </div>

            <div className="space-y-2">
              <Label>Flagship Features</Label>
              <div className="grid gap-2 md:grid-cols-3">
                {features.map((feature, index) => (
                  <Input
                    key={index}
                    value={feature}
                    onChange={(event) => handleFeatureChange(event.target.value, index)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Integrations</Label>
              <div className="flex flex-wrap gap-2">
                {integrationOptions.map((integration) => {
                  const active = integrations.includes(integration);
                  return (
                    <button
                      key={integration}
                      type="button"
                      onClick={() => handleIntegrationToggle(integration)}
                      className={cn(
                        "rounded-xl border px-4 py-2 text-xs uppercase tracking-wide transition-all",
                        active
                          ? "border-transparent bg-gradient-to-r from-[#5B4BFF] via-[#8B5CF6] to-[#D946EF] text-white shadow-lg"
                          : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10",
                      )}
                    >
                      {integration}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-white/70">
                <input type="checkbox" name="enablePayments" defaultChecked className="size-4 rounded border-white/30 bg-white/10" />
                Stripe Subscriptions
              </label>
              <label className="flex items-center gap-2 text-sm text-white/70">
                <input type="checkbox" name="enableBooking" className="size-4 rounded border-white/30 bg-white/10" />
                Booking Calendar
              </label>
            </div>

            <Button type="submit" disabled={pending} className="h-12 text-base">
              {pending ? "Forging Blueprint..." : "Forge Blueprint"}
            </Button>

            {error ? <p className="text-sm text-red-300">{error}</p> : null}
          </form>
        </CardContent>
      </Card>

      <ResultPanel result={result} pending={pending} />
    </div>
  );
};

type ResultPanelProps = {
  result: ForgeBlueprint | null;
  pending: boolean;
};

const agentCards = [
  {
    key: "architect",
    label: "Architect",
    icon: Workflow,
    description: "Maps the information architecture, sitemap, and theme." ,
  },
  {
    key: "copywriter",
    label: "Copywriter",
    icon: Brain,
    description: "Delivers SEO-ready copy, metadata, and structured data.",
  },
  {
    key: "visual",
    label: "Visual",
    icon: Palette,
    description: "Composes hero imagery, palettes, and interactive effects.",
  },
  {
    key: "integration",
    label: "Integrator",
    icon: Sparkles,
    description: "Activates payments, bookings, and lead capture flows.",
  },
] as const;

const ResultPanel = ({ result, pending }: ResultPanelProps) => {
  return (
    <Card className="relative border-white/10 bg-[#07080F]/90">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(125,92,255,0.35),_transparent_55%)]"
      />
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="glass">Output</Badge>
            <CardTitle className="mt-3 text-2xl">Blueprint Console</CardTitle>
            <CardDescription>Inspect agent deliverables the moment they compile.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {agentCards.map((agent) => (
              <div
                key={agent.key}
                className="group rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition-all hover:border-white/20 hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-gradient-to-br from-[#7C8BFF] to-[#F472B6] p-2 text-white shadow-lg">
                    <agent.icon className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{agent.label}</h4>
                    <p className="text-xs text-white/60">{agent.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/40 p-4">
            {pending && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="h-3 w-1/2 rounded-full bg-white/10" />
                <div className="h-20 rounded-2xl bg-white/5" />
                <div className="h-4 w-3/4 rounded-full bg-white/10" />
              </motion.div>
            )}

            {!pending && !result && (
              <div className="space-y-3 text-white/50">
                <p className="text-sm font-medium">Awaiting briefing…</p>
                <p className="text-xs">
                  Provide a mission brief and the Forge Engine will compile a fresh blueprint across architecture, copy, visuals, and systems.
                </p>
              </div>
            )}

            {result && !pending && <BlueprintTabs blueprint={result} />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

type BlueprintTabsProps = {
  blueprint: ForgeBlueprint;
};

const BlueprintTabs = ({ blueprint }: BlueprintTabsProps) => {
  return (
    <Tabs defaultValue="architect">
      <TabsList className="flex w-full justify-between">
        <TabsTrigger value="architect">Architect</TabsTrigger>
        <TabsTrigger value="copywriter">Copywriter</TabsTrigger>
        <TabsTrigger value="visual">Visual</TabsTrigger>
        <TabsTrigger value="integration">Integrator</TabsTrigger>
      </TabsList>

      <TabsContent value="architect" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Stat label="Industry" value={blueprint.architect.industry} />
          <Stat label="Theme" value={blueprint.architect.theme} />
        </div>
        <div className="grid gap-3">
          {blueprint.architect.siteMap.map((page) => (
            <div key={page.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{page.label}</h4>
              <p className="mt-1 text-xs text-white/60">{page.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {page.sections.map((section) => (
                  <Badge key={section} variant="outline">
                    {section}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="copywriter" className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">{blueprint.copywriter.heroHeadline}</h3>
          <p className="text-sm text-white/60">{blueprint.copywriter.heroSubheadline}</p>
          <Badge variant="glass" className="uppercase tracking-wide">
            {blueprint.copywriter.callToAction}
          </Badge>
        </div>
        <div className="space-y-3">
          {blueprint.copywriter.pageSections.map((section) => (
            <div key={section.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{section.title}</h4>
              <p className="mt-1 text-xs text-white/70">{section.body}</p>
              {section.cta && <p className="mt-2 text-xs uppercase text-white/50">CTA: {section.cta}</p>}
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/60">
          <p className="font-semibold text-white">Meta</p>
          <p className="mt-1">{blueprint.copywriter.metaDescription}</p>
          <p className="mt-2 text-white/50">Keywords: {blueprint.copywriter.keywords.join(", ")}</p>
        </div>
      </TabsContent>

      <TabsContent value="visual" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            <div className="relative h-60 overflow-hidden rounded-3xl border border-white/10 bg-black/40">
              <Image
                src={blueprint.visual.generatedImageUrl}
                alt="Generated hero visual"
                fill
                sizes="(min-width: 768px) 50vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/60">
              <p className="font-semibold text-white">Prompt</p>
              <p className="mt-1">{blueprint.visual.heroImagePrompt}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-white/60">Color Palette</p>
              <div className="mt-3 flex flex-col gap-2">
                {blueprint.visual.colorPalette.map((color) => (
                  <div key={color.name} className="flex items-center gap-3">
                    <span className="h-9 w-9 rounded-xl border border-white/20" style={{ background: color.hex }} />
                    <div className="text-xs text-white/70">
                      <p className="font-semibold text-white">{color.name}</p>
                      <p>{color.hex}</p>
                      <p className="uppercase text-white/40">{color.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-white/60">Design Effects</p>
              <ul className="mt-3 space-y-2 text-xs text-white/60">
                {blueprint.visual.designEffects.map((effect) => (
                  <li key={effect} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#8B5CF6]" />
                    {effect}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="integration" className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h4 className="text-sm font-semibold text-white">Stripe</h4>
            {blueprint.integration.stripe?.enabled ? (
              <div className="mt-2 space-y-3 text-xs text-white/60">
                <p className="text-white/60">Checkout mode: {blueprint.integration.stripe.checkoutMode}</p>
                <div className="space-y-2">
                  {blueprint.integration.stripe.products.map((product) => (
                    <div key={product.name} className="rounded-xl border border-white/10 bg-black/40 p-3">
                      <p className="text-sm font-semibold text-white">{product.name}</p>
                      <p className="mt-1 text-xs text-white/60">
                        {product.currency.toUpperCase()} {product.price} / {product.interval === "one_time" ? "one-time" : product.interval}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="mt-2 text-xs text-white/50">Payments disabled.</p>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h4 className="text-sm font-semibold text-white">Booking</h4>
            {blueprint.integration.booking?.enabled ? (
              <div className="mt-2 text-xs text-white/60">
                <p>Provider: {blueprint.integration.booking.provider}</p>
                <p className="truncate text-white/50">{blueprint.integration.booking.link}</p>
              </div>
            ) : (
              <p className="mt-2 text-xs text-white/50">Booking not configured.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/60">
          <p className="font-semibold text-white">Contact</p>
          <p className="mt-1">{blueprint.integration.contact.method.toUpperCase()} endpoint:</p>
          <p className="mt-1 text-white/50">{blueprint.integration.contact.endpoint}</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
    <p className="text-xs uppercase tracking-wide text-white/50">{label}</p>
    <p className="mt-2 text-lg font-semibold text-white">{value}</p>
  </div>
);
