import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";

import Accordion from "../components/Accordion.jsx";
import Modal from "../components/Modal.jsx";

import { posts, postCategories } from "../data/posts.js";

const classNames = (...arr) => arr.filter(Boolean).join(" ");

const Community = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPost, setSelectedPost] = useState(null);

  const categories = useMemo(() => {
    return [{ id: "all", label: "All" }, ...postCategories];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts
      .filter((p) => (activeCategory === "all" ? true : p.category === activeCategory))
      .filter((p) => {
        if (!q) return true;
        const haystack = [p.title, p.excerpt, p.author, p.category, ...(p.tags || []), ...(p.content || [])]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [query, activeCategory]);

  const featured = useMemo(() => {
    return posts.slice().sort((a, b) => (a.date < b.date ? 1 : -1))[0];
  }, []);

  const openPost = (post) => setSelectedPost(post);
  const closePost = () => setSelectedPost(null);

  const faqItems = useMemo(
    () => [
      {
        id: "faq-1",
        title: "Can anyone submit a post?",
        content:
          "Yes. Community posts are open to members. Submissions should be original, respectful, and practical. Recipes, sustainability tips, and short guides are all welcome.",
      },
      {
        id: "faq-2",
        title: "What kind of content performs best?",
        content:
          "Short, actionable posts with simple steps. People love quick swaps, meal-prep ideas, and beginner-friendly guides that fit into busy routines.",
      },
      {
        id: "faq-3",
        title: "How do you keep posts accessible?",
        content:
          "We encourage clear headings, short paragraphs, and descriptive titles. Images should include meaningful alt text, and content should avoid relying on color alone to communicate meaning.",
      },
    ],
    [],
  );

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-14">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-secondary">
              <Icon icon="mdi:account-group-outline" width="16" height="16" className="text-accent" />
              Community & Blog
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-secondary sm:text-4xl">
              Recipes, guides, and real-world swaps.
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-secondary/70">
              Browse sustainability tips and simple recipes shared by the Urban Harvest community. Filter by category,
              search by keyword, and open any post to read it in a distraction-free view.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/10 bg-primary px-4 py-2 text-sm text-secondary/70">
                <Icon icon="mdi:book-open-variant-outline" width="18" height="18" className="text-accent" />
                {posts.length} posts
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/10 bg-primary px-4 py-2 text-sm text-secondary/70">
                <Icon icon="mdi:leaf" width="18" height="18" className="text-accent" />
                Practical, beginner-friendly
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/10 bg-primary px-4 py-2 text-sm text-secondary/70">
                <Icon icon="mdi:access-point" width="18" height="18" className="text-accent" />
                Accessible by design
              </span>
            </div>
          </div>

          {/* Featured card */}
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-accent/10 blur-2xl" />
            <div className="overflow-hidden rounded-3xl border border-secondary/10 bg-primary shadow-sm">
              <img
                src={featured?.coverImage || "https://picsum.photos/seed/uh-community-featured/1200/900"}
                alt={featured?.title || "Featured community post"}
                loading="lazy"
                className="h-72 w-full object-cover sm:h-80"
              />
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">Featured</p>
                    <h2 className="mt-2 truncate text-lg font-semibold text-secondary">{featured?.title}</h2>
                    <p className="mt-2 text-sm text-secondary/70 leading-relaxed">{featured?.excerpt}</p>
                  </div>

                  <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-secondary">
                    <Icon icon="mdi:star-outline" width="16" height="16" className="text-accent" />
                    {featured?.readTime}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => openPost(featured)}
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  <Icon icon="mdi:open-in-new" width="18" height="18" />
                  Open post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-12 rounded-3xl border border-secondary/10 bg-primary p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Icon
                icon="mdi:magnify"
                width="20"
                height="20"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/40"
              />
              <label className="sr-only" htmlFor="community-search">
                Search posts
              </label>
              <input
                id="community-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts, tags, or authors…"
                className="w-full rounded-2xl border border-secondary/15 bg-primary py-2.5 pl-10 pr-3 text-sm text-secondary placeholder:text-secondary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {categories.map((c) => {
                const active = c.id === activeCategory;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveCategory(c.id)}
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

          <div className="mt-4 flex items-center justify-between text-sm text-secondary/60">
            <p>
              Showing <span className="font-semibold text-secondary">{filtered.length}</span> result
              {filtered.length === 1 ? "" : "s"}
            </p>

            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory("all");
              }}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-secondary hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            >
              <Icon icon="mdi:refresh" width="18" height="18" className="text-accent" />
              Reset
            </button>
          </div>
        </div>

        {/* Posts grid */}
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="group overflow-hidden rounded-3xl border border-secondary/10 bg-primary shadow-sm transition hover:shadow-md"
            >
              <div className="relative">
                <img
                  src={p.coverImage}
                  alt={p.title}
                  loading="lazy"
                  className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />

                <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-secondary shadow-sm backdrop-blur">
                  <Icon icon="mdi:tag-outline" width="16" height="16" className="text-accent" />
                  {p.category}
                </div>

                <div className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-secondary shadow-sm backdrop-blur">
                  <Icon icon="mdi:clock-outline" width="16" height="16" className="text-accent" />
                  {p.readTime}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-base font-semibold text-secondary">{p.title}</h3>
                <p className="mt-2 text-sm text-secondary/70 leading-relaxed">{p.excerpt}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {(p.tags || []).slice(0, 3).map((t) => (
                    <span key={t} className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-secondary">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-secondary/60">
                  <span className="inline-flex items-center gap-2">
                    <Icon icon="mdi:account-outline" width="16" height="16" className="text-accent" />
                    {p.author}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Icon icon="mdi:calendar-month-outline" width="16" height="16" className="text-accent" />
                    {p.date}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => openPost(p)}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-4 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  <Icon icon="mdi:open-in-new" width="18" height="18" />
                  Read
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-10 rounded-3xl border border-secondary/10 bg-primary p-10 text-center shadow-sm">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent/15">
              <Icon icon="mdi:file-search-outline" width="28" height="28" className="text-accent" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-secondary">No matches found.</h3>
            <p className="mt-2 text-sm text-secondary/70">Try a different keyword or switch categories.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory("all");
              }}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl border border-secondary/15 bg-primary px-5 py-2.5 text-sm font-semibold text-secondary shadow-sm transition hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            >
              <Icon icon="mdi:refresh" width="18" height="18" className="text-accent" />
              Reset filters
            </button>
          </div>
        )}

        {/* FAQ */}
        <div className="mt-14">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">Posting guidelines</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-secondary sm:text-3xl">
            Keep it helpful and accessible.
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-secondary/70 leading-relaxed">
            Short, clear writing and practical steps make content easier for everyone to read. Aim for useful tips and
            respectful discussion.
          </p>

          <div className="mt-6">
            <Accordion items={faqItems} allowMultiple={false} />
          </div>
        </div>
      </section>

      {/* Post modal */}
      <Modal
        open={Boolean(selectedPost)}
        onClose={closePost}
        title={selectedPost?.title || ""}
        maxWidthClass="max-w-3xl"
      >
        {selectedPost ? (
          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-secondary/10 bg-primary">
              <img
                src={selectedPost.coverImage}
                alt={selectedPost.title}
                loading="lazy"
                className="h-64 w-full object-cover"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-secondary/70">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2">
                <Icon icon="mdi:tag-outline" width="18" height="18" className="text-accent" />
                {selectedPost.category}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2">
                <Icon icon="mdi:clock-outline" width="18" height="18" className="text-accent" />
                {selectedPost.readTime}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2">
                <Icon icon="mdi:account-outline" width="18" height="18" className="text-accent" />
                {selectedPost.author}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2">
                <Icon icon="mdi:calendar-month-outline" width="18" height="18" className="text-accent" />
                {selectedPost.date}
              </span>
            </div>

            <p className="text-sm text-secondary/70 leading-relaxed">{selectedPost.excerpt}</p>

            <div className="rounded-3xl border border-secondary/10 bg-primary p-5">
              <h3 className="text-sm font-semibold text-secondary">Steps</h3>
              <ol className="mt-3 space-y-2 text-sm text-secondary/70">
                {(selectedPost.content || []).map((line, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent/15 text-xs font-semibold text-secondary">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ol>
            </div>

            {selectedPost.callout?.text && (
              <div className="rounded-3xl border border-secondary/10 bg-accent/10 p-5">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary">
                    <Icon icon="mdi:lightbulb-outline" width="22" height="22" className="text-accent" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-secondary">{selectedPost.callout.title || "Note"}</p>
                    <p className="mt-1 text-sm text-secondary/70 leading-relaxed">{selectedPost.callout.text}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {(selectedPost.tags || []).map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-secondary border border-secondary/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
};

export default Community;
