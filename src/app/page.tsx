import { BrainCircuit, Cable, Palette, Rocket, Sparkles } from "lucide-react";
import Link from "next/link";

import { ForgeForm } from "@/components/forge/forge-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const highlights = [
  {
    title: "Agent Mesh",
    description: "Parallel Architect, Copywriter, Visual, and Integration agents coordinate through a shared memory graph.",
    icon: BrainCircuit,
  },
  {
    title: "Production Stack",
    description: "Outputs JSON blueprints ready for Next.js 14, Supabase Edge Functions, and Stripe Checkout flows.",
    icon: Cable,
  },
  {
    title: "Creative Control",
    description: "Glassmorphism or Tech Noir? Agents curate accessible palettes, hero prompts, and motion recipes in seconds.",
    icon: Palette,
  },
];

export default function Home() {
  return (
    <main className="relative mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-24 px-4 py-16 md:px-10 lg:px-14">
      <div className="absolute inset-x-0 top-0 -z-10 h-[480px] overflow-hidden">
        <div className="grid-overlay" />
      </div>

      <header className="flex flex-col gap-16">
        <nav className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
          <div className="flex items-center gap-2 text-sm font-semibold tracking-[0.2em] text-white uppercase">
            <Sparkles className="size-4" />
            NexaForge Pro
          </div>
          <div className="flex items-center gap-3 text-xs text-white/60">
            <Link href="#agents" className="hover:text-white">
              Agents
            </Link>
            <Link href="#stack" className="hover:text-white">
              Stack
            </Link>
            <Link href="#forge" className="hover:text-white">
              Blueprint
            </Link>
          </div>
          <Button asChild size="sm" variant="outline">
            <Link href="#forge">Launch Console</Link>
          </Button>
        </nav>

        <section className="grid gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div className="space-y-8">
            <Badge variant="glass" className="tracking-wide uppercase">
              Ultimate AI Builder
            </Badge>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl lg:text-[3.3rem]">
              Agents that engineer <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#6366F1] to-[#22D3EE]">production-grade</span> websites in minutes.
            </h1>
            <p className="max-w-2xl text-lg text-white/70">
              NexaForge Pro orchestrates an autonomous pipeline: Architect selects industry and theme, Copywriter pens SEO narratives, Visual agent composes hero imagery, and Integration agent wires Stripe, Supabase, and booking flows—ready for Vercel ship.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button className="h-12 px-8 text-base">Start Forging</Button>
              <Button variant="ghost" className="text-white/80" asChild>
                <Link href="https://github.com/vercel/next.js" target="_blank" rel="noreferrer">
                  View Templates
                </Link>
              </Button>
              <span className="text-sm text-white/60">Powered by GPT-4o, DALL·E 3, Supabase, Stripe</span>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative w-full rounded-[36px] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="absolute -left-6 top-8 h-20 w-20 rounded-3xl border border-white/20 bg-gradient-to-br from-[#7C8BFF] to-[#F472B6] opacity-70 blur-xl" />
              <div className="absolute -right-4 bottom-6 h-16 w-16 rounded-3xl border border-white/30 bg-gradient-to-br from-[#22D3EE] to-[#A855F7] opacity-60 blur-lg" />
              <div className="relative space-y-4">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>Forge Engine</span>
                  <span>Latency: 8.2s</span>
                </div>
                <div className="grid gap-3">
                  {["Architect", "Copywriter", "Visual", "Integration"].map((step, index) => (
                    <div key={step} className="rounded-2xl border border-white/10 bg-black/40 p-3">
                      <div className="flex items-center justify-between text-sm text-white/80">
                        <span>{step}</span>
                        <span className="text-white/40">Agent #{index + 1}</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#6366F1] to-[#F472B6]" style={{ width: `${70 + index * 8}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-xs text-white/60">
                  <p className="font-semibold text-white">Blueprint Ready</p>
                  <p className="mt-1">
                    Industry: SaaS · Theme: Glassmorphism · Stripe Subscriptions active · Supabase Edge Functions ready to deploy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>

      <section id="agents" className="grid gap-6 rounded-[40px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge variant="glass">Orchestrated Intelligence</Badge>
            <h2 className="mt-3 text-3xl font-semibold">Four agents, one ship-ready blueprint.</h2>
          </div>
          <p className="max-w-xl text-sm text-white/60">
            Each agent owns an expertise lane while syncing to a shared design memory. The output is cohesive, accessible, and deployable. No more context juggling.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur transition-all hover:border-white/20 hover:bg-white/10"
            >
              <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-br from-[#7462FF] to-[#F472B6] p-2 text-white shadow-lg">
                <item.icon className="size-5" />
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-white/60">{item.description}</p>
              <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-wide text-white/40">
                <Rocket className="size-4" />
                <span>Realtime compiled</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="stack" className="grid gap-6 rounded-[40px] border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-8 backdrop-blur">
        <div className="flex flex-col gap-3">
          <Badge variant="glass">Stack</Badge>
          <h2 className="text-3xl font-semibold">Infra ready for Vercel</h2>
          <p className="max-w-2xl text-sm text-white/60">
            Next.js 14 App Router · Supabase Auth + Edge Functions · Stripe Checkout · GPT-4o + DALL·E 3 orchestration. Production defaults everywhere.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            {
              label: "Next.js 14",
              description: "App Router, Server Actions, ISR ready.",
            },
            {
              label: "Supabase",
              description: "Auth, Storage & Postgres blueprint persistence.",
            },
            {
              label: "Stripe",
              description: "Subscriptions configured per plan tier.",
            },
            {
              label: "OpenAI",
              description: "GPT-4o + DALL·E craft experience & visuals.",
            },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/10 bg-black/40 p-4 text-sm text-white/70">
              <p className="text-base font-semibold text-white">{item.label}</p>
              <p className="mt-2 text-xs text-white/60">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="forge" className="space-y-8">
        <div className="flex flex-col gap-3">
          <Badge variant="glass">Forge Console</Badge>
          <h2 className="text-3xl font-semibold">Launch your blueprint</h2>
          <p className="max-w-xl text-sm text-white/60">
            Submit a single mission brief. Agents generate sitemap, copy, visuals, palette, and integration ops with Supabase persistence.
          </p>
        </div>
        <ForgeForm />
      </section>

      <footer className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-xs text-white/40 backdrop-blur md:flex-row">
        <span>© {new Date().getFullYear()} NexaForge Labs. Crafted for Vercel deployments.</span>
        <div className="flex items-center gap-4">
          <Link href="https://openai.com" target="_blank" rel="noreferrer" className="hover:text-white">
            OpenAI Stack
          </Link>
          <Link href="https://supabase.com" target="_blank" rel="noreferrer" className="hover:text-white">
            Supabase
          </Link>
          <Link href="https://stripe.com" target="_blank" rel="noreferrer" className="hover:text-white">
            Stripe
          </Link>
        </div>
      </footer>
    </main>
  );
}
