// src/App.jsx
import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Lazy-loaded pages (all pages)
const Home = lazy(() => import("./pages/Home.jsx"));
const Products = lazy(() => import("./pages/Products.jsx"));
const Subscription = lazy(() => import("./pages/Subscription.jsx"));
const Community = lazy(() => import("./pages/Community.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function PageLoader() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-56 rounded bg-accent/20" />
        <div className="h-4 w-full max-w-xl rounded bg-accent/10" />
        <div className="h-4 w-full max-w-lg rounded bg-accent/10" />
        <div className="h-4 w-full max-w-md rounded bg-accent/10" />
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    meta.setAttribute("content", theme === "dark" ? "#0f172a" : "#fafafa");
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <BrowserRouter>
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-secondary focus:px-4 focus:py-2 focus:text-primary focus:shadow"
      >
        Skip to content
      </a>

      <div className="min-h-screen bg-primary text-secondary flex flex-col">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />

        <main id="main-content" className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/community" element={<Community />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
