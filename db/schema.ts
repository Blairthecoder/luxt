import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  category: text("category").notNull(),
  price: integer("price").notNull(), // in USD dollars
  originalPrice: integer("original_price"),
  rating: text("rating").notNull().default("4.9"),
  reviewsCount: integer("reviews_count").notNull().default(0),
  badge: text("badge"),
  shortDescription: text("short_description").notNull(),
  description: text("description").notNull(),
  intensityLevel: text("intensity_level").notNull(),
  waterproof: text("waterproof").notNull(),
  material: text("material").notNull(),
  batteryLife: text("battery_life").notNull(),
  noiseLevel: text("noise_level").notNull(),
  inStock: integer("in_stock").notNull().default(1),
  images: text("images").notNull(), // JSON string array of URLs
  variants: text("variants").notNull(), // JSON string array of variant objects
  features: text("features").notNull(), // JSON string array
  specifications: text("specifications").notNull(), // JSON string object
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  authorName: text("author_name").notNull(),
  rating: integer("rating").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  verified: integer("verified").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerEmail: text("customer_email").notNull(),
  items: text("items").notNull(), // JSON string
  totalPrice: integer("total_price").notNull(),
  status: text("status").notNull().default("confirmed"),
  discreetPackaging: integer("discreet_packaging").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow(),
});
