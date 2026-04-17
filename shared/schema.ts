import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  deeplink: z.string(),
  title: z.string(),
  description: z.string(),
  descriptionLong: z.string().optional(),
  priceBrutto: z.number(),
  priceNetto: z.number(),
  currency: z.string().default("EUR"),
  ean: z.string().optional(),
  aan: z.string().optional(),
  manufacturer: z.string().optional(),
  han: z.string().optional(),
  imageUrl: z.string(),
  thumbnailUrl: z.string(),
  category: z.string(),
  shippingCost: z.number().optional(),
  deliveryTime: z.string().optional(),
  availability: z.string().optional(),
  basePrice: z.number().optional(),
  basePriceUnit: z.string().optional(),
  strikePrice: z.number().optional(),
  categoryId: z.string().optional(),
});

export type Product = z.infer<typeof productSchema>;

export const categorySchema = z.object({
  name: z.string(),
  slug: z.string(),
  count: z.number(),
  icon: z.string().optional(),
});

export type Category = z.infer<typeof categorySchema>;

export const searchParamsSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  sort: z.enum(["relevance", "price-asc", "price-desc", "newest"]).optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});

export type SearchParams = z.infer<typeof searchParamsSchema>;

export const paginatedResponseSchema = z.object({
  products: z.array(productSchema),
  total: z.number(),
  page: z.number(),
  totalPages: z.number(),
  hasMore: z.boolean(),
});

export type PaginatedResponse = z.infer<typeof paginatedResponseSchema>;

// Blog Schema
export const blogPostSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  imageUrl: z.string(),
  author: z.string(),
  publishedAt: z.string(),
  readingTime: z.number(),
  metaDescription: z.string(),
});

export type BlogPost = z.infer<typeof blogPostSchema>;
