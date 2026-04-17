import type { Product, Category, SearchParams, PaginatedResponse } from "@shared/schema";
import { parseCSV } from "./csvParser";

export interface IStorage {
  getProducts(params: SearchParams): Promise<PaginatedResponse>;
  getProductById(id: string): Promise<Product | undefined>;
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
}

export class MemStorage implements IStorage {
  private products: Product[] = [];
  private categories: Category[] = [];
  private initialized = false;

  constructor() {
    this.initialize();
  }

  private initialize() {
    if (this.initialized) return;

    const { products, categories } = parseCSV();
    this.products = products;
    this.categories = categories;
    this.initialized = true;

    console.log(`Storage initialisiert: ${this.products.length} Produkte, ${this.categories.length} Kategorien`);
  }

  async getProducts(params: SearchParams): Promise<PaginatedResponse> {
    let filtered = [...this.products];

    // Suche
    if (params.query) {
      const query = params.query.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Kategorie-Filter
    if (params.category) {
      filtered = filtered.filter((p) => p.category === params.category);
    }

    // Preis-Filter
    if (params.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.priceBrutto >= params.minPrice!);
    }
    if (params.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.priceBrutto <= params.maxPrice!);
    }

    // Sortierung
    switch (params.sort) {
      case "price-asc":
        filtered.sort((a, b) => a.priceBrutto - b.priceBrutto);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.priceBrutto - a.priceBrutto);
        break;
      case "newest":
        // ID-basierte Sortierung (neuere haben höhere IDs)
        filtered.sort((a, b) => {
          const aNum = parseInt(a.id.replace("prod-", ""));
          const bNum = parseInt(b.id.replace("prod-", ""));
          return bNum - aNum;
        });
        break;
      default:
        // Relevanz: Verfügbare Produkte zuerst
        filtered.sort((a, b) => {
          const aScore = a.availability === "in stock" ? 1 : 0;
          const bScore = b.availability === "in stock" ? 1 : 0;
          return bScore - aScore;
        });
    }

    const total = filtered.length;
    const page = params.page || 1;
    const limit = params.limit || 16;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const totalPages = Math.ceil(total / limit);

    const paginatedProducts = filtered.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      total,
      page,
      totalPages,
      hasMore: page < totalPages,
    };
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.find((p) => p.id === id);
  }

  async getCategories(): Promise<Category[]> {
    return this.categories;
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return this.categories.find((c) => c.slug === slug);
  }
}

export const storage = new MemStorage();
