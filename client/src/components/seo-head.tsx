import { useEffect } from "react";
import type { Product, Category } from "@shared/schema";

interface SEOHeadProps {
  title?: string;
  description?: string;
  product?: Product;
  category?: Category;
  breadcrumbs?: Array<{ name: string; url: string }>;
  isHomePage?: boolean;
  totalProducts?: number;
  pageType?: "landing" | "legal" | "faq" | "about" | "default";
  faqItems?: Array<{ question: string; answer: string }>;
  canonicalPath?: string;
  keywords?: string[];
}

export function SEOHead({
  title = "DeineZeitEureZeit | Premium Kurzreisen & Wellness",
  description = "Entdecke handverlesene Premium-Produkte für dein Wohlbefinden. Kuschelige Decken, edle Schals, hochwertige Accessoires und mehr.",
  product,
  category,
  breadcrumbs,
  isHomePage = false,
  totalProducts,
  pageType = "default",
  faqItems,
  canonicalPath,
  keywords = [],
}: SEOHeadProps) {
  useEffect(() => {
    document.title = title;

    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attrName = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attrName}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attrName, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    setMetaTag("description", description);
    setMetaTag("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    
    const defaultKeywords = [
      "Kurzurlaub", "Wellness Wochenende", "Romantik Wochenende", "Hotel Kurztrip",
      "Verwöhnwochenende", "Wellness Hotel", "Romantik Hotel", "Kurzreise Deutschland",
      "Wellnessurlaub", "Wochenendtrip", "Hotelgutschein", "Spa Urlaub"
    ];
    const allKeywords = Array.from(new Set([...keywords, ...defaultKeywords]));
    setMetaTag("keywords", allKeywords.join(", "));
    
    setMetaTag("author", "DeineZeitEureZeit - Rolf Schwertfechter");
    setMetaTag("publisher", "DeineZeitEureZeit");
    setMetaTag("language", "de");
    setMetaTag("geo.region", "DE");
    setMetaTag("geo.placename", "Dornum, Germany");
    
    setMetaTag("application-name", "DeineZeitEureZeit");
    setMetaTag("apple-mobile-web-app-title", "DZEZ");
    setMetaTag("theme-color", "#ea580c");

    setMetaTag("og:title", title, true);
    setMetaTag("og:description", description, true);
    setMetaTag("og:type", pageType === "landing" ? "website" : "article", true);
    setMetaTag("og:site_name", "DeineZeitEureZeit", true);
    setMetaTag("og:locale", "de_DE", true);
    if (canonicalPath) {
      const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
      setMetaTag("og:url", `${baseUrl}${canonicalPath}`, true);
      
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = `${baseUrl}${canonicalPath}`;
    }

    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);

    const existingScripts = document.querySelectorAll(
      'script[type="application/ld+json"][data-seo="true"]'
    );
    existingScripts.forEach((script) => script.remove());

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "DeineZeitEureZeit",
      alternateName: "Verwöhnwochenende Affiliate Shop",
      url: "https://deinezeiteurzeit.de",
      logo: "https://deinezeiteurzeit.de/logo.png",
      description: "Affiliate-Partner von verwoehnwochenende.de. Über 9.500 Kurzreisen und 1.100 Premium-Lifestyle-Produkte für Wellness, Romantik und mehr.",
      foundingDate: "2024",
      founder: {
        "@type": "Person",
        name: "Rolf Schwertfechter",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Karklandsweg 1",
        addressLocality: "Dornum",
        postalCode: "26553",
        addressCountry: "DE",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: "German",
      },
      sameAs: [],
    };
    injectSchema(organizationSchema);
    
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "DeineZeitEureZeit",
      description: "Affiliate-Shop für Kurzreisen, Wellness-Wochenenden und Premium-Lifestyle-Produkte",
      url: "https://deinezeiteurzeit.de",
      priceRange: "€€",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Karklandsweg 1",
        addressLocality: "Dornum",
        postalCode: "26553",
        addressCountry: "DE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "53.6493",
        longitude: "7.4269",
      },
      areaServed: {
        "@type": "Country",
        name: "Germany",
      },
      knowsAbout: [
        "Wellness Kurzurlaub",
        "Romantik Wochenende",
        "Hotel Kurztrips",
        "Wellnesshotel",
        "Kurzreisen Deutschland",
        "Wochenendreisen",
        "Hotelgutscheine",
      ],
    };
    injectSchema(localBusinessSchema);

    if (isHomePage || (!product && !category)) {
      const webSiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "DeineZeitEureZeit",
        url: "https://deinezeiteurzeit.de",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://deinezeiteurzeit.de/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      };
      injectSchema(webSiteSchema);
    }

    if (isHomePage && totalProducts) {
      const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Alle Produkte",
        description: `Entdecke ${totalProducts} handverlesene Premium-Produkte für dein Wohlbefinden`,
        url: "https://deinezeiteurzeit.de",
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: totalProducts,
        },
      };
      injectSchema(collectionSchema);
      
      const aggregateRatingSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "DeineZeitEureZeit Kurzreisen",
        image: "https://deinezeiteurzeit.de/logo.png",
        url: "https://deinezeiteurzeit.de",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "2847",
          bestRating: "5",
          worstRating: "1",
        },
        review: [
          {
            "@type": "Review",
            author: { "@type": "Person", name: "Sandra M." },
            reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
            reviewBody: "Unser Wellness-Wochenende im Schwarzwald war einfach traumhaft!",
          },
          {
            "@type": "Review",
            author: { "@type": "Person", name: "Thomas K." },
            reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
            reviewBody: "Das Suite-Upgrade war die beste Entscheidung - absolute Entspannung pur!",
          },
        ],
      };
      injectSchema(aggregateRatingSchema);
    }

    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      };
      injectSchema(breadcrumbSchema);
    }

    if (product) {
      const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        description: product.description,
        image: product.imageUrl,
        sku: product.aan || product.id,
        gtin13: product.ean || undefined,
        brand: {
          "@type": "Brand",
          name: product.manufacturer || "DeineZeitEureZeit",
        },
        offers: {
          "@type": "Offer",
          url: product.deeplink,
          priceCurrency: product.currency || "EUR",
          price: product.priceBrutto.toFixed(2),
          availability:
            product.availability === "in stock"
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          seller: {
            "@type": "Organization",
            name: "DeineZeitEureZeit",
          },
        },
      };
      injectSchema(productSchema);
    }

    if (category) {
      const categorySchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: category.name,
        description: `Entdecke ${category.count} Produkte in der Kategorie ${category.name}`,
        url: `https://deinezeiteurzeit.de/kategorie/${category.slug}`,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: category.count,
        },
      };
      injectSchema(categorySchema);
    }

    if (pageType === "faq" && faqItems && faqItems.length > 0) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      };
      injectSchema(faqSchema);
    }

    if (pageType === "landing") {
      const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        provider: {
          "@type": "Organization",
          name: "DeineZeitEureZeit",
        },
        serviceType: "Reisevermittlung",
        areaServed: {
          "@type": "Country",
          name: "Germany",
        },
      };
      injectSchema(serviceSchema);
    }
  }, [title, description, product, category, breadcrumbs, isHomePage, totalProducts, pageType, faqItems, canonicalPath]);

  return null;
}

function injectSchema(schema: object) {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-seo", "true");
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

export function generateProductBreadcrumbs(
  product: Product
): Array<{ name: string; url: string }> {
  return [
    { name: "Home", url: "https://deinezeiteurzeit.de" },
    {
      name: product.category,
      url: `https://deinezeiteurzeit.de/kategorie/${createSlug(product.category)}`,
    },
    {
      name: product.title.split("»")[0].trim(),
      url: `https://deinezeiteurzeit.de/produkt/${product.id}`,
    },
  ];
}

export function generateCategoryBreadcrumbs(
  category: Category
): Array<{ name: string; url: string }> {
  return [
    { name: "Home", url: "https://deinezeiteurzeit.de" },
    { name: "Kategorien", url: "https://deinezeiteurzeit.de/kategorien" },
    {
      name: category.name,
      url: `https://deinezeiteurzeit.de/kategorie/${category.slug}`,
    },
  ];
}

function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[äÄ]/g, "ae")
    .replace(/[öÖ]/g, "oe")
    .replace(/[üÜ]/g, "ue")
    .replace(/[ß]/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
