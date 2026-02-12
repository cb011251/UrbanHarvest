import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";

import Modal from "../components/Modal.jsx";
import ProductCard from "../components/ProductCard.jsx";

import { products, productCategories } from "../data/products.js";

const classNames = (...arr) => arr.filter(Boolean).join(" ");

const Products = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [minScore, setMinScore] = useState(0);

  const [selected, setSelected] = useState(null);

  const categories = useMemo(() => [{ id: "all", label: "All" }, ...productCategories], []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return products
      .filter((p) => (category === "all" ? true : p.category === category))
      .filter((p) => (onlyInStock ? p.inStock : true))
      .filter((p) => (p.sustainability?.carbonScore ?? 0) >= Number(minScore || 0))
      .filter((p) => {
        if (!q) return true;
        const hay = [
          p.name,
          p.shortDescription,
          p.description,
          p.category,
          ...(p.badges || []),
          p.sustainability?.packaging || "",
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      })
      .slice()
      .sort((a, b) => {
        // Sort by featured, then by carbonScore desc, then by rating desc
        const af = a.featured ? 1 : 0;
        const bf = b.featured ? 1 : 0;
        if (bf !== af) return bf - af;

        const as = a.sustainability?.carbonScore ?? 0;
        const bs = b.sustainability?.carbonScore ?? 0;
        if (bs !== as) return bs - as;

        const ar = a.rating ?? 0;
        const br = b.rating ?? 0;
        return br - ar;
      });
  }, [query, category, onlyInStock, minScore]);

  const openQuickView = (product) => setSelected(product);
  const closeQuickView = () => setSelected(null);

  const resetFilters = () => {
    setQuery("");
    setCategory("all");
    setOnlyInStock(false);
    setMinScore(0);
  };

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-14">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-secondary">
              <Icon icon="mdi:shopping-outline" width="16" height="16" className="text-accent" />
              Products & Services
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-secondary sm:text-4xl">
              Low-waste products you’ll actually use.
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-secondary/70">
              Explore eco-friendly options with clear sustainability attributes. Use filters to find items that match
              your routine — refills, reusables, pantry bundles, and more.
            </p>
          </div>

          <div className="rounded-3xl border border-secondary/10 bg-primary p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/15">
                <Icon icon="mdi:leaf" width="20" height="20" className="text-accent" />
              </span>
              <div>
                <p className="text-sm font-semibold text-secondary">Sustainability signals</p>
                <p className="text-sm text-secondary/60">Filter by carbon score and stock availability.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters (improved layout) */}
        <div className="mt-10 rounded-3xl border border-secondary/10 bg-primary p-5 shadow-sm">
          {/* Row 1: Search + Categories */}
          <div className="grid gap-4 lg:grid-cols-12 lg:items-center">
            {/* Search */}
            <div className="relative lg:col-span-5">
              <Icon
                icon="mdi:magnify"
                width="20"
                height="20"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/40"
              />
              <label className="sr-only" htmlFor="products-search">
                Search products
              </label>
              <input
                id="products-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, badge, packaging…"
                className="w-full rounded-2xl border border-secondary/15 bg-primary py-2.5 pl-10 pr-3 text-sm text-secondary placeholder:text-secondary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              />
            </div>

            {/* Categories */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((c) => {
                  const active = c.id === category;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategory(c.id)}
                      className={classNames(
                        "rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
                        active
                          ? "bg-accent text-primary"
                          : "border border-secondary/15 bg-primary text-secondary hover:bg-accent/10",
                      )}
                      aria-pressed={active}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-5 h-px bg-secondary/10" />

          {/* Row 2: Left = results / hint | Right = toggles + score + reset */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Left side: status */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-secondary/60">
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/10 bg-primary px-3 py-2">
                <Icon icon="mdi:filter-variant" width="18" height="18" className="text-accent" />
                Filters
              </span>

              <p>
                Showing <span className="font-semibold text-secondary">{filtered.length}</span> item
                {filtered.length === 1 ? "" : "s"}
              </p>

              {(query || category !== "all" || onlyInStock || Number(minScore) > 0) && (
                <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-2 text-sm text-secondary/70">
                  <Icon icon="mdi:information-outline" width="18" height="18" className="text-accent" />
                  Active filters applied
                </span>
              )}
            </div>

            {/* Right side: controls */}
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
              {/* In-stock toggle */}
              <label className="inline-flex items-center gap-2 rounded-full border border-secondary/10 bg-primary px-4 py-2 text-sm font-semibold text-secondary">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="h-4 w-4 rounded border-secondary/30 text-accent focus:ring-accent"
                />
                In stock only
              </label>

              {/* Min score */}
              <div className="inline-flex items-center gap-2 rounded-full border border-secondary/10 bg-primary px-4 py-2">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                  <Icon icon="mdi:leaf-circle-outline" width="18" height="18" className="text-accent" />
                  Min score
                </span>

                <input
                  type="number"
                  min={0}
                  max={100}
                  value={minScore}
                  onChange={(e) => setMinScore(e.target.value)}
                  className="w-20 rounded-xl border border-secondary/15 bg-primary px-3 py-1.5 text-sm text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                  aria-label="Minimum carbon score"
                />
              </div>

              {/* Reset */}
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 rounded-full border border-secondary/15 bg-primary px-4 py-2 text-sm font-semibold text-secondary shadow-sm transition hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                <Icon icon="mdi:refresh" width="18" height="18" className="text-accent" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={openQuickView} />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-10 rounded-3xl border border-secondary/10 bg-primary p-10 text-center shadow-sm">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent/15">
              <Icon icon="mdi:shopping-search-outline" width="28" height="28" className="text-accent" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-secondary">No products found.</h3>
            <p className="mt-2 text-sm text-secondary/70">
              Try lowering the minimum score or searching a different keyword.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl border border-secondary/15 bg-primary px-5 py-2.5 text-sm font-semibold text-secondary shadow-sm transition hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            >
              <Icon icon="mdi:refresh" width="18" height="18" className="text-accent" />
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* Quick view modal */}
      <Modal open={Boolean(selected)} onClose={closeQuickView} title={selected?.name || ""} maxWidthClass="max-w-3xl">
        {selected ? (
          <div className="grid gap-6 md:grid-cols-2 md:items-start">
            <div className="overflow-hidden rounded-3xl border border-secondary/10 bg-primary">
              <img src={selected.image} alt={selected.name} className="h-72 w-full object-cover" loading="lazy" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                {(selected.badges || []).slice(0, 4).map((b) => (
                  <span key={b} className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-secondary">
                    {b}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-sm text-secondary/70 leading-relaxed">{selected.description}</p>

              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl border border-secondary/10 bg-primary p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">Sustainability</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-secondary/70">
                    {selected?.sustainability?.plasticFree && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1">
                        <Icon icon="mdi:recycle" width="16" height="16" className="text-accent" />
                        Plastic-free
                      </span>
                    )}
                    {selected?.sustainability?.vegan && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1">
                        <Icon icon="mdi:leaf" width="16" height="16" className="text-accent" />
                        Vegan
                      </span>
                    )}
                    {selected?.sustainability?.palmOilFree && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1">
                        <Icon icon="mdi:check-decagram-outline" width="16" height="16" className="text-accent" />
                        Palm-oil free
                      </span>
                    )}
                    {selected?.sustainability?.packaging && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1">
                        <Icon icon="mdi:package-variant-closed" width="16" height="16" className="text-accent" />
                        {selected.sustainability.packaging}
                      </span>
                    )}
                    {"carbonScore" in (selected.sustainability || {}) && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1">
                        <Icon icon="mdi:leaf-circle-outline" width="16" height="16" className="text-accent" />
                        Carbon score: {selected.sustainability.carbonScore}
                      </span>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-secondary/10 bg-primary p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">Availability</p>
                  <p className="mt-2 text-sm text-secondary/70">
                    {selected.inStock ? "In stock" : "Currently unavailable"}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  type="button"
                  onClick={closeQuickView}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  <Icon icon="mdi:check" width="18" height="18" />
                  Done
                </button>

                <button
                  type="button"
                  onClick={closeQuickView}
                  className="inline-flex items-center justify-center rounded-2xl border border-secondary/15 bg-primary px-5 py-3 text-sm font-semibold text-secondary shadow-sm transition hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
};

export default Products;
