# Aquajett Marketing Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the full premium Aquajett Water Heaters marketing site inside the existing `aquajett/` Vite + React + TypeScript scaffold, per `docs/superpowers/specs/2026-08-09-aquajett-marketing-site-design.md`.

**Architecture:** Single scrolling page (no router), CSS Modules per component over a centralized token system, data-driven content (`src/data/*.ts`), a reusable `ImagePlaceholder` standing in for unavailable real photography, hand-built scroll-reveal via `IntersectionObserver`, `lucide-react` for icons.

**Tech Stack:** React 19, TypeScript, Vite 8, CSS Modules, `lucide-react`, `@fontsource-variable/plus-jakarta-sans`, `@fontsource-variable/inter`. No router, no state library, no animation library, no test framework (see Global Constraints).

## Global Constraints

- All work happens inside `c:\Users\Wyrlo\projects\Aquajett\aquajett`. Never scaffold a new Vite project.
- **No git commits, ever.** This is not a git repository and the project owner has explicitly said not to commit and not to run `git init`. Every task ends with "stop for manual review" instead of a commit step.
- **No automated test framework is introduced.** The project owner tests every phase manually in the browser. Each task ends with (a) `npm run build` to catch TypeScript errors, and (b) a concrete manual-verification checklist for the human to run via `npm run dev` — never a `pytest`/`vitest`-style automated assertion step.
- **Do not fabricate content.** Product specs, prices, warranty, certifications, technical specs, install duration, payment methods, reviews, history, or stats are never invented. Anything not explicitly given in the design doc's data content (§8) is presented as "contact Aquajett" instead.
- **No real product/installation/hero photography exists yet.** Every image slot renders `ImagePlaceholder` (Task 2) via an optional `image?: string` data field. Never invent a fake photo path or use an external stock image URL.
- Colors are exactly: `--color-primary:#073B5C; --color-primary-dark:#052B43; --color-accent:#00AFC1; --color-accent-light:#DDF7FA; --color-background:#F5F9FB; --color-white:#FFFFFF; --color-text:#102A43; --color-text-secondary:#526777; --color-border:#D9E5EA; --color-success:#16845B`. Never hardcode a hex value in a component — always use the `var(--color-*)` tokens from `src/styles/tokens.css`.
- Styling is CSS Modules (`Component.module.css`) for every component; global tokens/resets/animations live in plain (non-module) CSS imported once in `main.tsx`.
- Motion: only `transform`/`opacity`/`clip-path` are animated, never `width`/`height`/`top`/`left`. Every animation/transition must degrade gracefully under `prefers-reduced-motion: reduce` (handled globally in Task 1, plus per-component overrides where noted).
- Every interactive element is a real `<button>` or `<a>` — never a `<div onClick>`. Every interactive element has a visible focus state (global focus-ring from Task 1 covers this by default).
- Minimum touch target is 44px on interactive controls.
- No new dependencies beyond `lucide-react`, `@fontsource-variable/plus-jakarta-sans`, `@fontsource-variable/inter`.

---

## Task 1: Foundation — Tokens, Global Styles, Fonts, Cleanup

**Files:**
- Create: `aquajett/src/styles/tokens.css`
- Create: `aquajett/src/styles/globals.css`
- Create: `aquajett/src/styles/animations.css`
- Create: `aquajett/src/data/nav.ts`
- Create: `aquajett/src/assets/logo/aquajett-primary-logo.png` (moved)
- Create: `aquajett/src/assets/logo/aquajett-mark.png` (moved)
- Create: `aquajett/src/assets/logo/aquajett-favicon.png` (moved)
- Create: `aquajett/src/assets/images/hero/README.md`
- Create: `aquajett/src/assets/images/products/README.md`
- Create: `aquajett/src/assets/images/installations/README.md`
- Create: `aquajett/src/assets/images/general/README.md`
- Modify: `aquajett/src/main.tsx`
- Modify: `aquajett/src/App.tsx` (temporary minimal placeholder — replaced fully in Task 18)
- Modify: `aquajett/package.json` (new dependencies)
- Delete: `aquajett/src/App.css`
- Delete: `aquajett/src/assets/react.svg`
- Delete: `aquajett/src/assets/vite.svg`
- Delete: `aquajett/src/assets/hero.png`
- Delete: `aquajett/public/icons.svg`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: CSS custom properties (`--color-*`, `--space-*`, `--radius-*`, `--shadow-*`, `--duration-*`, `--ease-*`, `--container-max`, `--font-heading`, `--font-body`, `--text-*`) usable via `var(--token-name)` in every later component. Global classes `.reveal`, `.reveal-scale`, `.reveal-visible` (animations.css) usable as plain string class names. `NavItem` type + `navItems` array + `contactInfo` object exported from `src/data/nav.ts`, consumed by every later navigation/contact component.

- [ ] **Step 1: Install dependencies**

Run inside `aquajett/`:
```bash
npm install lucide-react @fontsource-variable/plus-jakarta-sans @fontsource-variable/inter
```

- [ ] **Step 2: Move real brand assets into `src/assets/logo/`**

Move (don't copy-and-leave-behind) the three existing files:
- `src/assets/aquajett-primary-logo.png` → `src/assets/logo/aquajett-primary-logo.png`
- `src/assets/aquajett-mark.png` → `src/assets/logo/aquajett-mark.png`
- `src/assets/aquajett-favicon.png` → `src/assets/logo/aquajett-favicon.png`

- [ ] **Step 3: Delete unused Vite-starter assets**

These are only referenced by the current `App.tsx`/`App.css`, which this task replaces — confirmed unused by anything else in the repo:
```bash
rm aquajett/src/assets/react.svg aquajett/src/assets/vite.svg aquajett/src/assets/hero.png aquajett/public/icons.svg aquajett/src/App.css
```

- [ ] **Step 4: Create image asset placeholder folders**

Create `src/assets/images/hero/README.md`, `src/assets/images/products/README.md`, `src/assets/images/installations/README.md`, `src/assets/images/general/README.md`, each containing:
```markdown
# Real photos go here

Drop real Aquajett photography into this folder, then import it in the
relevant entry of `src/data/products.ts`, `src/data/installations.ts`, or
the hero's `image` prop in `src/components/hero/Hero.tsx`, and pass it as
the `image` value. No component changes are required — the `ImagePlaceholder`
component automatically stops rendering once a real `image` value is present.
```

- [ ] **Step 5: Write `src/styles/tokens.css`**

```css
:root {
  /* Colors */
  --color-primary: #073B5C;
  --color-primary-dark: #052B43;
  --color-accent: #00AFC1;
  --color-accent-light: #DDF7FA;
  --color-background: #F5F9FB;
  --color-white: #FFFFFF;
  --color-text: #102A43;
  --color-text-secondary: #526777;
  --color-border: #D9E5EA;
  --color-success: #16845B;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;
  --space-32: 8rem;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(7, 59, 92, 0.06), 0 1px 1px rgba(7, 59, 92, 0.04);
  --shadow-md: 0 8px 24px rgba(7, 59, 92, 0.1), 0 2px 6px rgba(7, 59, 92, 0.06);
  --shadow-lg: 0 20px 48px rgba(7, 59, 92, 0.14), 0 6px 16px rgba(7, 59, 92, 0.08);

  /* Motion */
  --duration-fast: 180ms;
  --duration-standard: 300ms;
  --duration-large: 550ms;
  --duration-ambient: 5000ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

  /* Layout */
  --container-max: 1280px;
  --container-padding: 1.25rem;

  /* Typography */
  --font-heading: 'Plus Jakarta Sans Variable', system-ui, sans-serif;
  --font-body: 'Inter Variable', system-ui, sans-serif;
  --text-hero: clamp(2.5rem, 7vw, 5.5rem);
  --text-section: clamp(2rem, 4vw, 3.5rem);
  --text-lg: 1.125rem;
  --text-base: 1rem;
  --text-sm: 0.875rem;
}
```

- [ ] **Step 6: Write `src/styles/globals.css`**

```css
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

section[id] {
  scroll-margin-top: 88px;
}

body {
  margin: 0;
  min-width: 320px;
  background: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  color: var(--color-primary-dark);
  line-height: 1.15;
  margin: 0;
}

p {
  margin: 0;
}

ul, ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

img {
  max-width: 100%;
  display: block;
}

button {
  font-family: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}

:focus-visible {
  outline: 3px solid rgba(0, 175, 193, 0.35);
  outline-offset: 3px;
  border-radius: 4px;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 7: Write `src/styles/animations.css`**

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes steamDrift {
  0% { transform: translateY(0) scaleX(1); opacity: 0.35; }
  50% { transform: translateY(-14px) scaleX(1.05); opacity: 0.55; }
  100% { transform: translateY(-28px) scaleX(1); opacity: 0; }
}

@keyframes floatParticle {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-16px) translateX(6px); }
}

@keyframes waterFlowDash {
  to { stroke-dashoffset: -40; }
}

.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity var(--duration-large) var(--ease-out),
              transform var(--duration-large) var(--ease-out);
}
.reveal.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-scale {
  opacity: 0;
  transform: scale(0.96);
  transition: opacity var(--duration-large) var(--ease-out),
              transform var(--duration-large) var(--ease-out);
}
.reveal-scale.reveal-visible {
  opacity: 1;
  transform: scale(1);
}

@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal-scale {
    transform: none;
    transition: opacity var(--duration-standard) linear;
  }
}
```

- [ ] **Step 8: Write `src/data/nav.ts`**

```ts
export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Products', href: '#products' },
  { label: 'Services', href: '#installation-process' },
  { label: 'Installations', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const contactInfo = {
  phone: '(049) 539 5785',
  phoneHref: 'tel:+63495395785',
  mobile: '+63 915 500 0830',
  mobileHref: 'tel:+639155000830',
  email: 'aquajett.sales@gmail.com',
  emailHref: 'mailto:aquajett.sales@gmail.com',
  facebook: 'https://www.facebook.com/aquajett.tagaytay/',
  address:
    'Unit R Level 2 CM 1 Amable Bldg., Sta. Rosa Heights, Brgy. Puting Kahoy, Silang, Cavite (Sta. Rosa - Tagaytay Road)',
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=Amable+Bldg+Sta+Rosa+Heights+Brgy+Puting+Kahoy+Silang+Cavite',
} as const;
```

- [ ] **Step 9: Rewrite `src/main.tsx`**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource-variable/inter';
import './styles/tokens.css';
import './styles/globals.css';
import './styles/animations.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 10: Replace `src/App.tsx` with a temporary placeholder**

This is replaced fully with the real page composition in Task 18. For now it just proves the foundation renders correctly:

```tsx
function App() {
  return (
    <main style={{ minHeight: '100svh', display: 'grid', placeItems: 'center' }}>
      <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
        Aquajett — foundation ready.
      </p>
    </main>
  );
}

export default App;
```

- [ ] **Step 11: Build check**

Run: `npm run build`
Expected: succeeds with no TypeScript or Vite errors.

- [ ] **Step 12: Manual verification (do this yourself)**

Run `npm run dev`, open the printed local URL:
- Page background is the soft off-white `#F5F9FB`, text reads "Aquajett — foundation ready." in a deep-blue serif-free heading font.
- Open browser devtools → Network tab → confirm two `.woff2` font files load from `localhost`, not from `fonts.googleapis.com`.
- No console errors.

- [ ] **Step 13: Stop for manual review — do not commit**

---

## Task 2: UI Primitives & Hooks

**Files:**
- Create: `aquajett/src/hooks/useScrollReveal.ts`
- Create: `aquajett/src/hooks/useMediaQuery.ts`
- Create: `aquajett/src/hooks/useLockBodyScroll.ts`
- Create: `aquajett/src/components/ui/Container.tsx`
- Create: `aquajett/src/components/ui/Container.module.css`
- Create: `aquajett/src/components/ui/Button.tsx`
- Create: `aquajett/src/components/ui/Button.module.css`
- Create: `aquajett/src/components/ui/SectionHeading.tsx`
- Create: `aquajett/src/components/ui/SectionHeading.module.css`
- Create: `aquajett/src/components/ui/ImagePlaceholder.tsx`
- Create: `aquajett/src/components/ui/ImagePlaceholder.module.css`
- Create: `aquajett/src/components/ui/RevealOnScroll.tsx`

**Interfaces:**
- Consumes: tokens/global classes from Task 1.
- Produces: `useScrollReveal<T extends HTMLElement>() → { ref: RefObject<T | null>, isVisible: boolean }`; `useMediaQuery(query: string) → boolean`; `useLockBodyScroll(locked: boolean) → void`; `<Container as?, className?, children>`; `<Button variant?, href?, onClick?, type?, showArrow?, icon?, className?, children>`; `<SectionHeading eyebrow?, title, description?, align?>`; `<ImagePlaceholder icon?, label, className?>`; `<RevealOnScroll variant?, delayMs?, className?, children>`. All later tasks import these exact names from these exact paths.

- [ ] **Step 1: Write `src/hooks/useScrollReveal.ts`**

```ts
import { useEffect, useRef, useState } from 'react';

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
```

- [ ] **Step 2: Write `src/hooks/useMediaQuery.ts`**

```ts
import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const getMatch = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false);
  const [matches, setMatches] = useState(getMatch);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener('change', listener);
    return () => mediaQueryList.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
```

- [ ] **Step 3: Write `src/hooks/useLockBodyScroll.ts`**

```ts
import { useEffect } from 'react';

export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [locked]);
}
```

- [ ] **Step 4: Write `src/components/ui/Container.tsx` and its CSS module**

`Container.tsx`:
```tsx
import type { ElementType, ReactNode } from 'react';
import styles from './Container.module.css';

interface ContainerProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

export function Container({ children, as: Tag = 'div', className }: ContainerProps) {
  return <Tag className={[styles.container, className].filter(Boolean).join(' ')}>{children}</Tag>;
}
```

`Container.module.css`:
```css
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-padding);
}
```

- [ ] **Step 5: Write `src/components/ui/Button.tsx` and its CSS module**

`Button.tsx`:
```tsx
import type { ReactNode } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark';

interface ButtonProps {
  variant?: Variant;
  showArrow?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  'aria-label'?: string;
}

export function Button({
  variant = 'primary',
  showArrow = false,
  icon,
  children,
  className,
  href,
  target,
  rel,
  type = 'button',
  onClick,
  disabled,
  ...rest
}: ButtonProps) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ');

  const content = (
    <>
      {icon}
      <span>{children}</span>
      {showArrow && (
        <svg className={styles.arrow} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} target={target} rel={rel} onClick={onClick} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...rest}>
      {content}
    </button>
  );
}
```

Both the `<a>` and `<button>` branches now spread the same leftover `...rest` (just `aria-label` at present), so nothing passed to `Button` is silently dropped regardless of which element it renders as.

`Button.module.css`:
```css
.button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.875rem 1.75rem;
  min-height: 44px;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: var(--text-base);
  cursor: pointer;
  transition: transform var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out),
              background-color var(--duration-fast) var(--ease-out),
              color var(--duration-fast) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out);
}
.button:hover {
  transform: translateY(-2px);
}
.button:active {
  transform: translateY(0);
}

.arrow {
  transition: transform var(--duration-fast) var(--ease-out);
}
.button:hover .arrow {
  transform: translateX(4px);
}

.primary {
  background: var(--color-primary);
  color: var(--color-white);
  box-shadow: var(--shadow-sm);
}
.primary:hover {
  background: var(--color-primary-dark);
  box-shadow: var(--shadow-md);
}

.secondary {
  background: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}
.secondary:hover {
  background: var(--color-accent-light);
}

.ghost {
  background: transparent;
  color: var(--color-primary);
  border-color: transparent;
}
.ghost:hover {
  background: var(--color-accent-light);
}

.dark {
  background: var(--color-white);
  color: var(--color-primary-dark);
}
.dark:hover {
  background: var(--color-accent-light);
}
```

- [ ] **Step 6: Write `src/components/ui/SectionHeading.tsx` and its CSS module**

`SectionHeading.tsx`:
```tsx
import type { ReactNode } from 'react';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: 'left' | 'center';
}

export function SectionHeading({ eyebrow, title, description, align = 'center' }: SectionHeadingProps) {
  return (
    <div className={`${styles.heading} ${align === 'center' ? styles.center : ''}`}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
```

`SectionHeading.module.css`:
```css
.heading {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  max-width: 42rem;
}
.center {
  margin-inline: auto;
  text-align: center;
  align-items: center;
}
.eyebrow {
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-accent);
}
.title {
  font-size: var(--text-section);
  color: var(--color-primary-dark);
}
.description {
  color: var(--color-text-secondary);
  font-size: var(--text-lg);
}
```

- [ ] **Step 7: Write `src/components/ui/ImagePlaceholder.tsx` and its CSS module**

`ImagePlaceholder.tsx`:
```tsx
import type { LucideIcon } from 'lucide-react';
import { Droplet } from 'lucide-react';
import styles from './ImagePlaceholder.module.css';

interface ImagePlaceholderProps {
  icon?: LucideIcon;
  label: string;
  className?: string;
}

export function ImagePlaceholder({ icon: Icon = Droplet, label, className }: ImagePlaceholderProps) {
  return (
    <div
      className={[styles.placeholder, className].filter(Boolean).join(' ')}
      data-placeholder="true"
      role="img"
      aria-label={label}
    >
      <Icon className={styles.icon} strokeWidth={1.25} aria-hidden="true" />
    </div>
  );
}
```

`ImagePlaceholder.module.css`:
```css
.placeholder {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-accent-light) 0%, var(--color-primary) 140%);
  overflow: hidden;
}
.placeholder::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.06) 0px,
    rgba(255, 255, 255, 0.06) 2px,
    transparent 2px,
    transparent 14px
  );
}
.icon {
  position: relative;
  width: 25%;
  height: 25%;
  min-width: 40px;
  min-height: 40px;
  color: var(--color-white);
  opacity: 0.55;
}
```

- [ ] **Step 8: Write `src/components/ui/RevealOnScroll.tsx`**

No CSS module needed — it applies the global `.reveal`/`.reveal-scale` classes from `animations.css` (Task 1).

```tsx
import type { CSSProperties, ReactNode } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  variant?: 'up' | 'scale';
  delayMs?: number;
}

export function RevealOnScroll({ children, className, variant = 'up', delayMs = 0 }: RevealOnScrollProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const revealClass = variant === 'scale' ? 'reveal-scale' : 'reveal';
  const classes = [revealClass, isVisible ? 'reveal-visible' : '', className].filter(Boolean).join(' ');
  const style: CSSProperties | undefined = delayMs ? { transitionDelay: `${delayMs}ms` } : undefined;

  return (
    <div ref={ref} className={classes} style={style}>
      {children}
    </div>
  );
}
```

- [ ] **Step 9: Temporary showcase to verify visually**

Edit `src/App.tsx` to temporarily render one of each primitive (this is replaced again in Task 18):

```tsx
import { Container } from './components/ui/Container';
import { Button } from './components/ui/Button';
import { SectionHeading } from './components/ui/SectionHeading';
import { ImagePlaceholder } from './components/ui/ImagePlaceholder';
import { RevealOnScroll } from './components/ui/RevealOnScroll';

function App() {
  return (
    <main style={{ minHeight: '150svh', paddingTop: '4rem' }}>
      <Container>
        <SectionHeading eyebrow="Preview" title="UI Kit Check" description="Scroll down to see the reveal fire." />
        <div style={{ display: 'flex', gap: '1rem', margin: '2rem 0', flexWrap: 'wrap' }}>
          <Button variant="primary" showArrow>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div style={{ width: 240, height: 180 }}>
          <ImagePlaceholder label="Preview placeholder" />
        </div>
        <div style={{ marginTop: '120svh' }}>
          <RevealOnScroll>
            <p>This should fade up into view.</p>
          </RevealOnScroll>
        </div>
      </Container>
    </main>
  );
}

export default App;
```

- [ ] **Step 10: Build check**

Run: `npm run build`
Expected: succeeds with no TypeScript errors.

- [ ] **Step 11: Manual verification (do this yourself)**

Run `npm run dev`:
- Three buttons render with distinct primary/secondary/ghost styling; hovering the primary button lifts it and moves its arrow right.
- A gradient placeholder box with a centered water-drop icon renders.
- Scroll down — the "This should fade up into view." text fades and slides up once it enters the viewport (only once, not on every scroll).
- Tab through the buttons with keyboard — each shows the aqua focus ring.

- [ ] **Step 12: Stop for manual review — do not commit**

---

## Task 3: Header & Mobile Menu

**Files:**
- Create: `aquajett/src/components/navigation/MobileMenu.tsx`
- Create: `aquajett/src/components/navigation/MobileMenu.module.css`
- Create: `aquajett/src/components/layout/Header.tsx`
- Create: `aquajett/src/components/layout/Header.module.css`
- Modify: `aquajett/src/App.tsx` (render `<Header />` above the existing showcase)

**Interfaces:**
- Consumes: `Container`, `Button` (Task 2); `navItems`, `contactInfo` (Task 1).
- Produces: `<Header />` (no props) and `<MobileMenu isOpen: boolean, onClose: () => void>`, both imported by `App.tsx` in Task 18.

- [ ] **Step 1: Write `src/components/navigation/MobileMenu.tsx`**

```tsx
import { useEffect, useRef } from 'react';
import { Mail, Phone, X } from 'lucide-react';
import { contactInfo, navItems } from '../../data/nav';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      id="mobile-menu"
      className={`${styles.panel} ${isOpen ? styles.open : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!isOpen}
    >
      <div className={styles.header}>
        <button ref={closeButtonRef} type="button" className={styles.closeButton} onClick={onClose} aria-label="Close menu">
          <X size={24} aria-hidden="true" />
        </button>
      </div>

      <ul className={styles.navList}>
        {navItems.map((item, index) => (
          <li
            key={item.href}
            className={styles.navItem}
            style={{ transitionDelay: isOpen ? `${80 + index * 60}ms` : '0ms' }}
          >
            <a href={item.href} className={styles.navLink} onClick={onClose}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.contact}>
        <a href={contactInfo.mobileHref} className={styles.contactLink}>
          <Phone size={18} aria-hidden="true" /> {contactInfo.mobile}
        </a>
        <a href={contactInfo.emailHref} className={styles.contactLink}>
          <Mail size={18} aria-hidden="true" /> {contactInfo.email}
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Write `src/components/navigation/MobileMenu.module.css`**

```css
.panel {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: var(--color-white);
  display: flex;
  flex-direction: column;
  padding: var(--space-4) var(--space-6) var(--space-8);
  visibility: hidden;
  opacity: 0;
  transform: translateY(-12px);
  transition: opacity var(--duration-standard) var(--ease-out),
              transform var(--duration-standard) var(--ease-out),
              visibility 0s linear var(--duration-standard);
}
.panel.open {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
  transition: opacity var(--duration-standard) var(--ease-out),
              transform var(--duration-standard) var(--ease-out),
              visibility 0s;
}

.header {
  display: flex;
  justify-content: flex-end;
}
.closeButton {
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--color-primary-dark);
  border-radius: var(--radius-sm);
  cursor: pointer;
}
.closeButton:hover {
  background: var(--color-accent-light);
}

.navList {
  margin-top: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.navItem {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity var(--duration-standard) var(--ease-out),
              transform var(--duration-standard) var(--ease-out);
}
.panel.open .navItem {
  opacity: 1;
  transform: translateY(0);
}

.navLink {
  display: block;
  padding: var(--space-3) 0;
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-primary-dark);
  border-bottom: 1px solid var(--color-border);
}

.contact {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding-top: var(--space-8);
}
.contactLink {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: 600;
  color: var(--color-primary);
}

@media (min-width: 992px) {
  .panel {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .panel, .navItem {
    transition-duration: 0.01ms;
  }
}
```

- [ ] **Step 3: Write `src/components/layout/Header.tsx`**

```tsx
import { useEffect, useState } from 'react';
import { Menu, Phone } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { MobileMenu } from '../navigation/MobileMenu';
import { navItems, contactInfo } from '../../data/nav';
import logo from '../../assets/logo/aquajett-primary-logo.png';
import styles from './Header.module.css';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <Container className={styles.inner}>
        <a href="#top" className={styles.logoLink} aria-label="Aquajett Water Heaters home">
          <img src={logo} alt="Aquajett Water Heaters" className={styles.logo} />
        </a>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button
            href={contactInfo.mobileHref}
            variant="primary"
            icon={<Phone size={16} aria-hidden="true" />}
            className={styles.desktopCta}
          >
            Contact Us
          </Button>
          <button
            type="button"
            className={styles.menuButton}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={26} aria-hidden="true" />
          </button>
        </div>
      </Container>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
```

- [ ] **Step 4: Write `src/components/layout/Header.module.css`**

```css
.header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: transparent;
  border-bottom: 1px solid transparent;
  transition: background-color var(--duration-standard) var(--ease-out),
              border-color var(--duration-standard) var(--ease-out),
              box-shadow var(--duration-standard) var(--ease-out);
}
.header.scrolled {
  background: rgba(255, 255, 255, 0.92);
  border-bottom-color: var(--color-border);
  box-shadow: var(--shadow-sm);
}

.inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: var(--space-4);
}

.logoLink {
  display: inline-flex;
}
.logo {
  height: 32px;
  width: auto;
}

.nav {
  display: none;
}
.navList {
  display: flex;
  gap: var(--space-8);
}
.navLink {
  font-weight: 600;
  font-size: var(--text-sm);
  color: var(--color-primary-dark);
  padding-block: var(--space-2);
  position: relative;
}
.navLink::after {
  content: '';
  position: absolute;
  left: 0;
  right: 100%;
  bottom: -2px;
  height: 2px;
  background: var(--color-accent);
  transition: right var(--duration-fast) var(--ease-out);
}
.navLink:hover::after,
.navLink:focus-visible::after {
  right: 0;
}

.actions {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}
.desktopCta {
  display: none;
}

.menuButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  color: var(--color-primary-dark);
  cursor: pointer;
  border-radius: var(--radius-sm);
}
.menuButton:hover {
  background: var(--color-accent-light);
}

@media (min-width: 992px) {
  .nav {
    display: block;
  }
  .desktopCta {
    display: inline-flex;
  }
  .menuButton {
    display: none;
  }
  .logo {
    height: 36px;
  }
}
```

- [ ] **Step 5: Wire into `App.tsx` temporarily**

Add `import { Header } from './components/layout/Header';` and render `<Header />` as the first element inside the returned `<main>`'s parent (wrap the existing Task 2 showcase content in a fragment with `<Header />` above it).

- [ ] **Step 6: Build check**

Run: `npm run build`
Expected: succeeds with no TypeScript errors.

- [ ] **Step 7: Manual verification (do this yourself)**

Run `npm run dev`:
- Desktop width (≥992px): logo, nav links (Products/Services/Installations/About/FAQ/Contact), and a "Contact Us" button all appear in one row; the hamburger icon is hidden.
- Scroll down — the header background fades in from transparent to white with a subtle shadow.
- Narrow the window below 992px: nav links and the desktop CTA disappear, only the logo and a hamburger button remain.
- Click the hamburger: a full-screen menu slides/fades in, nav links stagger in one after another, phone/email links are visible at the bottom.
- Press `Escape` or click the close (X) button: menu closes. Tab key moves focus into the menu's close button when it opens.

- [ ] **Step 8: Stop for manual review — do not commit**

---

## Task 4: Footer & Mobile Contact Bar

**Files:**
- Create: `aquajett/src/components/layout/Footer.tsx`
- Create: `aquajett/src/components/layout/Footer.module.css`
- Create: `aquajett/src/components/layout/MobileContactBar.tsx`
- Create: `aquajett/src/components/layout/MobileContactBar.module.css`
- Modify: `aquajett/src/App.tsx` (render `<Footer />` and `<MobileContactBar />` below the existing content)

**Interfaces:**
- Consumes: `Container` (Task 2); `navItems`, `contactInfo` (Task 1).
- Produces: `<Footer />`, `<MobileContactBar />` (no props), both imported by `App.tsx` in Task 18. Footer's root element has `id="contact"` — this is the target of the nav's "Contact" anchor link.

- [ ] **Step 1: Write `src/components/layout/Footer.tsx`**

```tsx
import { Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '../ui/Container';
import { contactInfo, navItems } from '../../data/nav';
import logo from '../../assets/logo/aquajett-primary-logo.png';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="contact">
      <Container>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <img src={logo} alt="Aquajett Water Heaters" className={styles.logo} />
            <p className={styles.tagline}>
              Supplying water heater needs in the South, Metro Manila, and nationwide.
            </p>
          </div>

          <div className={styles.column}>
            <h3 className={styles.heading}>Contact</h3>
            <ul className={styles.list}>
              <li>
                <a href={contactInfo.phoneHref} className={styles.link}>
                  <Phone size={16} aria-hidden="true" /> {contactInfo.phone}
                </a>
              </li>
              <li>
                <a href={contactInfo.mobileHref} className={styles.link}>
                  <Phone size={16} aria-hidden="true" /> {contactInfo.mobile}
                </a>
              </li>
              <li>
                <a href={contactInfo.emailHref} className={styles.link}>
                  <Mail size={16} aria-hidden="true" /> {contactInfo.email}
                </a>
              </li>
              <li>
                <a href={contactInfo.facebook} className={styles.link} target="_blank" rel="noopener noreferrer">
                  <Facebook size={16} aria-hidden="true" /> Facebook
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.heading}>Address</h3>
            <p className={styles.address}>
              <MapPin size={16} aria-hidden="true" className={styles.pin} />
              {contactInfo.address}
            </p>
          </div>

          <nav className={styles.column} aria-label="Footer">
            <h3 className={styles.heading}>Navigate</h3>
            <ul className={styles.list}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={styles.link}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <span>© {year} Aquajett Water Heaters Trading. All rights reserved.</span>
          <span>aquajettwaterheaters.com</span>
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 2: Write `src/components/layout/Footer.module.css`**

```css
.footer {
  background: var(--color-primary-dark);
  color: var(--color-accent-light);
  padding-block: var(--space-16) var(--space-8);
}

.logo {
  height: 34px;
  width: auto;
  filter: brightness(0) invert(1);
}

.grid {
  display: grid;
  gap: var(--space-8);
  grid-template-columns: 1fr;
}

.brand {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.tagline {
  color: rgba(221, 247, 250, 0.75);
  max-width: 32ch;
}

.heading {
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-white);
  margin-bottom: var(--space-4);
}

.list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: rgba(221, 247, 250, 0.85);
  transition: color var(--duration-fast) var(--ease-out);
}
.link:hover {
  color: var(--color-accent);
}

.address {
  display: flex;
  gap: var(--space-2);
  color: rgba(221, 247, 250, 0.85);
  max-width: 30ch;
}
.pin {
  flex-shrink: 0;
  margin-top: 2px;
}

.bottom {
  margin-top: var(--space-16);
  padding-top: var(--space-6);
  border-top: 1px solid rgba(221, 247, 250, 0.15);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: rgba(221, 247, 250, 0.6);
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
  }
  .bottom {
    flex-direction: row;
    justify-content: space-between;
  }
}
```

- [ ] **Step 3: Write `src/components/layout/MobileContactBar.tsx`**

```tsx
import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { contactInfo } from '../../data/nav';
import styles from './MobileContactBar.module.css';

export function MobileContactBar() {
  return (
    <div className={styles.bar} role="navigation" aria-label="Quick contact">
      <a href={contactInfo.mobileHref} className={styles.action}>
        <Phone size={20} aria-hidden="true" />
        <span>Call</span>
      </a>
      <a href={contactInfo.facebook} className={styles.action} target="_blank" rel="noopener noreferrer">
        <MessageCircle size={20} aria-hidden="true" />
        <span>Message</span>
      </a>
      <a href={contactInfo.mapsHref} className={styles.action} target="_blank" rel="noopener noreferrer">
        <MapPin size={20} aria-hidden="true" />
        <span>Directions</span>
      </a>
    </div>
  );
}
```

- [ ] **Step 4: Write `src/components/layout/MobileContactBar.module.css`**

```css
.bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  display: flex;
  background: var(--color-white);
  border-top: 1px solid var(--color-border);
  box-shadow: 0 -4px 16px rgba(7, 59, 92, 0.08);
  padding-bottom: env(safe-area-inset-bottom, 0);
}

.action {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: var(--space-3) var(--space-2);
  min-height: 56px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-primary);
}
.action:active {
  background: var(--color-accent-light);
}
.action + .action {
  border-left: 1px solid var(--color-border);
}

@media (min-width: 768px) {
  .bar {
    display: none;
  }
}
```

- [ ] **Step 5: Wire into `App.tsx` temporarily**

Import `Footer` and `MobileContactBar`, render both after the existing showcase content (Footer last section, MobileContactBar as a sibling after it).

- [ ] **Step 6: Build check**

Run: `npm run build`
Expected: succeeds with no TypeScript errors.

- [ ] **Step 7: Manual verification (do this yourself)**

Run `npm run dev`:
- Footer renders on a dark-blue background with logo (white/inverted), contact links, address, and nav links; phone/email links are real `tel:`/`mailto:` links (hover shows the URL in the browser status area).
- At mobile widths (<768px), a fixed bar with Call/Message/Directions appears at the very bottom of the viewport and stays fixed while scrolling; it disappears at ≥768px.
- The mobile bar does not visually cover the footer content when scrolled all the way down (some bottom padding exists below the footer).

- [ ] **Step 8: Stop for manual review — do not commit**

---

## Task 5: Content Data — Products, Installations, FAQ

**Files:**
- Create: `aquajett/src/data/products.ts`
- Create: `aquajett/src/data/installations.ts`
- Create: `aquajett/src/data/faq.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: `Product` type + `products: Product[]` (Task 7 consumes); `Installation` type + `installations: Installation[]` (Tasks 12–13 consume); `FaqItem` type + `faqItems: FaqItem[]` (Task 16 consumes).

- [ ] **Step 1: Write `src/data/products.ts`**

```ts
export interface Product {
  id: string;
  name: string;
  intendedUse: string;
  features: string[];
  image?: string;
}

export const products: Product[] = [
  {
    id: 'supreme-v2-singlepoint',
    name: 'SUPREME V2 Singlepoint',
    intendedUse: 'Built for a single shower point — ideal where one fixture needs reliable hot water.',
    features: [
      'Fully automatic operation',
      'Adjustable temperature',
      'Temperature indicator',
      'Temperature selector',
      'Splash-proof casing',
    ],
  },
  {
    id: 'supreme-v2-multipoint',
    name: 'SUPREME V2 Multipoint',
    intendedUse: 'Designed to serve multiple water fixtures throughout the home from one unit.',
    features: [
      'Fully automatic operation',
      'Adjustable temperature',
      'Temperature indicator',
      'Temperature selector',
      'Splash-proof casing',
      'IPX4 splash protection',
      'Standard installation fittings included',
    ],
  },
  {
    id: 'extreme-b-v2-multipoint',
    name: 'EXTREME/B V2 Multipoint',
    intendedUse: 'Designed to serve multiple water fixtures throughout the home from one unit.',
    features: [
      'Fully automatic operation',
      'Adjustable temperature',
      'Temperature indicator',
      'Temperature selector',
      'Splash-proof casing',
      'IPX4 splash protection',
      'Standard installation fittings included',
    ],
  },
];
```

- [ ] **Step 2: Write `src/data/installations.ts`**

```ts
export interface Installation {
  id: string;
  location: string;
  area: string;
  image?: string;
}

export const installations: Installation[] = [
  { id: 'uptown-place-tower-3', location: 'Uptown Place Tower 3', area: 'BGC, Taguig City' },
  { id: 'regency-executive-townhomes', location: 'Regency Executive Townhomes', area: 'Dasmariñas, Cavite' },
  { id: 'paws-and-play-pet-hotel', location: 'Paws & Play Pet Hotel by Village Vet', area: 'South Forbes, Silang, Cavite' },
  { id: 'royale-tagaytay-estates', location: 'Royale Tagaytay Estates', area: 'Alfonso, Cavite' },
  { id: 'green-2-residences', location: 'Green 2 Residences by SMDC', area: 'Dasmariñas, Cavite' },
  { id: 'bellavita-subdivision', location: 'Bellavita Subdivision', area: 'General Trias, Cavite' },
  { id: 'north-greenhills', location: 'North Greenhills', area: 'San Juan City' },
  { id: 'margaret-homes', location: 'Margaret Homes', area: 'Sta. Maria, Bulacan' },
  { id: 'sta-rosa-heights', location: 'Sta. Rosa Heights Subdivision', area: 'Silang, Cavite' },
  { id: 'tagaytay-country-homes-3', location: 'Tagaytay Country Homes 3', area: 'Tagaytay' },
  { id: 'kaytambog', location: 'Kaytambog', area: 'Indang, Cavite' },
  { id: 'wind-residences-tagaytay', location: 'Wind Residences Tagaytay', area: 'Tagaytay' },
  { id: 'project-4', location: 'Project 4', area: 'Quezon City' },
  { id: 'kasa-luntian-tagaytay', location: 'Kasa Luntian Tagaytay by Alveo Land', area: 'Tagaytay' },
];
```

- [ ] **Step 3: Write `src/data/faq.ts`**

```ts
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    id: 'coverage',
    question: 'What areas does Aquajett serve?',
    answer:
      'Aquajett Water Heaters Trading supplies water heaters and installation services in the South, Metro Manila, and nationwide.',
  },
  {
    id: 'singlepoint-vs-multipoint',
    question: "What's the difference between Singlepoint and Multipoint water heaters?",
    answer:
      'A Singlepoint water heater serves one shower point. A Multipoint water heater is designed to serve multiple water fixtures throughout the home from a single unit.',
  },
  {
    id: 'installation',
    question: 'Does Aquajett install the water heaters it sells?',
    answer:
      'Yes. Aquajett provides delivery and installation services after you choose a model and discuss your needs with the team.',
  },
  {
    id: 'features',
    question: 'What features do Aquajett water heaters have?',
    answer:
      'Documented features include fully automatic operation, adjustable temperature, a temperature indicator and selector, and splash-proof casing. The documented Multipoint models also include IPX4 splash protection and standard installation fittings.',
  },
  {
    id: 'pricing-warranty',
    question: 'What about pricing, warranty, or payment options?',
    answer:
      "Pricing, warranty terms, and payment options aren't published here. Call, message, or email Aquajett directly and the team will walk you through current details.",
  },
  {
    id: 'contact',
    question: 'How can I reach Aquajett?',
    answer:
      'Call (049) 539 5785, mobile/message +63 915 500 0830, email aquajett.sales@gmail.com, or message the Aquajett Facebook page.',
  },
];
```

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: succeeds with no TypeScript errors (these files aren't imported anywhere yet, so this mainly confirms valid TypeScript syntax).

- [ ] **Step 5: Manual verification (do this yourself)**

Open each of the three new files and confirm the content reads correctly and matches the source material (product names, all 14 installation locations, FAQ answers) — no automated check can catch a copy mistake here, so this file is worth a careful read.

- [ ] **Step 6: Stop for manual review — do not commit**

---

## Task 6: Hero Section

**Files:**
- Create: `aquajett/src/components/hero/Hero.tsx`
- Create: `aquajett/src/components/hero/Hero.module.css`
- Modify: `aquajett/src/App.tsx` (render `<Hero />` in place of the Task 2 showcase)

**Interfaces:**
- Consumes: `Container`, `Button`, `ImagePlaceholder` (Task 2); `contactInfo` (Task 1).
- Produces: `<Hero />` (no props), imported by `App.tsx` in Task 18. Renders `<section id="top">` — the header logo's `href="#top"` (Task 3) targets this.

- [ ] **Step 1: Write `src/components/hero/Hero.tsx`**

```tsx
import { Droplet, MessageCircle } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';
import { contactInfo } from '../../data/nav';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.particles} aria-hidden="true">
        <span className={styles.particle} />
        <span className={styles.particle} />
        <span className={styles.particle} />
      </div>

      <Container className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>Aquajett Water Heaters Trading</span>
          <h1 className={styles.heading}>Feel the Comfort of Hot Water.</h1>
          <p className={styles.description}>
            Reliable water heating for comfortable mornings, relaxing showers, and everyday living.
          </p>
          <div className={styles.actions}>
            <Button href="#products" variant="primary" showArrow>
              Find Your Water Heater
            </Button>
            <Button href={contactInfo.mobileHref} variant="secondary" icon={<MessageCircle size={18} aria-hidden="true" />}>
              Talk to Aquajett
            </Button>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.imageFrame}>
            <ImagePlaceholder icon={Droplet} label="Aquajett water heater in a home bathroom" />
            <div className={styles.steam} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Write `src/components/hero/Hero.module.css`**

```css
.hero {
  position: relative;
  overflow: hidden;
  padding-block: calc(var(--space-16) + var(--space-8)) var(--space-16);
}

.backdrop {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, var(--color-accent-light) 0%, var(--color-background) 65%);
  z-index: -2;
  opacity: 0;
  animation: fadeUp var(--duration-large) var(--ease-out) forwards;
}

.particles {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}
.particle {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(0, 175, 193, 0.25);
  animation: floatParticle 6s var(--ease-in-out) infinite;
}
.particle:nth-child(1) {
  top: 20%;
  left: 12%;
  animation-delay: 0s;
}
.particle:nth-child(2) {
  top: 60%;
  left: 80%;
  animation-delay: 1.5s;
}
.particle:nth-child(3) {
  top: 40%;
  left: 50%;
  animation-delay: 3s;
}

.inner {
  display: flex;
  flex-direction: column-reverse;
  gap: var(--space-12);
  align-items: center;
}

.content {
  max-width: 42rem;
  text-align: center;
  opacity: 0;
  animation: fadeUp var(--duration-large) var(--ease-out) 200ms forwards;
}

.eyebrow {
  display: inline-block;
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: var(--space-4);
}

.heading {
  font-size: var(--text-hero);
  color: var(--color-primary-dark);
  letter-spacing: -0.02em;
}

.description {
  margin-top: var(--space-6);
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  max-width: 40ch;
  margin-inline: auto;
}

.actions {
  margin-top: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.actions > * {
  width: 100%;
  justify-content: center;
}

.visual {
  width: 100%;
  max-width: 22rem;
  opacity: 0;
  animation: scaleIn var(--duration-large) var(--ease-out) 100ms forwards;
}

.imageFrame {
  position: relative;
  aspect-ratio: 4 / 5;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.steam {
  position: absolute;
  top: 6%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}
.steam span {
  width: 6px;
  height: 40px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.55);
  animation: steamDrift 3.5s ease-in-out infinite;
}
.steam span:nth-child(2) {
  animation-delay: 0.8s;
}
.steam span:nth-child(3) {
  animation-delay: 1.6s;
}

@media (min-width: 768px) {
  .content {
    text-align: left;
  }
  .description {
    margin-inline: 0;
  }
  .actions {
    flex-direction: row;
  }
  .actions > * {
    width: auto;
  }
}

@media (min-width: 992px) {
  .inner {
    flex-direction: row;
    justify-content: space-between;
  }
  .visual {
    max-width: 26rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .backdrop, .content, .visual {
    animation: none;
    opacity: 1;
  }
  .particle, .steam span {
    animation: none;
    opacity: 0;
  }
}
```

- [ ] **Step 3: Replace the Task 2 showcase in `App.tsx` with the real Hero**

`App.tsx` should now render `<Header />` then `<Hero />` then `<Footer />` then `<MobileContactBar />` (remove the leftover UI-kit showcase markup from Task 2).

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: succeeds with no TypeScript errors.

- [ ] **Step 5: Manual verification (do this yourself)**

Run `npm run dev`:
- On load, the background gradient, heading, description, buttons, and product visual each fade/scale in with a short staggered delay (not simultaneously).
- The heading reads "Feel the Comfort of Hot Water." at a large, responsive size that shrinks appropriately on narrow viewports.
- "Find Your Water Heater" scrolls to the (not yet built) Products section anchor without a full page reload. "Talk to Aquajett" opens the phone dialer intent (a `tel:` link).
- Three small aqua dots float gently in the background; a soft steam animation plays over the placeholder image.
- Enable "reduce motion" in OS accessibility settings, reload — the entrance animations and floating/steam motion should be gone but content is still fully visible.
- Resize from 320px to 1920px — no horizontal scrollbar appears at any width.

- [ ] **Step 6: Stop for manual review — do not commit**

---

## Task 7: Product Card & Product Section

**Files:**
- Create: `aquajett/src/components/products/ProductCard.tsx`
- Create: `aquajett/src/components/products/ProductCard.module.css`
- Create: `aquajett/src/components/products/ProductSection.tsx`
- Create: `aquajett/src/components/products/ProductSection.module.css`
- Modify: `aquajett/src/App.tsx` (render `<ProductSection />` after `<Hero />`)

**Interfaces:**
- Consumes: `Container`, `SectionHeading`, `ImagePlaceholder`, `RevealOnScroll` (Task 2); `products: Product[]` (Task 5); `contactInfo` (Task 1). `ProductSection` also renders `<ProductComparison />`, built in Task 8 — for this task, temporarily comment out that one line (`{/* <ProductComparison /> */}`) so the file builds; Task 8 uncomments it.
- Produces: `<ProductCard product: Product, delayMs?: number>`, `<ProductSection />` (renders `<section id="products">`, targeted by nav's "Products" link and Hero's "Find Your Water Heater" button).

- [ ] **Step 1: Write `src/components/products/ProductCard.tsx`**

```tsx
import { ArrowRight, Droplet } from 'lucide-react';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import type { Product } from '../../data/products';
import { contactInfo } from '../../data/nav';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  delayMs?: number;
}

export function ProductCard({ product, delayMs = 0 }: ProductCardProps) {
  return (
    <RevealOnScroll delayMs={delayMs} className={styles.wrapper}>
      <article className={styles.card}>
        <div className={styles.imageBox}>
          <ImagePlaceholder icon={Droplet} label={`${product.name} water heater`} />
        </div>
        <div className={styles.body}>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.use}>{product.intendedUse}</p>
          <ul className={styles.features}>
            {product.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <a className={styles.cta} href={contactInfo.mobileHref} aria-label={`Ask about the ${product.name}`}>
            Ask About This Model
            <ArrowRight size={16} className={styles.ctaArrow} aria-hidden="true" />
          </a>
        </div>
      </article>
    </RevealOnScroll>
  );
}
```

- [ ] **Step 2: Write `src/components/products/ProductCard.module.css`**

```css
.wrapper {
  height: 100%;
}
.card {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: transform var(--duration-standard) var(--ease-out),
              box-shadow var(--duration-standard) var(--ease-out),
              border-color var(--duration-standard) var(--ease-out);
}
.card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-accent);
}

.imageBox {
  aspect-ratio: 4 / 3;
  overflow: hidden;
}
.imageBox > * {
  transition: transform var(--duration-standard) var(--ease-out);
}
.card:hover .imageBox > * {
  transform: scale(1.02);
}

.body {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  flex: 1;
}
.name {
  font-size: 1.375rem;
  color: var(--color-primary-dark);
}
.use {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
}

.features {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  flex: 1;
}
.features li {
  position: relative;
  padding-left: var(--space-6);
  font-size: var(--text-sm);
  color: var(--color-text);
}
.features li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
}

.cta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: 700;
  color: var(--color-primary);
  margin-top: var(--space-2);
}
.ctaArrow {
  transition: transform var(--duration-fast) var(--ease-out);
}
.card:hover .ctaArrow {
  transform: translateX(4px);
}
```

- [ ] **Step 3: Write `src/components/products/ProductSection.tsx`**

```tsx
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { ProductCard } from './ProductCard';
import { products } from '../../data/products';
import styles from './ProductSection.module.css';

export function ProductSection() {
  return (
    <section id="products" className={styles.section}>
      <Container>
        <SectionHeading
          eyebrow="Products"
          title="Water Heating Solutions"
          description="Choose the model built for how your home uses hot water."
        />

        <div className={styles.grid}>
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} delayMs={index * 100} />
          ))}
        </div>

        {/* <ProductComparison /> — added in Task 8 */}
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Write `src/components/products/ProductSection.module.css`**

```css
.section {
  padding-block: var(--space-24);
}
.grid {
  margin-top: var(--space-12);
  display: grid;
  gap: var(--space-8);
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1200px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

- [ ] **Step 5: Wire into `App.tsx`**

Import `ProductSection` and render it directly after `<Hero />`.

- [ ] **Step 6: Build check**

Run: `npm run build`
Expected: succeeds with no TypeScript errors.

- [ ] **Step 7: Manual verification (do this yourself)**

Run `npm run dev`:
- Three product cards render: SUPREME V2 Singlepoint, SUPREME V2 Multipoint, EXTREME/B V2 Multipoint, each listing the correct feature set (only the two Multipoint cards show "IPX4 splash protection" and "Standard installation fittings included").
- Cards are stacked on mobile, 2-up around tablet width, 3-up at ≥1200px.
- Scrolling the section into view: cards fade/slide up with a slight stagger between them (not all at once).
- Hovering a card (desktop): the card lifts slightly, the placeholder image scales very slightly, the border tints aqua, and the CTA arrow nudges right.
- Clicking "Ask About This Model" opens the phone dialer (`tel:` link).

- [ ] **Step 8: Stop for manual review — do not commit**

---

## Task 8: Product Comparison (Singlepoint vs Multipoint)

**Files:**
- Create: `aquajett/src/components/products/ProductComparison.tsx`
- Create: `aquajett/src/components/products/ProductComparison.module.css`
- Modify: `aquajett/src/components/products/ProductSection.tsx` (uncomment/import `ProductComparison`)

**Interfaces:**
- Consumes: `RevealOnScroll` (Task 2); shared `waterFlowDash` keyframe (Task 1, `animations.css`).
- Produces: `<ProductComparison />` (no props), rendered inside `ProductSection` (Task 7).

- [ ] **Step 1: Write `src/components/products/ProductComparison.tsx`**

```tsx
import { useState } from 'react';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import styles from './ProductComparison.module.css';

type Mode = 'singlepoint' | 'multipoint';

const FIXTURE_POINTS: Record<Mode, { x: number; y: number }[]> = {
  singlepoint: [{ x: 260, y: 40 }],
  multipoint: [
    { x: 260, y: 20 },
    { x: 260, y: 70 },
    { x: 260, y: 120 },
  ],
};

export function ProductComparison() {
  const [mode, setMode] = useState<Mode>('singlepoint');
  const points = FIXTURE_POINTS[mode];

  return (
    <RevealOnScroll className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.tabs} role="tablist" aria-label="Singlepoint vs Multipoint">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'singlepoint'}
            className={`${styles.tab} ${mode === 'singlepoint' ? styles.tabActive : ''}`}
            onClick={() => setMode('singlepoint')}
          >
            Singlepoint
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'multipoint'}
            className={`${styles.tab} ${mode === 'multipoint' ? styles.tabActive : ''}`}
            onClick={() => setMode('multipoint')}
          >
            Multipoint
          </button>
        </div>

        <div className={styles.diagram}>
          <svg
            viewBox="0 0 320 140"
            className={styles.svg}
            role="img"
            aria-label={
              mode === 'singlepoint'
                ? 'One shower point supplied by the water heater'
                : 'Multiple fixtures supplied by the water heater'
            }
          >
            <rect x="20" y="45" width="50" height="50" rx="8" fill="var(--color-primary)" />
            {points.map((point, index) => (
              <g key={index}>
                <line
                  x1="70"
                  y1="70"
                  x2={point.x}
                  y2={point.y}
                  stroke="var(--color-accent)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="10 8"
                  className={styles.flowLine}
                />
                <circle cx={point.x} cy={point.y} r="8" fill="var(--color-accent)" />
              </g>
            ))}
          </svg>
        </div>

        <p className={styles.caption}>
          {mode === 'singlepoint'
            ? 'A Singlepoint unit supplies one shower point.'
            : 'A Multipoint unit supplies multiple water fixtures from one heater.'}
        </p>
      </div>
    </RevealOnScroll>
  );
}
```

- [ ] **Step 2: Write `src/components/products/ProductComparison.module.css`**

```css
.wrapper {
  margin-top: var(--space-16);
}
.card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  text-align: center;
}

.tabs {
  display: inline-flex;
  background: var(--color-background);
  border-radius: var(--radius-sm);
  padding: 4px;
  gap: 4px;
}
.tab {
  border: none;
  background: transparent;
  padding: var(--space-2) var(--space-6);
  min-height: 44px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: background-color var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out);
}
.tabActive {
  background: var(--color-primary);
  color: var(--color-white);
}

.diagram {
  margin-top: var(--space-8);
}
.svg {
  width: 100%;
  max-width: 320px;
  height: auto;
}
.flowLine {
  animation: waterFlowDash 1.4s linear infinite;
}

.caption {
  margin-top: var(--space-4);
  color: var(--color-text-secondary);
}

@media (prefers-reduced-motion: reduce) {
  .flowLine {
    animation: none;
  }
}
```

- [ ] **Step 3: Wire into `ProductSection.tsx`**

Replace the `{/* <ProductComparison /> — added in Task 8 */}` comment with `<ProductComparison />`, and add `import { ProductComparison } from './ProductComparison';` at the top.

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: succeeds with no TypeScript errors.

- [ ] **Step 5: Manual verification (do this yourself)**

Run `npm run dev`, scroll to the Products section:
- Below the three product cards, a card with "Singlepoint"/"Multipoint" tabs renders, defaulting to Singlepoint.
- The diagram shows one animated line from the unit to one fixture point in Singlepoint mode.
- Clicking "Multipoint" switches the diagram to show three lines/fixture points and updates the caption text; the dashed lines appear to animate flowing outward.
- Tab buttons show a visible focus ring when navigated to via keyboard, and `aria-selected` toggles correctly (check via devtools accessibility inspector or screen reader).

- [ ] **Step 6: Stop for manual review — do not commit**

---

## Task 9: Benefits Section

**Files:**
- Create: `aquajett/src/components/sections/Benefits.tsx`
- Create: `aquajett/src/components/sections/Benefits.module.css`
- Modify: `aquajett/src/App.tsx` (render `<Benefits />` after `<ProductSection />`)

**Interfaces:**
- Consumes: `Container`, `SectionHeading`, `RevealOnScroll` (Task 2).
- Produces: `<Benefits />` (no props), imported by `App.tsx` in Task 18.

- [ ] **Step 1: Write `src/components/sections/Benefits.tsx`**

```tsx
import { Droplets, Home, Shield, Smile, Sparkles, ThermometerSun } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import styles from './Benefits.module.css';

const benefits = [
  { icon: Droplets, title: 'Comfort', description: 'Warm water on demand, morning or night.' },
  { icon: ThermometerSun, title: 'Warmth', description: 'A steady, adjustable temperature for every routine.' },
  { icon: Sparkles, title: 'Cleanliness', description: 'Comfortable hot water for washing up and keeping a home fresh.' },
  { icon: Smile, title: 'Relaxation', description: 'A relaxing shower at the end of the day.' },
  { icon: Shield, title: 'Reliability', description: 'Automatic operation you can count on daily.' },
  { icon: Home, title: 'Home Confidence', description: 'Professional installation, done right.' },
];

export function Benefits() {
  return (
    <section className={styles.section} aria-label="Benefits of home hot water comfort">
      <Container>
        <SectionHeading eyebrow="Why It Matters" title="Feel the Comfort of Hot Water at Home" />
        <div className={styles.grid}>
          {benefits.map((benefit, index) => (
            <RevealOnScroll key={benefit.title} delayMs={index * 80} className={styles.item}>
              <benefit.icon className={styles.icon} strokeWidth={1.5} aria-hidden="true" />
              <h3 className={styles.title}>{benefit.title}</h3>
              <p className={styles.description}>{benefit.description}</p>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Write `src/components/sections/Benefits.module.css`**

```css
.section {
  padding-block: var(--space-24);
  background: var(--color-accent-light);
}
.grid {
  margin-top: var(--space-12);
  display: grid;
  gap: var(--space-8);
  grid-template-columns: 1fr;
  text-align: center;
}
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}
.icon {
  width: 40px;
  height: 40px;
  color: var(--color-primary);
}
.title {
  font-size: 1.125rem;
  color: var(--color-primary-dark);
}
.description {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  max-width: 26ch;
}

@media (min-width: 576px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 992px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

- [ ] **Step 3: Wire into `App.tsx`**

Import `Benefits` and render it directly after `<ProductSection />`.

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: succeeds with no TypeScript errors.

- [ ] **Step 5: Manual verification (do this yourself)**

Run `npm run dev`, scroll to the light-aqua Benefits band:
- Six tiles (Comfort, Warmth, Cleanliness, Relaxation, Reliability, Home Confidence) render, 1-column on mobile, 2-column around tablet, 3-column on desktop.
- Tiles fade up with a slight stagger as the section scrolls into view.

- [ ] **Step 6: Stop for manual review — do not commit**

---

## Task 10: Features Section

**Files:**
- Create: `aquajett/src/components/sections/Features.tsx`
- Create: `aquajett/src/components/sections/Features.module.css`
- Modify: `aquajett/src/App.tsx` (render `<Features />` after `<Benefits />`)

**Interfaces:**
- Consumes: `Container`, `SectionHeading`, `RevealOnScroll` (Task 2).
- Produces: `<Features />` (no props), imported by `App.tsx` in Task 18.

- [ ] **Step 1: Write `src/components/sections/Features.tsx`**

```tsx
import { Droplet, Gauge, ShieldCheck, Sliders, ThermometerSnowflake, Wrench } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import styles from './Features.module.css';

const features = [
  { icon: Gauge, title: 'Fully Automatic Operation', description: 'Runs automatically once installed and set.' },
  { icon: Sliders, title: 'Adjustable Temperature', description: 'Set the water temperature to your preference.' },
  { icon: ThermometerSnowflake, title: 'Temperature Indicator', description: 'See the current temperature setting at a glance.' },
  { icon: Droplet, title: 'Temperature Selector', description: 'Choose your preferred setting with ease.' },
  { icon: ShieldCheck, title: 'Splash-Proof Casing', description: 'Built to handle everyday bathroom splashes.' },
  { icon: Wrench, title: 'IPX4 & Standard Fittings', description: 'Documented on Multipoint models, with standard installation fittings included.' },
];

export function Features() {
  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading eyebrow="Built In" title="Everyday Features" />
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <RevealOnScroll key={feature.title} delayMs={index * 60} className={styles.card}>
              <feature.icon className={styles.icon} strokeWidth={1.5} aria-hidden="true" />
              <h3 className={styles.title}>{feature.title}</h3>
              <p className={styles.description}>{feature.description}</p>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Write `src/components/sections/Features.module.css`**

```css
.section {
  padding-block: var(--space-24);
}
.grid {
  margin-top: var(--space-12);
  display: grid;
  gap: var(--space-6);
  grid-template-columns: 1fr;
}
.card {
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  transition: border-color var(--duration-standard) var(--ease-out), transform var(--duration-standard) var(--ease-out);
}
.card:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
}
.icon {
  width: 32px;
  height: 32px;
  color: var(--color-accent);
}
.title {
  font-size: 1.05rem;
  color: var(--color-primary-dark);
}
.description {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
}

@media (min-width: 576px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 992px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

- [ ] **Step 3: Wire into `App.tsx`**

Import `Features` and render it directly after `<Benefits />`.

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: succeeds with no TypeScript errors.

- [ ] **Step 5: Manual verification (do this yourself)**

Run `npm run dev`, scroll to the Features section:
- Six bordered feature cards render with icon, title, short description; hovering one lifts it slightly and tints the border aqua.
- Grid is 1-column on mobile, 2 around tablet, 3 on desktop.

- [ ] **Step 6: Stop for manual review — do not commit**

---

## Task 11: Installation Process

**Files:**
- Create: `aquajett/src/components/sections/InstallationProcess.tsx`
- Create: `aquajett/src/components/sections/InstallationProcess.module.css`
- Modify: `aquajett/src/App.tsx` (render `<InstallationProcess />` after `<Features />`)

**Interfaces:**
- Consumes: `Container`, `SectionHeading` (Task 2); `useScrollReveal` (Task 2).
- Produces: `<InstallationProcess />` (no props), imported by `App.tsx` in Task 18. Renders `<section id="installation-process">` — the nav's "Services" link targets this.

- [ ] **Step 1: Write `src/components/sections/InstallationProcess.tsx`**

```tsx
import { CheckCircle2, MessageSquare, PhoneCall, Sparkles, Truck } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './InstallationProcess.module.css';

const steps = [
  { icon: CheckCircle2, title: 'Choose', description: 'Pick the water heater that fits your home.' },
  { icon: PhoneCall, title: 'Contact', description: 'Reach out by call, message, or email.' },
  { icon: MessageSquare, title: 'Discuss', description: 'Talk through your setup and needs with Aquajett.' },
  { icon: Truck, title: 'Delivery & Installation', description: 'Your unit is delivered and installed.' },
  { icon: Sparkles, title: 'Enjoy', description: 'Comfortable hot water, ready when you are.' },
];

export function InstallationProcess() {
  const { ref, isVisible } = useScrollReveal<HTMLOListElement>();

  return (
    <section id="installation-process" className={styles.section}>
      <Container>
        <SectionHeading eyebrow="Services" title="From Choice to Comfort" />
        <ol ref={ref} className={`${styles.steps} ${isVisible ? styles.visible : ''}`}>
          <span className={styles.connector} aria-hidden="true" />
          {steps.map((step, index) => (
            <li key={step.title} className={styles.step} style={{ transitionDelay: `${index * 120}ms` }}>
              <span className={styles.iconRing}>
                <step.icon size={22} aria-hidden="true" />
              </span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.description}>{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Write `src/components/sections/InstallationProcess.module.css`**

```css
.section {
  padding-block: var(--space-24);
  background: var(--color-background);
}
.steps {
  position: relative;
  margin-top: var(--space-16);
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}
.connector {
  position: absolute;
  left: 27px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-border);
}
.connector::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-accent);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 1.1s var(--ease-out);
}
.steps.visible .connector::after {
  transform: scaleY(1);
}

.step {
  position: relative;
  padding-left: 72px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--duration-large) var(--ease-out), transform var(--duration-large) var(--ease-out);
}
.steps.visible .step {
  opacity: 1;
  transform: translateY(0);
}

.iconRing {
  position: absolute;
  left: 0;
  top: 0;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-white);
  border: 2px solid var(--color-accent);
  color: var(--color-primary);
}
.title {
  color: var(--color-primary-dark);
  font-size: 1.125rem;
}
.description {
  margin-top: var(--space-2);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
}

@media (min-width: 992px) {
  .steps {
    flex-direction: row;
    gap: var(--space-4);
  }
  .connector {
    left: 28px;
    right: 28px;
    top: 27px;
    bottom: auto;
    width: auto;
    height: 2px;
  }
  .connector::after {
    transform: scaleX(0);
    transform-origin: left;
  }
  .steps.visible .connector::after {
    transform: scaleX(1);
  }
  .step {
    flex: 1;
    padding-left: 0;
    padding-top: 72px;
    text-align: center;
  }
  .iconRing {
    left: 50%;
    transform: translateX(-50%);
    top: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .connector::after, .step {
    transition-duration: 0.01ms;
  }
}
```

- [ ] **Step 3: Wire into `App.tsx`**

Import `InstallationProcess` and render it directly after `<Features />`.

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: succeeds with no TypeScript errors.

- [ ] **Step 5: Manual verification (do this yourself)**

Run `npm run dev`, scroll to the Services section:
- Five steps (Choose, Contact, Discuss, Delivery & Installation, Enjoy) render stacked vertically on mobile with a connecting line on the left that fills in downward as the section scrolls into view.
- At ≥992px, the steps lay out horizontally with a connecting line that fills left-to-right instead.
- No specific installation duration is claimed anywhere in the copy.

- [ ] **Step 6: Stop for manual review — do not commit**

---

## Task 12: Installation Card & Gallery

**Files:**
- Create: `aquajett/src/components/installations/InstallationCard.tsx`
- Create: `aquajett/src/components/installations/InstallationCard.module.css`
- Create: `aquajett/src/components/installations/InstallationGallery.tsx`
- Create: `aquajett/src/components/installations/InstallationGallery.module.css`
- Modify: `aquajett/src/App.tsx` (render `<InstallationGallery />` after `<InstallationProcess />`)

**Interfaces:**
- Consumes: `Container`, `SectionHeading`, `ImagePlaceholder`, `RevealOnScroll` (Task 2); `installations: Installation[]` (Task 5).
- Produces: `<InstallationCard installation: Installation, onOpen: () => void>`; `<InstallationGallery />` (no props), renders `<section id="gallery">` (nav's "Installations" link target). For this task, the lightbox is a temporary `alert()`-based stub — Task 13 replaces it with the real `Lightbox` component, so `InstallationGallery`'s open-state wiring doesn't need to change again in Task 13, only the render-when-open branch does.

- [ ] **Step 1: Write `src/components/installations/InstallationCard.tsx`**

```tsx
import { MapPin } from 'lucide-react';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';
import type { Installation } from '../../data/installations';
import styles from './InstallationCard.module.css';

interface InstallationCardProps {
  installation: Installation;
  onOpen: () => void;
}

export function InstallationCard({ installation, onOpen }: InstallationCardProps) {
  return (
    <button type="button" className={styles.card} onClick={onOpen}>
      <div className={styles.imageBox}>
        <ImagePlaceholder icon={MapPin} label={`Installation at ${installation.location}`} />
        <div className={styles.overlay}>
          <MapPin size={16} aria-hidden="true" />
          <span>
            {installation.location}
            <br />
            {installation.area}
          </span>
        </div>
      </div>
    </button>
  );
}
```

- [ ] **Step 2: Write `src/components/installations/InstallationCard.module.css`**

```css
.card {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border);
  padding: 0;
  cursor: pointer;
  background: none;
}
.imageBox {
  position: relative;
  width: 100%;
  height: 100%;
}
.imageBox > *:first-child {
  transition: transform var(--duration-standard) var(--ease-out);
}
.card:hover .imageBox > *:first-child,
.card:focus-visible .imageBox > *:first-child {
  transform: scale(1.03);
}

.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  gap: var(--space-2);
  padding: var(--space-4);
  color: var(--color-white);
  text-align: left;
  font-size: var(--text-sm);
  font-weight: 600;
  background: linear-gradient(180deg, rgba(5, 43, 67, 0) 40%, rgba(5, 43, 67, 0.75) 100%);
  opacity: 0.85;
  transition: opacity var(--duration-standard) var(--ease-out);
}
.card:hover .overlay,
.card:focus-visible .overlay {
  opacity: 1;
}
```

- [ ] **Step 3: Write `src/components/installations/InstallationGallery.tsx`**

```tsx
import { useState } from 'react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import { InstallationCard } from './InstallationCard';
import { installations } from '../../data/installations';
import styles from './InstallationGallery.module.css';

export function InstallationGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className={styles.section}>
      <Container>
        <SectionHeading
          eyebrow="Proof"
          title="Real Aquajett Installations"
          description="A sample of homes and properties Aquajett has supplied and installed for."
        />
        <div className={styles.grid}>
          {installations.map((installation, index) => (
            <RevealOnScroll key={installation.id} delayMs={(index % 4) * 70}>
              <InstallationCard installation={installation} onOpen={() => setActiveIndex(index)} />
            </RevealOnScroll>
          ))}
        </div>
      </Container>

      {activeIndex !== null && (
        // Temporary stub — replaced with the real Lightbox component in Task 13.
        <p style={{ position: 'fixed', bottom: 16, left: 16, background: 'white', padding: 8 }}>
          Opened: {installations[activeIndex].location}{' '}
          <button type="button" onClick={() => setActiveIndex(null)}>
            close
          </button>
        </p>
      )}
    </section>
  );
}
```

- [ ] **Step 4: Write `src/components/installations/InstallationGallery.module.css`**

```css
.section {
  padding-block: var(--space-24);
}
.grid {
  margin-top: var(--space-12);
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);
  }
}
@media (min-width: 1200px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

- [ ] **Step 5: Wire into `App.tsx`**

Import `InstallationGallery` and render it directly after `<InstallationProcess />`.

- [ ] **Step 6: Build check**

Run: `npm run build`
Expected: succeeds with no TypeScript errors.

- [ ] **Step 7: Manual verification (do this yourself)**

Run `npm run dev`, scroll to the Installations gallery:
- All 14 locations render as placeholder tiles with location/area text overlay, 2-up on mobile, 3-up on tablet, 4-up on desktop.
- Hovering/focusing a tile scales the placeholder slightly and intensifies the overlay.
- Clicking a tile shows the temporary stub confirming the correct location/index was captured (this stub is replaced in Task 13).

- [ ] **Step 8: Stop for manual review — do not commit**

---

## Task 13: Lightbox

**Files:**
- Create: `aquajett/src/components/installations/Lightbox.tsx`
- Create: `aquajett/src/components/installations/Lightbox.module.css`
- Modify: `aquajett/src/components/installations/InstallationGallery.tsx` (replace the Task 12 stub with the real `Lightbox`)

**Interfaces:**
- Consumes: `ImagePlaceholder` (Task 2); `useLockBodyScroll` (Task 2); `Installation` type (Task 5).
- Produces: `<Lightbox installations: Installation[], activeIndex: number, onClose: () => void, onNavigate: (index: number) => void>`.

- [ ] **Step 1: Write `src/components/installations/Lightbox.tsx`**

```tsx
import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, X } from 'lucide-react';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import type { Installation } from '../../data/installations';
import styles from './Lightbox.module.css';

interface LightboxProps {
  installations: Installation[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ installations, activeIndex, onClose, onNavigate }: LightboxProps) {
  useLockBodyScroll(true);
  const installation = installations[activeIndex];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNavigate((activeIndex + 1) % installations.length);
      if (event.key === 'ArrowLeft') onNavigate((activeIndex - 1 + installations.length) % installations.length);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, installations.length, onClose, onNavigate]);

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={`${installation.location} installation photo`}>
      <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
        <X size={24} aria-hidden="true" />
      </button>

      <button
        type="button"
        className={`${styles.nav} ${styles.prev}`}
        onClick={() => onNavigate((activeIndex - 1 + installations.length) % installations.length)}
        aria-label="Previous installation"
      >
        <ChevronLeft size={28} aria-hidden="true" />
      </button>

      <div className={styles.content}>
        <div className={styles.imageBox}>
          <ImagePlaceholder icon={MapPin} label={`Installation at ${installation.location}`} />
        </div>
        <div className={styles.caption}>
          <h3>{installation.location}</h3>
          <p>{installation.area}</p>
        </div>
      </div>

      <button
        type="button"
        className={`${styles.nav} ${styles.next}`}
        onClick={() => onNavigate((activeIndex + 1) % installations.length)}
        aria-label="Next installation"
      >
        <ChevronRight size={28} aria-hidden="true" />
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Write `src/components/installations/Lightbox.module.css`**

```css
.overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(5, 43, 67, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  animation: scaleIn var(--duration-standard) var(--ease-out);
}

.content {
  width: 100%;
  max-width: 32rem;
}
.imageBox {
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-md);
  overflow: hidden;
}
.caption {
  margin-top: var(--space-4);
  text-align: center;
  color: var(--color-white);
}
.caption p {
  color: rgba(255, 255, 255, 0.7);
  margin-top: var(--space-1);
}

.close {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-white);
  cursor: pointer;
}
.close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-white);
  cursor: pointer;
}
.nav:hover {
  background: rgba(255, 255, 255, 0.2);
}
.prev {
  left: var(--space-4);
}
.next {
  right: var(--space-4);
}

@media (max-width: 575px) {
  .nav {
    width: 40px;
    height: 40px;
  }
  .prev {
    left: var(--space-2);
  }
  .next {
    right: var(--space-2);
  }
}

@media (prefers-reduced-motion: reduce) {
  .overlay {
    animation: none;
  }
}
```

- [ ] **Step 3: Wire into `InstallationGallery.tsx`**

Replace the temporary stub block with:

```tsx
{activeIndex !== null && (
  <Lightbox
    installations={installations}
    activeIndex={activeIndex}
    onClose={() => setActiveIndex(null)}
    onNavigate={setActiveIndex}
  />
)}
```

Add `import { Lightbox } from './Lightbox';` at the top.

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: succeeds with no TypeScript errors.

- [ ] **Step 5: Manual verification (do this yourself)**

Run `npm run dev`, click any gallery tile:
- A full-screen dark overlay opens showing that location's placeholder image, name, and area, with a close (X) button and left/right navigation arrows.
- Left/right arrow buttons and the `ArrowLeft`/`ArrowRight` keyboard keys cycle through all 14 installations, wrapping from the last back to the first.
- `Escape` closes the lightbox. Background page scroll is locked while the lightbox is open and restored after closing.

- [ ] **Step 6: Stop for manual review — do not commit**

---

## Task 14: Coverage Section

**Files:**
- Create: `aquajett/src/components/sections/Coverage.tsx`
- Create: `aquajett/src/components/sections/Coverage.module.css`
- Modify: `aquajett/src/App.tsx` (render `<Coverage />` after `<InstallationGallery />`)

**Interfaces:**
- Consumes: `Container`, `SectionHeading`, `RevealOnScroll` (Task 2).
- Produces: `<Coverage />` (no props), imported by `App.tsx` in Task 18.

- [ ] **Step 1: Write `src/components/sections/Coverage.tsx`**

```tsx
import { MapPin } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import styles from './Coverage.module.css';

const areas = ['South', 'Metro Manila', 'Nationwide (product supply)'];

export function Coverage() {
  return (
    <section className={styles.section}>
      <Container className={styles.inner}>
        <SectionHeading
          align="left"
          eyebrow="Coverage"
          title="Serving Homes Across the Philippines"
          description="Supplying water heater needs in the South, Metro Manila, and nationwide."
        />
        <RevealOnScroll className={styles.list}>
          {areas.map((area) => (
            <div key={area} className={styles.item}>
              <MapPin size={18} aria-hidden="true" />
              <span>{area}</span>
            </div>
          ))}
        </RevealOnScroll>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Write `src/components/sections/Coverage.module.css`**

```css
.section {
  padding-block: var(--space-24);
  background: var(--color-primary);
}
.section :global(h2) {
  color: var(--color-white);
}
.section :global(span) {
  color: var(--color-accent-light);
}
.section :global(p) {
  color: rgba(255, 255, 255, 0.85);
}

.inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}
.list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background: rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-sm);
  font-weight: 600;
  color: var(--color-white);
}

@media (min-width: 768px) {
  .list {
    flex-direction: row;
  }
  .item {
    flex: 1;
  }
}
```

- [ ] **Step 3: Wire into `App.tsx`**

Import `Coverage` and render it directly after `<InstallationGallery />`.

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: succeeds with no TypeScript errors.

- [ ] **Step 5: Manual verification (do this yourself)**

Run `npm run dev`, scroll to the deep-blue Coverage band:
- Heading, eyebrow, and description all render legibly in light colors against the dark-blue background (no low-contrast dark-on-dark text).
- Three area chips (South / Metro Manila / Nationwide) render stacked on mobile, side-by-side on tablet+.
- No map coordinates or specific nationwide installation coverage claim appears — only the documented product-supply wording.

- [ ] **Step 6: Stop for manual review — do not commit**

---

## Task 15: About Section

**Files:**
- Create: `aquajett/src/components/sections/About.tsx`
- Create: `aquajett/src/components/sections/About.module.css`
- Modify: `aquajett/src/App.tsx` (render `<About />` after `<Coverage />`)

**Interfaces:**
- Consumes: `Container`, `SectionHeading`, `RevealOnScroll` (Task 2).
- Produces: `<About />` (no props), imported by `App.tsx` in Task 18. Renders `<section id="about">` (nav's "About" link target).

- [ ] **Step 1: Write `src/components/sections/About.tsx`**

```tsx
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import styles from './About.module.css';

export function About() {
  return (
    <section id="about" className={styles.section}>
      <Container className={styles.inner}>
        <SectionHeading align="left" eyebrow="About" title="About Aquajett Water Heaters Trading" />
        <RevealOnScroll className={styles.copy}>
          <p>
            Aquajett Water Heaters Trading was put up to supply your water heater needs in the South, Metro Manila,
            and nationwide.
          </p>
          <p>
            Aquajett supplies water heaters and provides delivery and installation services, helping homes get set
            up with reliable hot water.
          </p>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Write `src/components/sections/About.module.css`**

```css
.section {
  padding-block: var(--space-24);
}
.inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  max-width: 48rem;
}
.copy {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  color: var(--color-text-secondary);
  font-size: var(--text-lg);
}
```

- [ ] **Step 3: Wire into `App.tsx`**

Import `About` and render it directly after `<Coverage />`.

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: succeeds with no TypeScript errors.

- [ ] **Step 5: Manual verification (do this yourself)**

Run `npm run dev`, scroll to the About section (or click "About" in the nav — it should scroll straight to it, not hidden behind the sticky header):
- Copy is concise (two short paragraphs), matches the supplied business description exactly, and invents no company history, awards, or founding date.

- [ ] **Step 6: Stop for manual review — do not commit**

---

## Task 16: FAQ Accordion

**Files:**
- Create: `aquajett/src/components/sections/FAQ.tsx`
- Create: `aquajett/src/components/sections/FAQ.module.css`
- Modify: `aquajett/src/App.tsx` (render `<FAQ />` after `<About />`)

**Interfaces:**
- Consumes: `Container`, `SectionHeading`, `RevealOnScroll` (Task 2); `faqItems: FaqItem[]` (Task 5).
- Produces: `<FAQ />` (no props), imported by `App.tsx` in Task 18. Renders `<section id="faq">` (nav's "FAQ" link target).

- [ ] **Step 1: Write `src/components/sections/FAQ.tsx`**

```tsx
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import { faqItems } from '../../data/faq';
import styles from './FAQ.module.css';

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section id="faq" className={styles.section}>
      <Container className={styles.inner}>
        <SectionHeading eyebrow="FAQ" title="Common Questions" />
        <RevealOnScroll className={styles.list}>
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className={styles.item}>
                <h3 className={styles.questionRow}>
                  <button
                    type="button"
                    className={styles.question}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    id={`faq-trigger-${item.id}`}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                  >
                    {item.question}
                    <ChevronDown
                      size={20}
                      className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${item.id}`}
                  className={styles.panel}
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <p className={styles.answer}>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </RevealOnScroll>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Write `src/components/sections/FAQ.module.css`**

```css
.section {
  padding-block: var(--space-24);
  background: var(--color-background);
}
.inner {
  max-width: 48rem;
}
.list {
  margin-top: var(--space-8);
  display: flex;
  flex-direction: column;
}
.item {
  border-bottom: 1px solid var(--color-border);
}
.questionRow {
  margin: 0;
}
.question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  background: none;
  border: none;
  text-align: left;
  padding: var(--space-6) var(--space-2);
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-primary-dark);
  cursor: pointer;
}
.chevron {
  flex-shrink: 0;
  transition: transform var(--duration-fast) var(--ease-out);
  color: var(--color-accent);
}
.chevronOpen {
  transform: rotate(180deg);
}

.panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--duration-standard) var(--ease-out);
}
.panel > .answer {
  overflow: hidden;
  min-height: 0;
  color: var(--color-text-secondary);
  padding-bottom: var(--space-6);
  padding-inline: var(--space-2);
}

@media (prefers-reduced-motion: reduce) {
  .panel {
    transition: none;
  }
}
```

- [ ] **Step 3: Wire into `App.tsx`**

Import `FAQ` and render it directly after `<About />`.

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: succeeds with no TypeScript errors.

- [ ] **Step 5: Manual verification (do this yourself)**

Run `npm run dev`, scroll to the FAQ section:
- The first question is open by default; clicking a question smoothly expands/collapses its answer (grid-height transition, not a jump-cut).
- Only the clicked question's `aria-expanded` toggles; opening one does not force others closed (each is independent) unless you intentionally click multiple.
- Tab to a question and press Enter/Space — it toggles the same as a click. The chevron icon rotates 180° when open.
- The pricing/warranty/payment answer explicitly redirects to contacting Aquajett rather than stating a number or policy.

- [ ] **Step 6: Stop for manual review — do not commit**

---

## Task 17: Final CTA

**Files:**
- Create: `aquajett/src/components/sections/FinalCTA.tsx`
- Create: `aquajett/src/components/sections/FinalCTA.module.css`
- Modify: `aquajett/src/App.tsx` (render `<FinalCTA />` after `<FAQ />`, before `<Footer />`)

**Interfaces:**
- Consumes: `Container`, `Button`, `RevealOnScroll` (Task 2); `contactInfo` (Task 1).
- Produces: `<FinalCTA />` (no props), imported by `App.tsx` in Task 18.

- [ ] **Step 1: Write `src/components/sections/FinalCTA.tsx`**

```tsx
import { MessageCircle } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import { contactInfo } from '../../data/nav';
import styles from './FinalCTA.module.css';

export function FinalCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      <Container>
        <RevealOnScroll className={styles.content}>
          <h2 className={styles.heading}>Get the Right Water Heater for Your Home</h2>
          <p className={styles.description}>
            Contact Aquajett Water Heaters Trading for product information, delivery, and installation inquiries.
          </p>
          <div className={styles.actions}>
            <Button href={contactInfo.mobileHref} variant="dark" icon={<MessageCircle size={18} aria-hidden="true" />}>
              Talk to Aquajett
            </Button>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Write `src/components/sections/FinalCTA.module.css`**

```css
.section {
  position: relative;
  overflow: hidden;
  padding-block: var(--space-24);
  background: var(--color-primary-dark);
  text-align: center;
}
.glow {
  position: absolute;
  top: -20%;
  left: 50%;
  width: 60vw;
  height: 60vw;
  max-width: 640px;
  max-height: 640px;
  transform: translateX(-50%);
  background: radial-gradient(circle, rgba(0, 175, 193, 0.25) 0%, transparent 70%);
  animation: floatParticle 8s var(--ease-in-out) infinite;
  pointer-events: none;
}
.content {
  position: relative;
  max-width: 40rem;
  margin-inline: auto;
}
.heading {
  font-size: var(--text-section);
  color: var(--color-white);
}
.description {
  margin-top: var(--space-4);
  color: rgba(221, 247, 250, 0.85);
  font-size: var(--text-lg);
}
.actions {
  margin-top: var(--space-8);
  display: flex;
  justify-content: center;
}

@media (prefers-reduced-motion: reduce) {
  .glow {
    animation: none;
  }
}
```

- [ ] **Step 3: Wire into `App.tsx`**

Import `FinalCTA` and render it directly after `<FAQ />` and before `<Footer />`.

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: succeeds with no TypeScript errors.

- [ ] **Step 5: Manual verification (do this yourself)**

Run `npm run dev`, scroll to the dark band just above the footer:
- Heading, description, and a "Talk to Aquajett" button render centered on a deep-blue background.
- A soft aqua glow drifts gently behind the content; it stops moving with reduced motion enabled.

- [ ] **Step 6: Stop for manual review — do not commit**

---

## Task 18: Final Assembly — App.tsx, index.html SEO, Favicon

**Files:**
- Modify: `aquajett/src/App.tsx` (replace with the final, complete section order)
- Create: `aquajett/src/App.module.css`
- Modify: `aquajett/index.html` (title, meta description, JSON-LD, favicon link)
- Create: `aquajett/public/aquajett-favicon.png` (copied from `src/assets/logo/aquajett-favicon.png`)

**Interfaces:**
- Consumes: every component produced in Tasks 3–17.
- Produces: the fully assembled page. Nothing later depends on this task except Task 19 (QA).

- [ ] **Step 1: Copy the favicon into `public/`**

```bash
cp aquajett/src/assets/logo/aquajett-favicon.png aquajett/public/aquajett-favicon.png
```

- [ ] **Step 2: Write the final `src/App.tsx`**

```tsx
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileContactBar } from './components/layout/MobileContactBar';
import { Hero } from './components/hero/Hero';
import { ProductSection } from './components/products/ProductSection';
import { Benefits } from './components/sections/Benefits';
import { Features } from './components/sections/Features';
import { InstallationProcess } from './components/sections/InstallationProcess';
import { InstallationGallery } from './components/installations/InstallationGallery';
import { Coverage } from './components/sections/Coverage';
import { About } from './components/sections/About';
import { FAQ } from './components/sections/FAQ';
import { FinalCTA } from './components/sections/FinalCTA';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Hero />
        <ProductSection />
        <Benefits />
        <Features />
        <InstallationProcess />
        <InstallationGallery />
        <Coverage />
        <About />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileContactBar />
    </div>
  );
}

export default App;
```

- [ ] **Step 3: Write `src/App.module.css`**

```css
.app {
  display: flex;
  flex-direction: column;
  min-height: 100svh;
}
.main {
  flex: 1;
  padding-bottom: 76px;
}

@media (min-width: 768px) {
  .main {
    padding-bottom: 0;
  }
}
```

- [ ] **Step 4: Rewrite `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/aquajett-favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aquajett Water Heaters | Water Heater Supply & Installation</title>
    <meta
      name="description"
      content="Aquajett Water Heaters Trading supplies water heaters and provides installation services in the South, Metro Manila, and nationwide."
    />
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Aquajett Water Heaters Trading",
        "image": "https://aquajettwaterheaters.com/aquajett-favicon.png",
        "url": "https://aquajettwaterheaters.com",
        "telephone": "+63495395785",
        "email": "aquajett.sales@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Unit R Level 2 CM 1 Amable Bldg., Sta. Rosa Heights, Brgy. Puting Kahoy, Sta. Rosa - Tagaytay Road",
          "addressLocality": "Silang",
          "addressRegion": "Cavite",
          "addressCountry": "PH"
        },
        "sameAs": ["https://www.facebook.com/aquajett.tagaytay/"]
      }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Build check**

Run: `npm run build`
Expected: succeeds with no TypeScript errors, produces a `dist/` folder.

- [ ] **Step 6: Manual verification (do this yourself)**

Run `npm run dev` and read through the whole page top to bottom:
- Section order matches: Header → Hero → Products (cards + comparison) → Benefits → Features → Installation Process → Installation Gallery → Coverage → About → FAQ → Final CTA → Footer, with the mobile contact bar fixed at the bottom on narrow viewports.
- Every nav link (desktop and mobile menu) scrolls to the correct section, landing below the sticky header rather than underneath it.
- The browser tab shows the Aquajett favicon and the title "Aquajett Water Heaters | Water Heater Supply & Installation".
- View page source (or devtools Elements) and confirm the `<script type="application/ld+json">` block is present with the correct business fields.
- Run `npm run build` then `npm run preview`, open the preview URL, and re-check the above in a production build.

- [ ] **Step 7: Stop for manual review — do not commit**

---

## Task 19: Accessibility, Responsive, and Reduced-Motion QA Pass

**Files:**
- Modify: any component file, as needed, to fix issues found during this pass (list exact files touched in your final report to the user).

**Interfaces:**
- Consumes: the entire assembled site from Task 18.
- Produces: no new public interfaces — this task only fixes defects found during manual QA.

- [ ] **Step 1: Responsive sweep (do this yourself)**

Run `npm run dev` and, using devtools device toolbar (or by resizing the window), check the page at 320, 375, 390, 430, 576, 768, 992, 1200, 1440, and 1920px widths for each of: Header/mobile menu, Hero, Product cards, Product comparison, Benefits, Features, Installation process, Installation gallery + lightbox, Coverage, About, FAQ, Final CTA, Footer, mobile contact bar. Confirm at every width:
- No horizontal scrollbar / no content wider than the viewport.
- No overlapping text or images.
- No button extends past the viewport edge or drops below 44px touch target.
- No awkwardly large empty gaps or cramped, clipped text.

If any issue is found, fix it in the relevant component's CSS module (adjust grid/flex breakpoints, `clamp()` ranges, or spacing tokens) and re-check that width.

- [ ] **Step 2: Keyboard and screen-reader sweep (do this yourself)**

Using Tab/Shift+Tab/Enter/Space/Escape only (no mouse):
- Reach and activate every nav link, the mobile menu open/close, every FAQ question, the product comparison tabs, every gallery tile and lightbox control, and every CTA button.
- Confirm a visible aqua focus ring appears on each and that tab order follows visual/reading order.
- Open the page with a screen reader (Windows Narrator: `Ctrl+Win+Enter`) and confirm the mobile menu and lightbox are announced as dialogs, and FAQ buttons announce their expanded/collapsed state.

If any control is unreachable, has no visible focus state, or has incorrect/missing ARIA, fix it in that component.

- [ ] **Step 3: Reduced-motion sweep (do this yourself)**

Enable "Reduce motion" (Windows: Settings → Accessibility → Visual effects → Animation effects → off) and reload the page:
- Hero entrance, floating particles, steam, the Coverage/FinalCTA ambient glow, and the water-flow SVG dashes should all be static or reduced to a simple fade.
- Scroll reveals should still make content visible (not permanently hidden at 0 opacity) but without the sliding/scaling motion.
- FAQ accordion and mobile menu should still function, just without lingering transition delay.

If anything stays stuck invisible or keeps animating under reduced motion, fix the offending component's `@media (prefers-reduced-motion: reduce)` block.

- [ ] **Step 4: Console and lint check**

Run: `npm run build` (TypeScript) and `npm run lint` (oxlint)
Expected: both succeed with zero errors. Fix any reported issues.

Open the browser console on every section of the live `npm run dev` page and confirm there are no runtime errors or warnings (React key warnings, missing alt text warnings, etc.).

- [ ] **Step 5: Final read-through against the design doc**

Re-read `docs/superpowers/specs/2026-08-09-aquajett-marketing-site-design.md` section by section and confirm the built site satisfies each one — pay particular attention to §2 (no fabricated content anywhere), §7 (placeholder system still swappable via data files alone), and §12 (no contact form, no backend, no commits made).

- [ ] **Step 6: Stop for final manual review — do not commit**

