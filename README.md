# NexaForge Pro

NexaForge Pro is an agentic, production-ready AI website builder implemented with Next.js 14 App Router, TypeScript, Tailwind CSS, Supabase, Stripe, and the OpenAI GPT-4o/DALL·E stack. Four autonomous agents collaborate to deliver end-to-end blueprints: architecture, SEO copy, visual direction, and integrations.

## Features

- **Architect Agent** — infers industry and theme, produces sitemap and IA tailored to the brief.
- **Copywriter Agent** — crafts hero messaging, SEO meta, keyword strategy, and JSON-LD.
- **Visual Agent** — proposes color palettes, motion effects, and generates hero imagery via DALL·E.
- **Integration Agent** — auto-configures Stripe products, booking calendars, and contact flows.
- **Supabase Persistence** — optional blueprint storage when `SUPABASE_URL` and key env vars are configured.
- **Stripe Ready** — subscription-ready sample products and checkout mode logic.

## Environment Variables

Create a `.env.local` file and populate as needed:

```bash
OPENAI_API_KEY=sk-...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
STRIPE_SECRET_KEY=sk_live_or_test
```

Without keys, the app gracefully falls back to deterministic blueprints and placeholder imagery.

## Scripts

```bash
npm run dev        # start Next.js locally
npm run build      # production build
npm run start      # run built app
npm run lint       # lint with eslint-config-next
```

## Deployment

The project is optimized for Vercel. After building locally, deploy with:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-2146e656
```

Once deployed, validate the production URL:

```bash
curl https://agentic-2146e656.vercel.app
```

## Notes

- Supabase table `forge_blueprints` should include columns: `id`, `brand_name`, `industry`, `blueprint` (jsonb), `created_at`.
- Remote image generation uses DALL·E when an OpenAI API key is present; otherwise, a curated fallback Unsplash image is rendered.
- Tailwind CSS 4 inline theming is leveraged for glassmorphism and neon-inspired UI styling.
