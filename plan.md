# GreenBasket — implementation plan

## Product scope
A polished, responsive grocery storefront built with React and Tailwind CSS, inspired by the supplied GreenBasket reference. The home page combines a fresh organic visual language with practical shopping interactions: category browsing, product cards, cart state, newsletter signup, and mobile navigation.

## Design direction
- **Design movement:** modern organic editorial commerce — the warmth of a farmstand translated into a quiet, premium digital storefront.
- **Core principles:** fresh before loud; generous whitespace; tactile cards and soft borders; clear conversion paths.
- **Color philosophy:** deep leaf greens establish trust and natural quality, warm cream keeps the page inviting, and citrus/lime accents add energy without looking synthetic.
- **Layout paradigm:** a layered farm-to-table journey rather than a generic centered grid: utility strip → navigation → crop-led hero → proof banner → browseable categories → offer → product shelf → newsletter/footer.
- **Signature elements:** leaf-shaped decorative chips, pill CTAs with arrow motion, and rounded editorial banners with quiet botanical linework.
- **Interaction philosophy:** low-friction and optimistic. Every primary action gives visible feedback; cart changes feel immediate; category browsing and mobile navigation remain lightweight.
- **Animation:** use small, purposeful transitions only — cards lift on hover, leaves drift in hero decoration, buttons nudge their arrow on hover, and the cart drawer enters from the right.
- **Typography system:** DM Sans for interface copy and Fraunces for expressive editorial headings. Large headlines use tight tracking and dark evergreen ink.
- **Brand essence:** “Fresh, trustworthy groceries that make everyday cooking feel better.” Personality: grounded, generous, optimistic.
- **Brand voice:** warm, plainspoken, quality-first. Example lines: “Fresh food. Healthy life. Everyday.” and “Good food starts closer to home.”
- **Wordmark & logo:** a simple basket mark built from two curved strokes and a pair of leaves, paired with a compact GreenBasket wordmark.
- **Signature brand color:** leaf green `#2f7b3b`.

## Implementation decisions
- Vite + React + TypeScript with Tailwind CSS and lucide-react icons.
- Local component/data split: `App.tsx` owns page composition and cart interactions; `data.ts` owns product/category content; `index.css` owns the type, custom utilities, and micro-animations.
- Remote Unsplash image URLs are used for commerce photography so the page stays lightweight while matching the supplied reference’s produce-first art direction.
- Express backend runs alongside Vite on port 3000, exposing health, categories, products, newsletter, and order endpoints. The cart remains in React state for the current demo, while newsletter signup and checkout now call the backend.
- The delivered hosting mode is frontend-only: React/Vite static output with no Express/API runtime. Cart state is restored from browser `localStorage` after refresh; checkout saves a local order, clears the cart, and shows success feedback. Newsletter signup and the `/admin` preview also use browser storage.
- `/admin` is a responsive local operations dashboard showing orders created in the current browser. It is explicitly not permanent or shared across devices.
- A static `public/manus-routes.json` exposes the single `/` page route for Webdev.

## Project structure
- `src/App.tsx` — page sections, responsive nav, cart drawer, filters, newsletter feedback.
- `src/data.ts` — typed catalog, categories, benefits, footer links.
- `src/index.css` — Tailwind layers, font imports, texture utilities, custom motion.
- `src/main.tsx` — React entry point.
- `public/manus-routes.json` — route manifest.
