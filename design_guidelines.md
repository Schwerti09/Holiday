# Design Guidelines: "DeineZeitEureZeit" Affiliate Shop

## Design Approach

**Selected Approach:** Reference-Based (E-commerce/Lifestyle)
**Primary References:** Etsy (product presentation), Net-a-Porter (premium feel), About You (German market aesthetics)
**Rationale:** E-commerce requires trust, clarity, and proven conversion patterns. The "pamper yourself" positioning demands an elevated, refined aesthetic while maintaining performance.

## Core Design Principles

1. **Premium Minimalism:** Clean layouts with generous whitespace communicate quality
2. **Product-First:** Images and products are heroes; UI recedes elegantly
3. **Trust Through Restraint:** Professional typography, subtle interactions, zero gimmicks
4. **Speed as Feature:** Performance optimization visible in design choices

## Typography System

**Font Stack:**
- Primary: Inter (Google Fonts) - headings, navigation, buttons
- Secondary: System UI for body text (performance optimization)

**Type Scale:**
- Hero/H1: text-5xl md:text-6xl (bold, tight leading)
- H2/Category: text-3xl md:text-4xl (semibold)
- H3/Product Titles: text-xl md:text-2xl (medium)
- Body/Descriptions: text-base (regular)
- Small/Meta: text-sm (light, uppercase for labels)

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Micro-spacing (elements): p-2, gap-4
- Component spacing: p-6, p-8
- Section spacing: py-12, py-16
- Generous margins: my-16, my-24

**Grid System:**
- Product grids: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Container: max-w-7xl mx-auto
- Content areas: max-w-3xl for text blocks

## Component Library

### Navigation
- Sticky header with subtle shadow on scroll
- Logo left, search center, cart/account right
- Secondary navigation: Category pills/tabs below main nav
- Mobile: Drawer menu with category accordion

### Product Cards
- Aspect ratio: 4:3 for product images
- Hover: Subtle lift (translate-y-1) + soft shadow
- Card structure: Image → Title → Price → Quick View CTA
- Badges: Small, corner-positioned (Sale, Neu, Bestseller)

### Product Grid
- Masonry-style layout for visual interest
- Lazy loading with skeleton screens (shimmer effect)
- Infinite scroll or "Load More" button (A/B test recommendation)
- Quick filters: Sticky sidebar (desktop) / top drawer (mobile)

### Product Detail Page
- Large image gallery (main + thumbnails)
- Sticky buy section on scroll (mobile)
- Two-column: Images left (60%) / Details right (40%)
- Accordion for: Beschreibung, Versandinfo, Details

### Search & Filters
- Instant search with debouncing
- Filter chips (removable, visible selections)
- Sort dropdown: Relevanz, Preis aufsteigend/absteigend, Neuheiten
- Mobile filters: Bottom sheet modal

### Hero Section
- Full-width image with text overlay (70vh on desktop, 50vh mobile)
- Single compelling headline: "Verwöhne Dich" or seasonal message
- Subtle gradient overlay for text readability
- Primary CTA button with blurred background
- Hero cycles through category-specific visuals

### Trust Elements
- Small badges: "Sichere Bezahlung", "Schneller Versand", "Geprüfte Qualität"
- Footer: Minimal, essential links only
- Social proof: Optional customer review highlights (if available)

### Forms
- Minimal border style (border-b only, focus state)
- Generous touch targets (min-h-12)
- Inline validation with subtle indicators

## Images

**Hero Image:**
- Yes, large hero image (70vh desktop, 50vh mobile)
- Description: Lifestyle shot of cozy winter accessories beautifully arranged (scarves, gloves, blankets) in warm, inviting setting with natural light. Professional product photography quality.
- Placement: Top of homepage, full-width
- Overlay: Subtle dark gradient (bottom to top, 40% opacity) for text legibility
- Text: Centered, white typography with blurred-background button

**Product Images:**
- Clean white/light gray backgrounds for consistency
- Alternative: Lifestyle context shots where available
- Gallery: 4:3 aspect ratio, high-resolution, optimized WebP format

**Category Headers:**
- Subtle background images for each category page
- Low opacity (20-30%), texture only, not distracting

## Animation Strategy

**Use Sparingly:**
- Micro-interactions: Hover states (scale, lift, shadow)
- Page transitions: Subtle fade-in for products (stagger: 50ms)
- Loading states: Skeleton screens, not spinners
- Scroll: Subtle parallax on hero only

**Avoid:**
- Auto-playing carousels
- Excessive scroll animations
- Heavy JavaScript libraries

## Performance Specifications

- Lazy load all images below fold
- WebP with JPEG fallback
- CSS Grid over JavaScript layouts
- Minimal third-party scripts
- Inline critical CSS
- Defer non-critical JavaScript
- CDN delivery for static assets

## SEO Requirements

**Structured Data:**
- Product schema for each item
- BreadcrumbList for navigation
- Organization markup in footer

**Meta Elements:**
- Unique title/description per product
- Open Graph images for social sharing
- Semantic HTML5 (article, section, nav)
- Alt text for ALL images (product titles + descriptive context)

## Mobile-First Considerations

- Touch targets: Minimum 44x44px
- Simplified navigation: Drawer pattern
- Sticky CTAs on product pages
- Larger typography on mobile for readability
- Single-column layouts, stack naturally
- Bottom navigation bar: Home, Kategorien, Suche, Warenkorb

## Key Pages Structure

**Homepage:** Hero → Featured Categories (4 cards) → Bestsellers Grid → Trust Badges → Newsletter
**Category Page:** Header Image → Filter Bar → Product Grid → Load More
**Product Page:** Gallery → Details/CTA → Description Accordion → Related Products
**Search Results:** Filter Sidebar → Results Grid → Pagination

This design emphasizes trust, performance, and conversion while maintaining a premium aesthetic appropriate for "DeineZeitEureZeit."