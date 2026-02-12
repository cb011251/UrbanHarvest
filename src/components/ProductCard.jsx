// src/components/ProductCard.jsx
import React from "react";
import { Icon } from "@iconify/react";

function classNames(...arr) {
  return arr.filter(Boolean).join(" ");
}

function formatMoney(value, currency = "USD") {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(value);
  } catch {
    return `${currency} ${Number(value).toFixed(2)}`;
  }
}

function scoreLabel(score) {
  if (score >= 90) return { text: "Excellent", icon: "mdi:leaf" };
  if (score >= 80) return { text: "Great", icon: "mdi:leaf-circle-outline" };
  if (score >= 70) return { text: "Good", icon: "mdi:sprout-outline" };
  return { text: "Fair", icon: "mdi:information-outline" };
}

/**
 * ProductCard
 * Props:
 * - product: one item from src/data/products.js
 * - onQuickView: (product) => void   // optional (for opening a modal)
 */
export default function ProductCard({ product, onQuickView }) {
  if (!product) return null;

  const {
    name,
    category,
    price,
    currency,
    shortDescription,
    image,
    badges = [],
    sustainability,
    rating,
    reviewsCount,
    inStock,
  } = product;

  const carbonScore = sustainability?.carbonScore ?? 0;
  const carbon = scoreLabel(carbonScore);

  return (
    <article className="group overflow-hidden rounded-3xl border border-secondary/10 bg-primary shadow-sm transition hover:shadow-md">
      <div className="relative">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {badges.slice(0, 3).map((b) => (
            <span
              key={b}
              className="rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-secondary shadow-sm backdrop-blur"
            >
              {b}
            </span>
          ))}
        </div>

        <div className="absolute right-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-secondary shadow-sm backdrop-blur">
          {formatMoney(price, currency)}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-secondary">{name}</h3>
            <p className="mt-1 text-sm text-secondary/60">{shortDescription}</p>
          </div>

          <span className="shrink-0 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-secondary">
            {category}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-secondary/70">
          <span className="inline-flex items-center gap-1.5">
            <Icon icon="mdi:star" className="text-accent" width="18" height="18" />
            <span className="font-semibold text-secondary">{rating?.toFixed?.(1) ?? "—"}</span>
            <span className="text-secondary/50">({reviewsCount ?? 0})</span>
          </span>

          <span className="h-4 w-px bg-secondary/15" />

          <span className="inline-flex items-center gap-1.5">
            <Icon icon={carbon.icon} className="text-accent" width="18" height="18" />
            <span className="font-semibold text-secondary">{carbonScore}</span>
            <span className="text-secondary/50">{carbon.text}</span>
          </span>

          <span className="h-4 w-px bg-secondary/15" />

          <span
            className={classNames("inline-flex items-center gap-1.5", inStock ? "text-secondary/70" : "text-rose-500")}
          >
            <Icon
              icon={inStock ? "mdi:check-circle-outline" : "mdi:close-circle-outline"}
              width="18"
              height="18"
              className={inStock ? "text-accent" : ""}
            />
            {inStock ? "In stock" : "Out of stock"}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onQuickView?.(product)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-accent px-4 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <Icon icon="mdi:eye-outline" width="18" height="18" />
            Quick view
          </button>

          <button
            type="button"
            disabled={!inStock}
            className={classNames(
              "inline-flex items-center justify-center rounded-2xl border px-4 py-2.5 text-sm font-semibold shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
              inStock
                ? "border-secondary/15 bg-primary text-secondary hover:bg-accent/10"
                : "cursor-not-allowed border-secondary/10 bg-primary text-secondary/40",
            )}
            aria-label="Add to cart"
          >
            <Icon icon="mdi:cart-outline" width="20" height="20" />
          </button>
        </div>

        {/* Optional sustainability details line */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-secondary/60">
          {sustainability?.plasticFree && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1">
              <Icon icon="mdi:recycle" width="16" height="16" className="text-accent" />
              Plastic-free
            </span>
          )}
          {sustainability?.vegan && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1">
              <Icon icon="mdi:leaf" width="16" height="16" className="text-accent" />
              Vegan
            </span>
          )}
          {sustainability?.palmOilFree && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1">
              <Icon icon="mdi:check-decagram-outline" width="16" height="16" className="text-accent" />
              Palm-oil free
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
