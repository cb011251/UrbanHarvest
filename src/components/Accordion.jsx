// src/components/Accordion.jsx
import React, { useId, useMemo, useState } from "react";
import { Icon } from "@iconify/react";

function classNames(...arr) {
  return arr.filter(Boolean).join(" ");
}

/**
 * Accordion
 * items: [{ id, title, content }] where content can be string OR ReactNode.
 * allowMultiple: allow multiple open at once (default false)
 * defaultOpenIds: array of ids to open initially
 */
export default function Accordion({ items = [], allowMultiple = false, defaultOpenIds = [], className = "" }) {
  const baseId = useId();

  const initialOpen = useMemo(() => {
    const set = new Set(defaultOpenIds);
    return items.reduce((acc, it) => {
      acc[it.id] = set.has(it.id);
      return acc;
    }, {});
  }, [items, defaultOpenIds]);

  const [openMap, setOpenMap] = useState(initialOpen);

  const toggle = (id) => {
    setOpenMap((prev) => {
      const next = { ...prev };
      const willOpen = !Boolean(prev[id]);

      if (!allowMultiple) {
        Object.keys(next).forEach((k) => (next[k] = false));
      }
      next[id] = willOpen;
      return next;
    });
  };

  return (
    <div className={classNames("space-y-3", className)}>
      {items.map((it, idx) => {
        const open = Boolean(openMap[it.id]);
        const headerId = `${baseId}-hdr-${idx}`;
        const panelId = `${baseId}-pnl-${idx}`;

        return (
          <div key={it.id} className="rounded-2xl border border-secondary/10 bg-primary shadow-sm">
            <button
              type="button"
              onClick={() => toggle(it.id)}
              className={classNames(
                "flex w-full items-center justify-between gap-3 px-4 py-4 text-left",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-2xl",
              )}
              aria-expanded={open}
              aria-controls={panelId}
              id={headerId}
            >
              <span className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15">
                  <Icon icon={open ? "mdi:minus" : "mdi:plus"} className="text-accent" width="20" height="20" />
                </span>
                <span className="font-semibold text-secondary">{it.title}</span>
              </span>

              <Icon
                icon="mdi:chevron-down"
                width="22"
                height="22"
                className={classNames("text-secondary/50 transition-transform", open ? "rotate-180" : "rotate-0")}
              />
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={classNames(
                "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="min-h-0">
                <div className="px-4 pb-4 text-sm text-secondary/70 leading-relaxed">
                  {typeof it.content === "string" ? <p>{it.content}</p> : it.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
