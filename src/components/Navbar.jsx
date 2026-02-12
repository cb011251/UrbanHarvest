// src/components/Navbar.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

const navLinkBase =
  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary";

const navLinkInactive = "text-secondary/80 hover:bg-accent/10 hover:text-secondary";
const navLinkActive = "bg-accent/15 text-secondary";

function classNames(...arr) {
  return arr.filter(Boolean).join(" ");
}

export default function Navbar({ theme = "light", onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const location = useLocation();

  const links = useMemo(
    () => [
      { to: "/", label: "Home", icon: "mdi:home-variant-outline" },
      { to: "/products", label: "Products", icon: "mdi:shopping-outline" },
      { to: "/subscription", label: "Subscribe", icon: "mdi:card-account-details-outline" },
      { to: "/community", label: "Community", icon: "mdi:account-group-outline" },
      { to: "/about", label: "Impact", icon: "mdi:leaf-circle-outline" },
    ],
    [],
  );

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // ESC closes mobile menu
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // When opening mobile menu, move focus to first link
  useEffect(() => {
    if (!mobileOpen) return;
    const firstFocusable = panelRef.current?.querySelector("a,button");
    firstFocusable?.focus?.();
  }, [mobileOpen]);

  const Brand = (
    <NavLink
      to="/"
      className="inline-flex items-center gap-2 rounded-xl px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
      aria-label="Urban Harvest"
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15">
        <Icon icon="mdi:sprout-outline" className="text-accent" width="20" height="20" />
      </span>
      <span className="leading-tight">
        <span className="block font-semibold tracking-tight text-secondary">Urban Harvest</span>
        <span className="block text-xs text-secondary/60">Sustainable living, simplified</span>
      </span>
    </NavLink>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-secondary/10 bg-primary/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {Brand}

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => classNames(navLinkBase, isActive ? navLinkActive : navLinkInactive)}
            >
              <Icon icon={l.icon} width="18" height="18" />
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex items-center gap-2 rounded-full border border-secondary/15 bg-primary px-3 py-2 text-sm font-medium text-secondary shadow-sm transition hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            <Icon
              icon={theme === "dark" ? "mdi:weather-sunny" : "mdi:weather-night"}
              width="18"
              height="18"
              className="text-accent"
            />
            <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            ref={toggleBtnRef}
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-full border border-secondary/15 bg-primary p-2 text-secondary shadow-sm transition hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary md:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <Icon icon={mobileOpen ? "mdi:close" : "mdi:menu"} width="22" height="22" />
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="md:hidden">
          <div className="mx-auto max-w-6xl px-4 pb-4" id="mobile-nav" ref={panelRef}>
            <nav
              aria-label="Mobile primary"
              className="mt-2 rounded-2xl border border-secondary/10 bg-primary shadow-sm"
            >
              <ul className="flex flex-col p-2">
                {links.map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      className={({ isActive }) =>
                        classNames(
                          "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
                          isActive ? "bg-accent/15 text-secondary" : "text-secondary/80 hover:bg-accent/10",
                        )
                      }
                    >
                      <Icon icon={l.icon} width="20" height="20" className="text-accent" />
                      {l.label}
                      <Icon icon="mdi:chevron-right" width="20" height="20" className="ml-auto text-secondary/40" />
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-3 flex items-center justify-between rounded-2xl border border-secondary/10 bg-primary px-4 py-3 text-sm text-secondary/70">
              <span className="inline-flex items-center gap-2">
                <Icon icon="mdi:leaf" className="text-accent" width="18" height="18" />
                Make small changes, daily.
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-full px-3 py-1.5 text-secondary hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
