// src/components/Modal.jsx
import React, { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

function getFocusable(container) {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  );
}

/**
 * Accessible modal with:
 * - ESC to close
 * - click overlay to close
 * - basic focus trap
 */
export default function Modal({
  open = false,
  title = "",
  children,
  onClose,
  maxWidthClass = "max-w-2xl",
  labelledById,
}) {
  const dialogRef = useRef(null);
  const lastActiveRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    lastActiveRef.current = document.activeElement;

    // Prevent background scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus first focusable
    const focusables = getFocusable(dialogRef.current);
    (focusables[0] || dialogRef.current)?.focus?.();

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();

      if (e.key === "Tab") {
        const focusableEls = getFocusable(dialogRef.current);
        if (!focusableEls.length) return;

        const first = focusableEls[0];
        const last = focusableEls[focusableEls.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
      // Restore focus
      lastActiveRef.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const titleId = labelledById || "modal-title";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="presentation">
      {/* Overlay */}
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-label="Close modal"
        onClick={onClose}
      />

      {/* Dialog */}
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={`relative w-full ${maxWidthClass} rounded-3xl border border-secondary/15 bg-primary text-secondary shadow-xl`}
        ref={dialogRef}
        tabIndex={-1}
      >
        <div className="flex items-start justify-between gap-4 border-b border-secondary/10 px-5 py-4">
          <div className="min-w-0">
            {title ? (
              <h2 id={titleId} className="truncate text-base font-semibold">
                {title}
              </h2>
            ) : (
              <span className="sr-only" id={titleId}>
                Modal
              </span>
            )}
            <p className="mt-1 text-sm text-secondary/60">
              Press <kbd className="rounded bg-accent/10 px-1.5 py-0.5">Esc</kbd> to close.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-secondary/15 hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            aria-label="Close"
          >
            <Icon icon="mdi:close" width="22" height="22" />
          </button>
        </div>

        <div className="px-5 py-5">{children}</div>
      </section>
    </div>
  );
}
