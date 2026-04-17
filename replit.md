# DeineZeitEureZeit - Premium Lifestyle E-commerce Shop

## Overview

"DeineZeitEureZeit" is a German-language affiliate e-commerce shop focused on premium lifestyle and wellness products. The application presents curated products (scarves, blankets, gloves, accessories) with a refined, minimalist aesthetic optimized for conversion and trust. Products are loaded from CSV data and displayed with sophisticated filtering, search, and categorization capabilities.

The tech stack includes:
- **Frontend**: React with TypeScript, Vite, Wouter (routing), TanStack Query, shadcn/ui components
- **Backend**: Express.js with TypeScript
- **Data**: CSV-based product catalog with in-memory storage
- **Styling**: Tailwind CSS with custom design system following premium e-commerce patterns
- **Database**: Drizzle ORM configured for PostgreSQL (currently unused, products loaded from CSV)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Component Library**: shadcn/ui (Radix UI primitives) with "new-york" style variant, providing accessible, customizable components. All UI components follow a consistent design system with HSL-based theming.

**Routing**: Wouter for lightweight client-side routing:
- `/` - Home page with hero, categories, testimonials, and product grid
- `/kategorie/:slug` - Category-specific product listings
- `/kategorien` - All categories overview
- `/blog` - SEO-optimized blog with 6 pillar articles (~30,000 words total)
- `/blog/:slug` - Individual blog post pages with related articles
- `/merkliste` - Wishlist/saved products page
- `/vergleich` - Product comparison page (up to 4 products)
- `/impressum` - Legal imprint page with contact details
- `/datenschutz` - GDPR-compliant privacy policy
- `/ueber-uns` - About us page with shop philosophy
- `/versand` - Shipping and payment information

**State Management**: TanStack Query for server state with custom query client configuration. ShopProvider context for global wishlist/compare state. Local state managed via React hooks.

**User Features**:
- **Wishlist/Merkliste**: Products can be saved with heart icon, persisted to LocalStorage, displayed on /merkliste page
- **Product Comparison**: Up to 4 products can be compared, stored in LocalStorage, displayed in table format on /vergleich
- **Quick View Modal**: Product preview dialog with image, pricing, availability, and affiliate link
- **Newsletter**: Email subscription form in footer with validation and success feedback
- **Blog/Ratgeber**: 6 SEO-optimized pillar articles covering wellness, romantik, family trips, city breaks, luxury hotels, and hidden gems

**Data Fetching**: Custom `apiRequest` and `getQueryFn` wrappers around fetch API, with automatic query key-based URL construction and pagination support.

**Design System**: Premium warm neutral color palette optimized for light mode (dark mode supported). Custom CSS variables for elevation, shadows, and interactive states. Typography system uses Inter (headings/UI) and Playfair Display (serif accents) with system fonts for body text (performance optimization).

**Component Structure**:
- Page components (`client/src/pages/`) - Route-level components
- Reusable components (`client/src/components/`) - Header, Footer, ProductCard, Filters, etc.
- UI primitives (`client/src/components/ui/`) - shadcn/ui components
- Custom hooks (`client/src/hooks/`) - useIsMobile, useToast

**Performance Optimizations**:
- Image lazy loading with shimmer placeholders
- Staggered animations for perceived performance
- Virtual scrolling considerations via pagination
- Code splitting via Vite's default behavior

### Backend Architecture

**Server Framework**: Express.js with TypeScript, custom logging middleware, JSON body parsing with raw body preservation for webhook support.

**API Structure**:
- `GET /api/products` - Paginated product listing with filters (query, category, price range, sort)
- `GET /api/products/:id` - Single product details
- `GET /api/categories` - All categories with product counts
- `GET /api/blog` - All blog posts (list view)
- `GET /api/blog/:slug` - Single blog post by slug
- Static file serving for production builds

**SEO Structure**:
- Sitemap-Index with 5 sub-sitemaps (main, categories, products-1/2/3)
- Blog articles included in sitemap-main.xml with priority 0.8
- Schema.org JSON-LD: Organization, LocalBusiness, WebSite, Product, AggregateRating
- Meta tags: keywords, description, Open Graph, Twitter Cards
- Canonical URLs for all pages

**Data Layer**: In-memory storage implementation (`MemStorage` class) initialized from CSV parsing. Products and categories loaded at startup and cached in memory. No database persistence currently - all data sourced from CSV file.

**CSV Parser**: Custom parser (`server/csvParser.ts`) handling semicolon-delimited files with quote escaping, transforming raw CSV rows into typed Product/Category objects. Normalizes prices, generates slugs, handles missing fields.

**Search & Filtering Logic**:
- Text search across title, description, category
- Category filtering by exact match
- Price range filtering (min/max)
- Sorting: relevance, price ascending/descending, newest
- Pagination with configurable page size (default 16)

**Build Process**: esbuild for server bundling with selective dependency bundling (allowlist approach to reduce syscalls for cold starts). Vite for client bundling. Separate development and production modes.

### Data Storage Solutions

**Current Implementation**: CSV file parsing with in-memory caching via `MemStorage` class. Products persisted as array in memory, indexed by category slugs and product IDs.

**Database Configuration**: Drizzle ORM configured for PostgreSQL with Neon serverless driver. Schema defined (`shared/schema.ts`) using Zod schemas for validation. Database currently unused - migration path exists for future persistence needs.

**Schema Design**:
- Products: 20+ fields including pricing, images, metadata, affiliate deeplinks
- Categories: name, slug, count, optional icon
- Search parameters: query, category, price filters, sort, pagination

**Data Flow**: CSV → Parser → TypeScript objects → In-memory storage → API endpoints → React Query → UI components

### Authentication and Authorization

Not implemented. Application is public-facing with no user accounts or authentication. All product data is publicly accessible.

### External Service Integrations

None currently integrated. Application is self-contained with no external API dependencies.

**Affiliate Links**: Products contain deeplink URLs to external merchant sites. No server-side affiliate tracking - links are direct passthrough to merchant platforms.

**Future Considerations**: Design accommodates future integrations (Drizzle ORM setup suggests potential database migration, esbuild bundling includes common integration packages like Stripe, Nodemailer in allowlist).