CREATE TABLE "orders" (
	"id" serial PRIMARY KEY,
	"order_number" text NOT NULL UNIQUE,
	"customer_email" text NOT NULL,
	"items" text NOT NULL,
	"total_price" integer NOT NULL,
	"status" text DEFAULT 'confirmed' NOT NULL,
	"discreet_packaging" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY,
	"slug" text NOT NULL UNIQUE,
	"name" text NOT NULL,
	"tagline" text NOT NULL,
	"category" text NOT NULL,
	"price" integer NOT NULL,
	"original_price" integer,
	"rating" text DEFAULT '4.9' NOT NULL,
	"reviews_count" integer DEFAULT 0 NOT NULL,
	"badge" text,
	"short_description" text NOT NULL,
	"description" text NOT NULL,
	"intensity_level" text NOT NULL,
	"waterproof" text NOT NULL,
	"material" text NOT NULL,
	"battery_life" text NOT NULL,
	"noise_level" text NOT NULL,
	"in_stock" integer DEFAULT 1 NOT NULL,
	"images" text NOT NULL,
	"variants" text NOT NULL,
	"features" text NOT NULL,
	"specifications" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY,
	"product_id" integer NOT NULL,
	"author_name" text NOT NULL,
	"rating" integer NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"verified" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now()
);
