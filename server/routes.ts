import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getBlogPosts, getBlogPostBySlug, getBlogPostsByCategory } from "./blogData";

// Hilfsfunktion für dynamische Site-URL aus Request
function getSiteUrl(req: any): string {
  const host = req.get('host') || req.headers.host;
  const protocol = req.protocol || 'https';
  // In Production immer HTTPS
  const useProtocol = host?.includes('replit') ? 'https' : protocol;
  return `${useProtocol}://${host}`;
}

// XML-Escape für Sitemap-Inhalte
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Google Search Console Verification
  app.get("/googleb629ac432cdf0f21.html", (req, res) => {
    res.type("text/html").send("google-site-verification: googleb629ac432cdf0f21.html");
  });

  // robots.txt für SEO Crawler
  app.get("/robots.txt", (req, res) => {
    const siteUrl = getSiteUrl(req);
    const robotsTxt = `# DeineZeitEureZeit - Robots.txt
# Optimiert für maximale SEO-Indexierung

User-agent: *
Allow: /

# Wichtige Seiten
Allow: /kategorie/
Allow: /kategorien
Allow: /wellness
Allow: /romantik
Allow: /silvester
Allow: /staedtetrips
Allow: /luxus

# Sitemap Location (Hauptindex enthält alle Unter-Sitemaps)
Sitemap: ${siteUrl}/sitemap.xml
Sitemap: ${siteUrl}/sitemap-main.xml
Sitemap: ${siteUrl}/sitemap-categories.xml
Sitemap: ${siteUrl}/sitemap-products-1.xml
Sitemap: ${siteUrl}/sitemap-products-2.xml
Sitemap: ${siteUrl}/sitemap-products-3.xml

# Crawl-Delay für respektvolles Crawling
Crawl-delay: 1

# Spezifische Bot-Regeln
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /
`;
    res.type("text/plain").send(robotsTxt);
  });

  // Haupt-Sitemap Index
  app.get("/sitemap.xml", async (req, res) => {
    const now = new Date().toISOString().split("T")[0];
    const siteUrl = getSiteUrl(req);
    
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl}/sitemap-main.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap-categories.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap-products-1.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap-products-2.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap-products-3.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;
    
    res.type("application/xml").send(sitemapIndex);
  });

  // Haupt-Seiten Sitemap
  app.get("/sitemap-main.xml", (req, res) => {
    const now = new Date().toISOString().split("T")[0];
    const siteUrl = getSiteUrl(req);
    
    const blogPosts = getBlogPosts();
    
    const mainPages = [
      { url: "/", priority: "1.0", changefreq: "daily" },
      { url: "/kategorien", priority: "0.9", changefreq: "daily" },
      { url: "/wellness", priority: "0.9", changefreq: "daily" },
      { url: "/romantik", priority: "0.9", changefreq: "daily" },
      { url: "/silvester", priority: "0.8", changefreq: "weekly" },
      { url: "/staedtetrips", priority: "0.8", changefreq: "weekly" },
      { url: "/luxus", priority: "0.8", changefreq: "weekly" },
      { url: "/verwoehnartikel", priority: "0.7", changefreq: "weekly" },
      { url: "/blog", priority: "0.9", changefreq: "weekly" },
      ...blogPosts.map(post => ({ url: `/blog/${post.slug}`, priority: "0.8", changefreq: "monthly" })),
      { url: "/merkliste", priority: "0.3", changefreq: "monthly" },
      { url: "/vergleich", priority: "0.3", changefreq: "monthly" },
      { url: "/impressum", priority: "0.2", changefreq: "yearly" },
      { url: "/datenschutz", priority: "0.2", changefreq: "yearly" },
      { url: "/ueber-uns", priority: "0.4", changefreq: "monthly" },
      { url: "/versand", priority: "0.3", changefreq: "monthly" },
    ];

    const urls = mainPages.map(page => `
  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;
    
    res.type("application/xml").send(sitemap);
  });

  // Kategorien Sitemap
  app.get("/sitemap-categories.xml", async (req, res) => {
    const now = new Date().toISOString().split("T")[0];
    const siteUrl = getSiteUrl(req);
    const categories = await storage.getCategories();
    
    const urls = categories.map(cat => `
  <url>
    <loc>${siteUrl}/kategorie/${cat.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`).join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
    
    res.type("application/xml").send(sitemap);
  });

  // Produkte Sitemap Teil 1 (erste 5000 Produkte)
  app.get("/sitemap-products-1.xml", async (req, res) => {
    const now = new Date().toISOString().split("T")[0];
    const siteUrl = getSiteUrl(req);
    const result = await storage.getProducts({ page: 1, limit: 5000 });
    
    const urls = result.products.map(product => `
  <url>
    <loc>${siteUrl}/produkt/${product.id}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
    ${product.imageUrl ? `<image:image>
      <image:loc>${escapeXml(product.imageUrl)}</image:loc>
      <image:title>${escapeXml(product.title)}</image:title>
    </image:image>` : ""}
  </url>`).join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;
    
    res.type("application/xml").send(sitemap);
  });

  // Produkte Sitemap Teil 2 (Produkte 5001-10000)
  app.get("/sitemap-products-2.xml", async (req, res) => {
    const now = new Date().toISOString().split("T")[0];
    const siteUrl = getSiteUrl(req);
    const result = await storage.getProducts({ page: 2, limit: 5000 });
    
    const urls = result.products.map(product => `
  <url>
    <loc>${siteUrl}/produkt/${product.id}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
    ${product.imageUrl ? `<image:image>
      <image:loc>${escapeXml(product.imageUrl)}</image:loc>
      <image:title>${escapeXml(product.title)}</image:title>
    </image:image>` : ""}
  </url>`).join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;
    
    res.type("application/xml").send(sitemap);
  });

  // Produkte Sitemap Teil 3 (Rest der Produkte)
  app.get("/sitemap-products-3.xml", async (req, res) => {
    const now = new Date().toISOString().split("T")[0];
    const siteUrl = getSiteUrl(req);
    const result = await storage.getProducts({ page: 3, limit: 5000 });
    
    const urls = result.products.map(product => `
  <url>
    <loc>${siteUrl}/produkt/${product.id}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
    ${product.imageUrl ? `<image:image>
      <image:loc>${escapeXml(product.imageUrl)}</image:loc>
      <image:title>${escapeXml(product.title)}</image:title>
    </image:image>` : ""}
  </url>`).join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;
    
    res.type("application/xml").send(sitemap);
  });

  // API: Produkte abrufen mit Filter, Suche und Paginierung
  app.get("/api/products", async (req, res) => {
    try {
      const params = {
        query: req.query.query as string | undefined,
        category: req.query.category as string | undefined,
        minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
        maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
        sort: req.query.sort as "relevance" | "price-asc" | "price-desc" | "newest" | undefined,
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 16,
      };

      const result = await storage.getProducts(params);
      res.json(result);
    } catch (error) {
      console.error("Fehler beim Abrufen der Produkte:", error);
      res.status(500).json({ error: "Interner Serverfehler" });
    }
  });

  // API: Einzelnes Produkt abrufen
  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProductById(req.params.id);
      
      if (!product) {
        return res.status(404).json({ error: "Produkt nicht gefunden" });
      }

      res.json(product);
    } catch (error) {
      console.error("Fehler beim Abrufen des Produkts:", error);
      res.status(500).json({ error: "Interner Serverfehler" });
    }
  });

  // API: Alle Kategorien abrufen
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Fehler beim Abrufen der Kategorien:", error);
      res.status(500).json({ error: "Interner Serverfehler" });
    }
  });

  // API: Einzelne Kategorie nach Slug abrufen
  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      
      if (!category) {
        return res.status(404).json({ error: "Kategorie nicht gefunden" });
      }

      res.json(category);
    } catch (error) {
      console.error("Fehler beim Abrufen der Kategorie:", error);
      res.status(500).json({ error: "Interner Serverfehler" });
    }
  });

  // ===== BLOG API ROUTES =====

  // API: Alle Blog-Artikel abrufen
  app.get("/api/blog", (req, res) => {
    try {
      const { category } = req.query;
      
      if (category && typeof category === 'string') {
        const posts = getBlogPostsByCategory(category);
        return res.json(posts);
      }
      
      const posts = getBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Fehler beim Abrufen der Blog-Artikel:", error);
      res.status(500).json({ error: "Interner Serverfehler" });
    }
  });

  // API: Einzelner Blog-Artikel nach Slug
  app.get("/api/blog/:slug", (req, res) => {
    try {
      const post = getBlogPostBySlug(req.params.slug);
      
      if (!post) {
        return res.status(404).json({ error: "Artikel nicht gefunden" });
      }

      res.json(post);
    } catch (error) {
      console.error("Fehler beim Abrufen des Blog-Artikels:", error);
      res.status(500).json({ error: "Interner Serverfehler" });
    }
  });

  return httpServer;
}
