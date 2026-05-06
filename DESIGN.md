# Morgan & Marston LLP — Design Document
> This file is the single source of truth for the Morgan & Marston website build.
> Read this before writing any HTML, CSS, or JavaScript.

---

## 1. Project Overview

**Firm Name:** Morgan & Marston LLP  
**Tagline:** A Heritage of Results.  
**Purpose:** A fictional attorney website built as a portfolio piece demonstrating real-world front-end skills — layout, typography, color, responsive design, and form handling.  
**Pages:** 2  
- `index.html` — Main homepage (scrolling single page)
- `contact.html` — Dedicated contact page

**Shared assets:**
- `style.css` — All styles for both pages
- `/images/` — Folder for all image assets (see Section 7)

---

## 2. Design Tokens

These are the foundational values that every element on the site pulls from. In `style.css`, define these as CSS custom properties on `:root` so they are available everywhere.

### 2.1 Color Palette

```css
:root {
  --color-gunmetal:   #1E2228;  /* Primary dark — navbar, hero bg, footer */
  --color-midnight:   #403D3F;  /* Secondary dark — alternate sections */
  --color-fur:        #7D6150;  /* Warm accent — borders, icon backgrounds */
  --color-lion:       #C59A62;  /* Gold — headings on dark, CTAs, highlights */
  --color-journal:    #E5D5B3;  /* Cream — body text on dark, light section bg */
  --color-white:      #FFFFFF;  /* Pure white — card backgrounds, light text */
  --color-text-dark:  #1E2228;  /* Body text on light backgrounds */
}
```

**Color usage rules:**
- Dark backgrounds (`--color-gunmetal`, `--color-midnight`) always use `--color-journal` or `--color-white` for body text
- Gold (`--color-lion`) is used for display headings on dark sections, CTA buttons, and decorative accents — never for body text
- `--color-fur` is a supporting accent — use for divider lines, icon wrappers, card borders, and subtle hover states
- Light sections use `--color-journal` as the background with `--color-text-dark` for text

### 2.2 Typography

**Google Fonts import (place in `<head>` of both HTML files):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,600;1,6..96,400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
```

```css
:root {
  --font-display: 'Bodoni Moda', serif;   /* Headings, firm name, section titles */
  --font-body:    'Jost', sans-serif;     /* All body copy, nav links, buttons, labels */
}
```

**Type scale:**
| Role | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Firm name / logo | Bodoni Moda | 1.5rem | 600 | Navbar, tracked slightly |
| Hero headline | Bodoni Moda | clamp(2.5rem, 6vw, 5rem) | 600 | Responsive, large |
| Hero subheading | Bodoni Moda | 1.25rem | 400 | Italic |
| Section title | Bodoni Moda | clamp(2rem, 4vw, 3rem) | 600 | |
| Section subtitle | Bodoni Moda | 1rem | 400 | Italic, gold color, above title |
| Card title | Bodoni Moda | 1.25rem | 600 | |
| Body copy | Jost | 1rem | 300 | Line-height 1.8 |
| Nav links | Jost | 0.85rem | 400 | Letter-spacing 0.1em, uppercase |
| Button text | Jost | 0.8rem | 500 | Letter-spacing 0.12em, uppercase |
| Stat number | Bodoni Moda | clamp(2.5rem, 5vw, 4rem) | 600 | Gold color |
| Stat label | Jost | 0.75rem | 400 | Letter-spacing 0.15em, uppercase |

### 2.3 Spacing Scale

Use these consistently throughout the build. Do not invent arbitrary pixel values.

```css
:root {
  --space-xs:   0.5rem;   /*  8px */
  --space-sm:   1rem;     /* 16px */
  --space-md:   2rem;     /* 32px */
  --space-lg:   4rem;     /* 64px */
  --space-xl:   7rem;     /* 112px */
  --space-xxl:  10rem;    /* 160px */
}
```

**Section padding rule:** Every major section gets `padding: var(--space-xl) var(--space-md)` as its default. Adjust only when the design explicitly calls for more or less breathing room.

### 2.4 Other Tokens

```css
:root {
  --radius-sm:  4px;
  --radius-md:  8px;
  --transition: 0.3s ease;
  --max-width:  1200px;     /* Max content width — always center with margin: 0 auto */
  --border-accent: 1px solid var(--color-fur);
}
```

---

## 3. Shared Components

These elements appear on **both pages** and must be styled identically.

### 3.1 Navbar

**Behavior:**
- Fixed to the top of the viewport (`position: fixed`)
- Starts fully transparent on `index.html` hero (text readable over dark image)
- On scroll past 80px, transitions to `background: var(--color-gunmetal)` with a subtle box-shadow
- On `contact.html`, always shows the solid gunmetal background (no transparent state)
- Height: `80px`

**Layout (left to right):**
1. **Logo** — "Morgan & Marston LLP" in Bodoni Moda, `--color-white`. No icon needed.
2. **Nav links** (centered or right-aligned) — Home, Practice Areas, About, Contact. Jost, uppercase, `--color-journal`. On hover, color transitions to `--color-lion`.
3. **CTA Button** — "Schedule a Consultation". Outlined style: `border: 1px solid var(--color-lion)`, `color: var(--color-lion)`, transparent background. On hover, fills with `--color-lion`, text becomes `--color-gunmetal`.

**Mobile behavior:** Nav links collapse into a hamburger menu at `768px` and below. The menu opens as a full-width dropdown panel in `--color-gunmetal`.

---

### 3.2 Footer

**Background:** `--color-midnight`  
**Text color:** `--color-journal`  
**Layout:** Two rows

**Row 1 (three columns):**
- Col 1: Firm name in Bodoni Moda + tagline in italic below
- Col 2: Quick links — Home, Practice Areas, About, Contact
- Col 3: Contact info — address (fictional), phone (fictional), email (fictional)

**Row 2 (full width, centered):**
- Thin top border in `--color-fur`
- Copyright line: "© 2024 Morgan & Marston LLP. All rights reserved."
- Jost, 0.75rem, `--color-fur` color

---

## 4. Page: index.html

### Section 1 — Hero

**Purpose:** Immediately establish authority and visual impact.

**Layout:** Full viewport height (`100vh`). Background is a dark, high-quality photo of a law library, mahogany office, or courthouse interior (see Section 7 for image guidance). A dark overlay sits on top of the image at ~60% opacity using `--color-gunmetal` to ensure text legibility.

**Content (vertically centered, left-aligned, max-width container):**
- Eyebrow line: `"— Established 1987"` in Jost, uppercase, letter-spaced, `--color-lion`
- Main headline: `"We're Built On"` (white) + `"Relationships."` (gold, `--color-lion`) — two lines, Bodoni Moda display size
- Subheading: `"Trusted counsel for individuals, businesses, and institutions."` Jost, 300 weight, `--color-journal`
- Two buttons side by side:
  - Primary: filled gold (`--color-lion` background, `--color-gunmetal` text) — "Our Practice Areas"
  - Secondary: outlined (`border: 1px solid --color-journal`, `--color-journal` text) — "Schedule a Consultation"

**Decorative detail:** A thin horizontal rule in `--color-lion` (~60px wide, 1px tall) sits between the eyebrow and the headline.

---

### Section 2 — Feature Cards

**Purpose:** Introduce the three core practice areas immediately after the hero.

**Background:** `--color-journal` (cream)

**Layout:** Three cards in a row (`display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-md)`). Each card overlaps the bottom of the hero section slightly by using a negative `margin-top` of ~`3rem`, giving a layered, editorial feel.

**Each card contains:**
- A small background image or dark photo at the top (~180px tall, `object-fit: cover`)
- An eyebrow label in Jost uppercase, `--color-fur` — e.g. `"Clear, Concise Advice"`
- A card title in Bodoni Moda — e.g. `"Business Law"`
- 2–3 lines of body copy in Jost 300
- A text link at the bottom: `"View Practice Areas →"` in `--color-lion`
- Bottom border accent: `3px solid var(--color-lion)` on the bottom edge of the card

**The three practice areas:**
1. "Business Law" — eyebrow: "Clear, Concise Advice"
2. "Criminal Defense" — eyebrow: "Relentless Representation"
3. "Estate Planning" — eyebrow: "Securing Your Legacy"

**Card background:** `--color-white`, slight box-shadow for lift.

---

### Section 3 — About / Committed Section

**Purpose:** Build trust and humanize the firm.

**Background:** `--color-white`

**Layout:** Two columns, roughly 55% / 45% split.

**Left column (text):**
- Eyebrow: `"Your Business Is Safe With Morgan & Marston"` — Jost, uppercase, `--color-fur`
- Heading: `"Committed To"` (dark) + `"Your Success"` (gold, new line) — Bodoni Moda
- Body paragraph: 3–4 sentences describing the firm's philosophy. Jost 300, `--color-text-dark`
- A 2x2 grid of feature bullets below the paragraph, each with:
  - A small square icon wrapper in `--color-fur` background
  - A short title in Bodoni Moda
  - One line of description in Jost 300
  - Feature titles: "Decades of Experience", "Client-First Approach", "Proven Track Record", "Discreet Representation"

**Right column (image block):**
- A portrait-oriented photo of attorneys in a meeting or office setting
- A decorative dark square (`--color-gunmetal`) positioned offset behind the image (absolute positioned, ~40px offset top-right) — this creates the layered look seen in the Bernstein reference
- A small pull-quote card overlapping the bottom-left of the image:
  - Background: `--color-gunmetal`
  - Quote text in Jost 300, `--color-journal`, italic
  - Attribution in Jost 500, `--color-lion` — "— Arthur Morgan, Senior Partner"

---

### Section 4 — Stats Bar

**Purpose:** Reinforce credibility with hard numbers.

**Background:** `--color-gunmetal`

**Layout:** Four stats in a row, evenly spaced, centered. Thin vertical dividers in `--color-fur` between each stat.

**The four stats:**
| Number | Label |
|---|---|
| 35+ | Years in Practice |
| 1,200+ | Cases Resolved |
| 98% | Client Satisfaction |
| 40+ | Expert Attorneys |

**Each stat:**
- Number in Bodoni Moda, large, `--color-lion`
- Label in Jost, uppercase, letter-spaced, `--color-journal`

---

### Section 5 — Footer

*(See Section 3.2 — Shared Components)*

---

## 5. Page: contact.html

### Section 1 — Contact Hero (Page Header)

**Purpose:** Orient the user and set the tone for the page.

**Layout:** Not full viewport height — approximately `350px` tall. Same dark overlay + background image technique as the homepage hero, but a different image (courthouse exterior or city skyline at dusk).

**Content (centered):**
- Eyebrow: `"We're Here To Help"` — Jost, uppercase, `--color-lion`
- Heading: `"Contact Morgan & Marston"` — Bodoni Moda, white, large
- Subheading: `"Schedule a consultation or send us a message below."` — Jost 300, `--color-journal`

---

### Section 2 — Contact Body

**Background:** `--color-journal` (cream)

**Layout:** Two columns, 60% / 40% split.

**Left column — Contact Form:**
- Section label: `"Send Us a Message"` — Bodoni Moda
- Fields:
  - Full Name (text input)
  - Email Address (email input)
  - Phone Number (tel input, optional)
  - Area of Interest (select dropdown: Business Law, Criminal Defense, Estate Planning, Other)
  - Message (textarea, ~5 rows)
- Submit button: full-width, filled gold (`--color-lion`), Jost uppercase — `"Send Your Message"`
- Form field styling: bottom-border only (no full box border), `--color-fur` border color, clean and minimal. On focus, border transitions to `--color-lion`.

**Right column — Office Information:**
- Section label: `"Our Office"` — Bodoni Moda
- Fictional address block
- Fictional phone and email
- Office hours (Mon–Fri, 8am–6pm)
- A thin decorative rule in `--color-lion` above the office info block
- A small note: `"All consultations are strictly confidential."` — Jost italic, `--color-fur`

---

### Section 3 — Footer

*(See Section 3.2 — Shared Components)*

---

## 6. Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| `1200px+` | Full desktop layout as described above |
| `1024px` | Slight padding reduction, no layout changes |
| `768px` | All multi-column grids collapse to single column. Navbar becomes hamburger. Hero text size reduces via `clamp()`. |
| `480px` | Further font-size and padding reductions. Buttons stack vertically. Stats bar becomes 2x2 grid. |

**Rule:** Always design mobile-last for this project (build desktop first, then add `@media` queries to handle smaller screens). This is the traditional approach and mirrors how you'll encounter CSS in professional settings.

---

## 7. Images & Assets

All images should be sourced from **Unsplash** (free, no attribution required for portfolio use). Download and save locally to an `/images/` folder — do not hotlink.

| Image | Description | Suggested Unsplash search |
|---|---|---|
| `hero-bg.jpg` | Dark law library or mahogany office interior | "law library dark", "attorney office interior" |
| `contact-hero-bg.jpg` | Courthouse exterior or city at dusk | "courthouse exterior", "city dusk architecture" |
| `card-business.jpg` | Business meeting, handshake, or contracts | "business meeting dark" |
| `card-criminal.jpg` | Courthouse steps or gavel | "courthouse steps", "justice" |
| `card-estate.jpg` | Writing desk, pen and paper, documents | "writing desk elegant" |
| `about-attorneys.jpg` | Two or three attorneys in discussion | "attorneys meeting", "lawyers office" |

**Image treatment rule:** Every image used as a section background should have a dark overlay applied via CSS (using a pseudo-element or a wrapper div with `background: rgba(30, 34, 40, 0.6)`), never applied directly to the `<img>` tag.

---

## 8. Build Order

Follow this sequence when building — it prevents you from writing styles you'll have to undo later.

1. Set up file structure (`index.html`, `contact.html`, `style.css`, `/images/`)
2. Write `:root` tokens in `style.css`
3. Write global resets and base styles (`body`, `h1–h6`, `p`, `a`, `img`)
4. Build and style the **Navbar** (shared)
5. Build and style the **Footer** (shared)
6. Build `index.html` section by section — Hero → Cards → About → Stats
7. Build `contact.html` section by section — Hero → Form + Office Info
8. Add responsive `@media` queries last
9. Final polish — hover states, transitions, spacing consistency check

---

## 9. Tone & Voice

The written content across the site should feel:
- **Authoritative** — confident, never boastful
- **Warm but formal** — approachable, but this is still a law firm
- **Sparse** — short sentences, no filler. Every word earns its place.

Avoid phrases like: "cutting-edge", "passionate about", "synergy", "world-class".  
Prefer phrases like: "decades of experience", "discreet counsel", "results that speak for themselves".
