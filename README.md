# BYGOT LTD — Corporate Website

A deliberate, editorial one-page corporate website for **BYGOT LTD**, an independent software company incorporated in the United Kingdom.

---

## Technology Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router, Static Export `output: "export"`)
* **Core:** React 19, TypeScript
* **Graphics & Shaders:** [Three.js](https://threejs.org/) & [React Three Fiber](https://r3f.docs.pmnd.rs/) (`@react-three/fiber`) with custom GLSL vertex and fragment shaders
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Animation:** [Motion for React](https://motion.dev/) (`motion/react`)
* **Typography:** Manrope (Primary) & IBM Plex Mono (Metadata) via `next/font`
* **Quality:** ESLint flat config with `eslint-config-next`

---

## GPU Fluid Simulation Background

The website includes a real-time, 2D GPU Navier-Stokes fluid simulation rendered transparently over a clean white DOM foundation.

### Key Characteristics:
* **True Fluid Momentum & Advection:** Implements full Eulerian fluid dynamics (Splat, Vorticity Confinement, Divergence, Jacobi Pressure Solver, Gradient Subtraction, and Semi-Lagrangian Advection) using ping-pong WebGL render targets.
* **Continuous Interaction:** Mouse movements physically inject velocity and subtle pigment forces with intermediate point interpolation to prevent breaks during rapid pointer sweeps.
* **White Paper Foundation:** The underlying HTML/CSS background is pure white (`#ffffff`). The simulation outputs low-opacity pigment wash (`0.02 – 0.085` alpha range) with normal alpha blending (`THREE.NormalBlending`).
* **Restrained Editorial Palette:** Muted rust (`#A94832`), soft sand (`#D8BE9C`), and pale blush (`#E8D2C9`).
* **Performance Focused:**
  * Ping-pong FBOs at lightweight simulation resolutions (128x128 desktop / 64x64 mobile; 512x512 dye / 256x256 mobile).
  * Half-float framebuffer textures (`THREE.HalfFloatType`) with linear filtering.
  * Direct ref and uniform mutation in `useFrame` with zero React re-renders or allocations.
  * Automatically pauses simulation when tab is hidden (`document.visibilityState`).
* **Non-Interfering Layering:** Canvas is placed at `pointer-events: none; z-index: 1;` behind the content layer (`z-index: 2`), preserving all DOM interactions and jump links.
* **Accessibility & Reduced Motion:** Respects `prefers-reduced-motion` via `motion/react`, rendering a static frame.
* **Graceful WebGL Fallback:** Automatically falls back to solid CSS `#ffffff` if WebGL is unavailable.

---

## Project Structure

```text
src/
├── app/
│   ├── globals.css          # Design tokens & global styling
│   ├── layout.tsx           # Root layout, fonts, metadata, JSON-LD
│   ├── page.tsx             # Server page entrypoint
│   ├── robots.ts            # Search engine crawl rules
│   └── sitemap.ts           # XML sitemap generator
│
├── components/
│   ├── atoms/
│   │   ├── Container.tsx      # Responsive 1440px layout container
│   │   ├── SectionLabel.tsx   # Monospace section index indicators
│   │   ├── SectionHeading.tsx # Editorial typographic headings
│   │   ├── TextLink.tsx       # Refined text links (no generic pill buttons)
│   │   └── Divider.tsx        # Hairline architectural rules
│   │
│   ├── molecules/
│   │   ├── NavigationLinks.tsx # Indexed jump navigation
│   │   ├── CapabilityRow.tsx   # Hover-responsive capability rows
│   │   ├── Principle.tsx       # Architectural principle column
│   │   └── ContactDetails.tsx  # Legal & direct contact directory
│   │
│   ├── organisms/
│   │   ├── Header.tsx          # Sticky header with scroll progress & mobile nav
│   │   ├── Hero.tsx            # Asymmetrical hero with studio coordinates
│   │   ├── AboutSection.tsx    # Editorial about overview
│   │   ├── WorkSection.tsx     # What We Build section
│   │   ├── PrinciplesSection.tsx # Architectural 3-column principles
│   │   ├── ContactSection.tsx  # Direct & registered office directory
│   │   ├── Footer.tsx          # Minimal footer with back-to-top jump
│   │   └── fluid-background/   # GPU Navier-Stokes fluid background
│   │       ├── FluidBackground.tsx
│   │       ├── FluidSimulation.tsx
│   │       ├── DoubleRenderTarget.ts
│   │       └── shaders/
│   │           ├── fullscreen.vert.ts
│   │           ├── splat.frag.ts
│   │           ├── curl.frag.ts
│   │           ├── vorticity.frag.ts
│   │           ├── divergence.frag.ts
│   │           ├── pressure.frag.ts
│   │           ├── gradientSubtract.frag.ts
│   │           ├── advection.frag.ts
│   │           └── display.frag.ts
│   │
│   └── templates/
│       └── HomeTemplate.tsx    # Composed one-page template

│
├── lib/
│   └── company.ts           # Server-side company config & JSON-LD
│
└── types/
    └── company.ts           # TypeScript definitions
```

---

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Configure local environment variables

Copy the template:

```bash
cp .env.example .env.local
```

Populate `.env.local` with development values. `.env.local` is ignored by Git.

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Configure the following variables in your environment or hosting provider:

```env
COMPANY_LEGAL_NAME=
COMPANY_NUMBER=
COMPANY_ADDRESS_LINE_1=
COMPANY_ADDRESS_LINE_2=
COMPANY_CITY=
COMPANY_COUNTY=
COMPANY_POSTCODE=
COMPANY_COUNTRY=
COMPANY_PHONE=
COMPANY_EMAIL=
SITE_URL=
```

### Important Privacy & Security Note

> [!IMPORTANT]
> Company details stored in environment variables are excluded from Git to prevent accidental commits. However, any values rendered into the static website become part of the publicly visible HTML.
>
> Environment variables prevent committing sensitive contact/legal information into version control; they do **not** keep rendered company details private from public visitors.
>
> Never add private credentials, passwords, API secrets, Google verification tokens, or D-U-N-S numbers to this configuration.

---

## Production Build & Static Export

To build the static site for production:

```bash
npm run build
```

This generates optimized, pre-rendered static assets in the `out/` directory.

To run linting:

```bash
npm run lint
```

---

## Deployment (Vercel)

This project is configured for deployment to [Vercel](https://vercel.com/):

1. Import the `bygot-ltd` repository in Vercel.
2. In **Project Settings → Environment Variables**, add each of the variables listed above.
3. Deploy. The static site will build and publish automatically.
