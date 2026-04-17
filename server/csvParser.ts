import * as fs from "fs";
import * as path from "path";
import type { Product, Category } from "@shared/schema";

// ADCELL Slot-ID von Rolf Schwertfechter (Affiliate-ID)
const ADCELL_SLOT_ID = "66376";

/**
 * Prüft und korrigiert die slotId im Deeplink auf die korrekte Affiliate-ID
 * Die promoId bleibt unverändert (das ist die Programm-ID von verwoehnwochenende.de)
 */
function rewriteDeeplink(originalDeeplink: string): string {
  if (!originalDeeplink) return "";
  
  // Prüfe ob die slotId korrekt ist, falls nicht ersetze sie
  if (originalDeeplink.includes("adcell.com") && originalDeeplink.includes("slotId=")) {
    // Ersetze nur die slotId falls sie nicht korrekt ist
    return originalDeeplink.replace(/slotId=\d+/, `slotId=${ADCELL_SLOT_ID}`);
  }
  
  return originalDeeplink;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ";" && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);

  return result;
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

function parsePrice(priceStr: string): number {
  if (!priceStr) return 0;
  const cleaned = priceStr.replace(",", ".").replace(/[^\d.]/g, "");
  return parseFloat(cleaned) || 0;
}

function parseCSVFile(csvPath: string, startId: number, encoding: BufferEncoding = "utf-8"): Product[] {
  if (!fs.existsSync(csvPath)) {
    console.error("CSV-Datei nicht gefunden:", csvPath);
    return [];
  }

  const buffer = fs.readFileSync(csvPath);
  let content: string;
  
  if (encoding === "latin1") {
    content = buffer.toString("latin1");
  } else {
    content = buffer.toString("utf-8");
  }
  
  const lines = content.split("\n").filter((line) => line.trim());

  if (lines.length < 2) {
    return [];
  }

  const dataLines = lines.slice(1);
  const products: Product[] = [];

  for (let i = 0; i < dataLines.length; i++) {
    const line = dataLines[i];
    if (!line.trim()) continue;

    try {
      const fields = parseCSVLine(line);
      
      if (fields.length < 14) continue;

      const category = fields[13]?.replace(/"/g, "").trim() || "Sonstiges";

      const rawDeeplink = fields[0]?.replace(/"/g, "").trim() || "";
      const product: Product = {
        id: `prod-${startId + i}`,
        deeplink: rewriteDeeplink(rawDeeplink),
        title: fields[1]?.replace(/"/g, "").trim() || "",
        description: fields[2]?.replace(/"/g, "").trim() || "",
        descriptionLong: fields[3]?.replace(/"/g, "").trim() || undefined,
        priceBrutto: parsePrice(fields[4]),
        priceNetto: parsePrice(fields[5]),
        currency: fields[6]?.replace(/"/g, "").trim() || "EUR",
        ean: fields[7]?.replace(/"/g, "").trim() || undefined,
        aan: fields[8]?.replace(/"/g, "").trim() || undefined,
        manufacturer: fields[9]?.replace(/"/g, "").trim() || undefined,
        han: fields[10]?.replace(/"/g, "").trim() || undefined,
        imageUrl: fields[11]?.replace(/"/g, "").trim() || "",
        thumbnailUrl: fields[12]?.replace(/"/g, "").trim() || "",
        category,
        shippingCost: parsePrice(fields[14]),
        deliveryTime: fields[22]?.replace(/"/g, "").trim() || undefined,
        availability: fields[23]?.replace(/"/g, "").trim() || undefined,
        basePrice: parsePrice(fields[24]) || undefined,
        basePriceUnit: fields[25]?.replace(/"/g, "").trim() || undefined,
        strikePrice: parsePrice(fields[27]) || undefined,
        categoryId: fields[29]?.replace(/"/g, "").trim() || undefined,
      };

      if (product.title && product.deeplink && product.priceBrutto > 0) {
        products.push(product);
      }
    } catch (error) {
      console.error(`Fehler beim Parsen von Zeile ${i + 1}:`, error);
    }
  }

  return products;
}

export function parseCSV(): { products: Product[]; categories: Category[] } {
  const assetsPath = path.join(process.cwd(), "attached_assets");
  
  const produkteCsvPath = path.join(assetsPath, "363820-66376_(1)_1764845311164.csv");
  const reisenCsvPath = path.join(assetsPath, "46013-66376_1764845304205.csv");
  
  const produkteProducts = parseCSVFile(produkteCsvPath, 1, "utf-8");
  console.log(`Produkte-CSV: ${produkteProducts.length} Artikel geladen`);
  
  const reisenProducts = parseCSVFile(reisenCsvPath, produkteProducts.length + 1, "latin1");
  console.log(`Reisen-CSV: ${reisenProducts.length} Artikel geladen`);
  
  const allProducts = [...produkteProducts, ...reisenProducts];
  
  const categoryMap = new Map<string, number>();
  for (const product of allProducts) {
    categoryMap.set(product.category, (categoryMap.get(product.category) || 0) + 1);
  }

  const categories: Category[] = Array.from(categoryMap.entries())
    .map(([name, count]) => ({
      name,
      slug: createSlug(name),
      count,
    }))
    .sort((a, b) => b.count - a.count);

  console.log(`Gesamt: ${allProducts.length} Produkte, ${categories.length} Kategorien`);

  return { products: allProducts, categories };
}
