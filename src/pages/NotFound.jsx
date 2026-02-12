// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const NotFound = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="rounded-3xl border border-secondary/10 bg-primary p-6 shadow-sm sm:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-secondary">
              <Icon icon="mdi:map-marker-question-outline" width="16" height="16" className="text-accent" />
              404 — Page not found
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-secondary sm:text-4xl">
              This page doesn’t exist.
            </h1>

            <p className="mt-3 text-base text-secondary/70 leading-relaxed">
              The link might be broken, or the page may have been moved. Use the buttons below to get back on track.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                <Icon icon="mdi:home-variant-outline" width="18" height="18" />
                Back to Home
              </Link>

              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-secondary/15 bg-primary px-5 py-3 text-sm font-semibold text-secondary shadow-sm transition hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                <Icon icon="mdi:shopping-outline" width="18" height="18" className="text-accent" />
                Browse Products
              </Link>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-secondary/15 bg-primary px-5 py-3 text-sm font-semibold text-secondary shadow-sm transition hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                <Icon icon="mdi:arrow-left" width="18" height="18" className="text-accent" />
                Go back
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-accent/10 blur-2xl" />
            <div className="grid place-items-center rounded-3xl border border-secondary/10 bg-primary p-8 shadow-sm sm:p-10">
              <div className="grid place-items-center rounded-3xl bg-accent/15 p-8">
                <Icon icon="mdi:compass-off-outline" width="64" height="64" className="text-accent" />
              </div>

              <p className="mt-5 text-center text-sm text-secondary/60">
                If you think this is a mistake, check the URL or return to the main pages.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs text-secondary/60">
                <Icon icon="mdi:link-variant" width="16" height="16" className="text-accent" />
                /404
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
