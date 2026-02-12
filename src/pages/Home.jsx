import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import Modal from "../components/Modal.jsx";
import ProductCard from "../components/ProductCard.jsx";

import { featuredProducts } from "../data/products.js";
import { featuredPost } from "../data/posts.js";
import { impactStats, impactHighlights } from "../data/impactStats.js";

const classNames = (...arr) => arr.filter(Boolean).join(" ");

const Stat = ({ icon, label, value, unit }) => (
  <div className="rounded-3xl border border-secondary/10 bg-primary p-5 shadow-sm">
    <div className="flex items-start gap-3">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15">
        <Icon icon={icon} width="22" height="22" className="text-accent" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">{label}</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight text-secondary">
          {String(value)}
          {unit ? <span className="ml-1 text-base font-semibold text-secondary/70">{unit}</span> : null}
        </p>
      </div>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, text }) => (
  <div className="rounded-3xl border border-secondary/10 bg-primary p-6 shadow-sm transition hover:shadow-md">
    <div className="flex items-start gap-3">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15">
        <Icon icon={icon} width="22" height="22" className="text-accent" />
      </span>
      <div>
        <h3 className="text-base font-semibold text-secondary">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-secondary/70">{text}</p>
      </div>
    </div>
  </div>
);

const Home = () => {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);

  const statsForHome = useMemo(() => impactStats.slice(0, 4), []);
  const highlightsForHome = useMemo(() => impactHighlights.slice(0, 3), []);

  const openQuickView = (product) => {
    setActiveProduct(product);
    setQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setQuickViewOpen(false);
    setActiveProduct(null);
  };

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Soft background shapes */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-accent/10 to-transparent" />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-secondary">
                <Icon icon="mdi:sprout-outline" width="16" height="16" className="text-accent" />
                Sustainable shopping + community
              </div>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-secondary sm:text-5xl">
                Make low-waste living feel easy.
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-secondary/70">
                Urban Harvest brings together eco-friendly products, flexible subscriptions, and a community space for
                recipes and practical tips — built for everyday habits, not perfection.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-primary shadow-sm transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  <Icon icon="mdi:shopping-outline" width="18" height="18" />
                  Explore products
                </Link>

                <Link
                  to="/subscription"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-secondary/15 bg-primary px-6 py-3 text-sm font-semibold text-secondary shadow-sm transition hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  <Icon icon="mdi:card-account-details-outline" width="18" height="18" className="text-accent" />
                  View plans
                </Link>

                <Link
                  to="/community"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-secondary/15 bg-primary px-6 py-3 text-sm font-semibold text-secondary shadow-sm transition hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  <Icon icon="mdi:account-group-outline" width="18" height="18" className="text-accent" />
                  Join community
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-secondary/70">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/70 px-4 py-2 backdrop-blur border border-secondary/10">
                  <Icon icon="mdi:recycle" width="18" height="18" className="text-accent" />
                  Refills & reusables
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/70 px-4 py-2 backdrop-blur border border-secondary/10">
                  <Icon icon="mdi:truck-fast-outline" width="18" height="18" className="text-accent" />
                  Smarter deliveries
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/70 px-4 py-2 backdrop-blur border border-secondary/10">
                  <Icon icon="mdi:shield-check-outline" width="18" height="18" className="text-accent" />
                  Accessible by design
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-accent/10 blur-2xl" />

              <div className="overflow-hidden rounded-3xl border border-secondary/10 bg-primary shadow-sm">
                <img
                  src="https://picsum.photos/seed/home-hero/1200/900"
                  alt="Eco-friendly products and fresh ingredients"
                  loading="lazy"
                  className="h-72 w-full object-cover sm:h-80"
                />

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">This week</p>
                      <p className="mt-1 text-lg font-semibold text-secondary">Refill routines that actually stick</p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-secondary">
                      <Icon icon="mdi:leaf" width="16" height="16" className="text-accent" />
                      Low-waste
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-secondary/10 bg-primary p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">Tip</p>
                      <p className="mt-1 text-sm text-secondary/70 leading-relaxed">
                        Compare unit prices — refills often win over time.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-secondary/10 bg-primary p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">Recipe</p>
                      <p className="mt-1 text-sm text-secondary/70 leading-relaxed">
                        One-pan veggie bowl for fridge clean-outs.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <Link
                      to="/community"
                      className="inline-flex items-center gap-2 rounded-2xl border border-secondary/15 bg-primary px-4 py-2 text-sm font-semibold text-secondary shadow-sm transition hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                    >
                      <Icon icon="mdi:book-open-variant-outline" width="18" height="18" className="text-accent" />
                      Read more
                    </Link>

                    <Link
                      to="/about"
                      className="inline-flex items-center gap-2 rounded-2xl bg-accent px-4 py-2 text-sm font-semibold text-primary shadow-sm transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                    >
                      <Icon icon="mdi:leaf-circle-outline" width="18" height="18" />
                      Our impact
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statsForHome.map((s) => (
              <Stat key={s.id} icon={s.icon} label={s.label} value={s.value} unit={s.unit} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">How it helps</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-secondary sm:text-3xl">
              Designed for everyday choices.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-secondary/70 leading-relaxed">
              A simple system: pick products that align with your values, subscribe to reduce last-minute shopping, and
              learn from the community.
            </p>
          </div>

          <Link
            to="/about"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-secondary/15 bg-primary px-5 py-2.5 text-sm font-semibold text-secondary shadow-sm transition hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <Icon icon="mdi:information-outline" width="18" height="18" className="text-accent" />
            How we measure impact
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <FeatureCard
            icon="mdi:calculator-variant-outline"
            title="Sustainability signals"
            text="Clear sustainability attributes help you compare options quickly and make informed choices."
          />
          <FeatureCard
            icon="mdi:view-dashboard-outline"
            title="Personalized journey"
            text="Preferences and routines shape recommendations — the goal is consistency, not perfection."
          />
          <FeatureCard
            icon="mdi:account-group-outline"
            title="Community knowledge"
            text="Recipes, guides, and tips from people who actually live it — practical and realistic."
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {highlightsForHome.map((h) => (
            <FeatureCard key={h.id} icon={h.icon} title={h.title} text={h.description} />
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">Featured</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-secondary sm:text-3xl">
              Low-waste picks, ready to try.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-secondary/70 leading-relaxed">
              A few community favorites that fit naturally into daily routines.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <Icon icon="mdi:shopping-outline" width="18" height="18" />
            View all
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.slice(0, 6).map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={openQuickView} />
          ))}
        </div>
      </section>

      {/* COMMUNITY TEASER */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="rounded-3xl border border-secondary/10 bg-primary p-6 shadow-sm sm:p-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative overflow-hidden rounded-3xl border border-secondary/10 bg-primary">
              <img
                src={featuredPost?.coverImage || "https://picsum.photos/seed/uh-home-post/1200/900"}
                alt={featuredPost?.title || "Community post"}
                loading="lazy"
                className="h-72 w-full object-cover sm:h-80"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-primary">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                  <Icon icon="mdi:book-open-variant-outline" width="16" height="16" />
                  Community pick
                </div>
                <h3 className="mt-3 text-xl font-semibold leading-tight">{featuredPost?.title || "Featured post"}</h3>
                <p className="mt-2 text-sm text-primary/85">
                  {featuredPost?.excerpt || "Stories and tips from the Urban Harvest community."}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">Community</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-secondary sm:text-3xl">
                Recipes, guides, and real-world swaps.
              </h2>
              <p className="mt-3 text-sm text-secondary/70 leading-relaxed">
                Browse posts, learn quick habits, and share what works. The goal is to make sustainability feel
                practical — one routine at a time.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-secondary/10 bg-primary p-4">
                  <p className="text-sm font-semibold text-secondary">Share your routine</p>
                  <p className="mt-1 text-sm text-secondary/70 leading-relaxed">
                    Post a recipe, tip, or swap and help someone else get started.
                  </p>
                </div>
                <div className="rounded-2xl border border-secondary/10 bg-primary p-4">
                  <p className="text-sm font-semibold text-secondary">Learn seasonally</p>
                  <p className="mt-1 text-sm text-secondary/70 leading-relaxed">
                    Seasonal recipes + ingredient swaps reduce waste and cost.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/community"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  <Icon icon="mdi:account-group-outline" width="18" height="18" />
                  Explore community
                </Link>

                <Link
                  to="/subscription"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-secondary/15 bg-primary px-5 py-3 text-sm font-semibold text-secondary shadow-sm transition hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  <Icon icon="mdi:card-account-details-outline" width="18" height="18" className="text-accent" />
                  Get weekly recipes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      <Modal open={quickViewOpen} title={activeProduct?.name || ""} onClose={closeQuickView} maxWidthClass="max-w-3xl">
        {activeProduct ? (
          <div className="grid gap-6 md:grid-cols-2 md:items-start">
            <div className="overflow-hidden rounded-3xl border border-secondary/10 bg-primary">
              <img
                src={activeProduct.image}
                alt={activeProduct.name}
                className="h-72 w-full object-cover"
                loading="lazy"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                {(activeProduct.badges || []).slice(0, 4).map((b) => (
                  <span key={b} className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-secondary">
                    {b}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-sm text-secondary/70 leading-relaxed">{activeProduct.description}</p>

              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl border border-secondary/10 bg-primary p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">Sustainability</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-secondary/70">
                    {activeProduct?.sustainability?.plasticFree && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1">
                        <Icon icon="mdi:recycle" width="16" height="16" className="text-accent" />
                        Plastic-free
                      </span>
                    )}
                    {activeProduct?.sustainability?.vegan && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1">
                        <Icon icon="mdi:leaf" width="16" height="16" className="text-accent" />
                        Vegan
                      </span>
                    )}
                    {activeProduct?.sustainability?.palmOilFree && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1">
                        <Icon icon="mdi:check-decagram-outline" width="16" height="16" className="text-accent" />
                        Palm-oil free
                      </span>
                    )}
                    {activeProduct?.sustainability?.packaging && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1">
                        <Icon icon="mdi:package-variant-closed" width="16" height="16" className="text-accent" />
                        {activeProduct.sustainability.packaging}
                      </span>
                    )}
                    {"carbonScore" in (activeProduct.sustainability || {}) && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1">
                        <Icon icon="mdi:leaf-circle-outline" width="16" height="16" className="text-accent" />
                        Carbon score: {activeProduct.sustainability.carbonScore}
                      </span>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-secondary/10 bg-primary p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">Availability</p>
                  <p className="mt-2 text-sm text-secondary/70">
                    {activeProduct.inStock ? "In stock" : "Currently unavailable"}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <Link
                  to="/products"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                  onClick={closeQuickView}
                >
                  <Icon icon="mdi:shopping-outline" width="18" height="18" />
                  View in Products
                </Link>

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

export default Home;
