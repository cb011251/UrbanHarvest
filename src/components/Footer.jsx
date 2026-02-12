// src/components/Footer.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-secondary/10 bg-primary">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/15">
                <Icon icon="mdi:sprout-outline" className="text-accent" width="22" height="22" />
              </span>
              <div>
                <p className="font-semibold text-secondary">Urban Harvest</p>
                <p className="text-sm text-secondary/60">Eco-friendly shopping + community</p>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-sm text-secondary/70 leading-relaxed">
              Practical sustainability: low-waste products, smarter subscriptions, and a community that shares recipes
              and everyday habits.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-secondary/15 hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                aria-label="Instagram"
              >
                <Icon icon="mdi:instagram" width="20" height="20" className="text-secondary" />
              </a>
              <a
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-secondary/15 hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                aria-label="X / Twitter"
              >
                <Icon icon="mdi:twitter" width="20" height="20" className="text-secondary" />
              </a>
              <a
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-secondary/15 hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                aria-label="YouTube"
              >
                <Icon icon="mdi:youtube" width="20" height="20" className="text-secondary" />
              </a>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-secondary">Explore</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <NavLink className="text-secondary/70 hover:text-secondary" to="/products">
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink className="text-secondary/70 hover:text-secondary" to="/subscription">
                    Subscription
                  </NavLink>
                </li>
                <li>
                  <NavLink className="text-secondary/70 hover:text-secondary" to="/community">
                    Community
                  </NavLink>
                </li>
                <li>
                  <NavLink className="text-secondary/70 hover:text-secondary" to="/about">
                    Impact
                  </NavLink>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-secondary">Support</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a className="text-secondary/70 hover:text-secondary" href="#">
                    Help centre
                  </a>
                </li>
                <li>
                  <a className="text-secondary/70 hover:text-secondary" href="#">
                    Shipping & returns
                  </a>
                </li>
                <li>
                  <a className="text-secondary/70 hover:text-secondary" href="#">
                    Privacy
                  </a>
                </li>
                <li>
                  <a className="text-secondary/70 hover:text-secondary" href="#">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-secondary">Stay in the loop</p>
            <p className="mt-3 text-sm text-secondary/70 leading-relaxed">
              Monthly updates with practical tips, seasonal recipes, and new low-waste arrivals.
            </p>

            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <label className="sr-only" htmlFor="footer-email">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-secondary/15 bg-primary px-4 py-2 text-sm text-secondary placeholder:text-secondary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-primary shadow-sm transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                <Icon icon="mdi:send" width="18" height="18" />
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-secondary/10 pt-6 text-sm text-secondary/60 md:flex-row md:items-center md:justify-between">
          <p>© {year} Urban Harvest. All rights reserved.</p>
          <p className="inline-flex items-center gap-2">
            <Icon icon="mdi:shield-check-outline" width="18" height="18" className="text-accent" />
            Built with accessibility and performance in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
