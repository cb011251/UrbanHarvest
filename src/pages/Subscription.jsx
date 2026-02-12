// src/pages/Subscription.jsx
import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";

import Accordion from "../components/Accordion.jsx";
import Modal from "../components/Modal.jsx";

import { subscriptionPlans, subscriptionFaq, getPlanById } from "../data/subscriptions.js";

const classNames = (...arr) => arr.filter(Boolean).join(" ");

const initialForm = {
  fullName: "",
  email: "",
  planId: "plan-plus",
  consent: false,
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form) {
  const errors = {};

  const name = form.fullName.trim();
  const email = form.email.trim();
  const plan = getPlanById(form.planId);

  if (!name) errors.fullName = "Please enter your name.";
  else if (name.length < 2) errors.fullName = "Name must be at least 2 characters.";

  if (!email) errors.email = "Please enter your email.";
  else if (!emailRegex.test(email)) errors.email = "Please enter a valid email address.";

  if (!plan) errors.planId = "Please select a plan.";

  if (!form.consent) errors.consent = "Please confirm you agree to be contacted about your plan.";

  return errors;
}

const Subscription = () => {
  const [selectedPlanId, setSelectedPlanId] = useState("plan-plus");

  const [form, setForm] = useState({ ...initialForm, planId: "plan-plus" });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [successOpen, setSuccessOpen] = useState(false);

  const selectedPlan = useMemo(() => getPlanById(selectedPlanId), [selectedPlanId]);

  const onPlanPick = (planId) => {
    setSelectedPlanId(planId);
    setForm((prev) => ({ ...prev, planId }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.planId;
      return next;
    });
  };

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const markTouched = (key) => setTouched((prev) => ({ ...prev, [key]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);

    // mark everything as touched so errors display
    setTouched({
      fullName: true,
      email: true,
      planId: true,
      consent: true,
    });

    if (Object.keys(nextErrors).length === 0) {
      setSuccessOpen(true);
    }
  };

  const handleCloseSuccess = () => {
    setSuccessOpen(false);
    // keep selected plan, reset rest
    setForm((prev) => ({ ...initialForm, planId: prev.planId }));
    setTouched({});
    setErrors({});
  };

  const hasError = (key) => Boolean(touched[key] && errors[key]);

  const inputBase =
    "w-full rounded-2xl border bg-primary px-4 py-2.5 text-sm text-secondary placeholder:text-secondary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60";

  const inputOk = "border-secondary/15";
  const inputBad = "border-rose-400";

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-14">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-secondary">
              <Icon icon="mdi:card-account-details-outline" width="16" height="16" className="text-accent" />
              Subscription
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-secondary sm:text-4xl">
              Plans that fit your routine.
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-secondary/70">
              Choose a plan for weekly recipes, sustainability tips, and refill-friendly bundles. You can change or
              cancel anytime — the goal is consistency, not perfection.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/10 bg-primary px-4 py-2 text-sm text-secondary/70">
                <Icon icon="mdi:calendar-sync-outline" width="18" height="18" className="text-accent" />
                Flexible monthly plans
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/10 bg-primary px-4 py-2 text-sm text-secondary/70">
                <Icon icon="mdi:leaf" width="18" height="18" className="text-accent" />
                Low-waste friendly options
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/10 bg-primary px-4 py-2 text-sm text-secondary/70">
                <Icon icon="mdi:shield-check-outline" width="18" height="18" className="text-accent" />
                Accessible form validation
              </span>
            </div>
          </div>

          {/* Side summary card */}
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-accent/10 blur-2xl" />
            <div className="rounded-3xl border border-secondary/10 bg-primary p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15">
                  <Icon icon="mdi:star-outline" width="22" height="22" className="text-accent" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-secondary">Recommended</p>
                  <p className="mt-1 text-sm text-secondary/70 leading-relaxed">
                    Start with <span className="font-semibold text-secondary">Plus</span> for weekly recipes and
                    community features. Upgrade later if you want refill bundles.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-secondary/10 bg-primary p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">Includes</p>
                  <p className="mt-2 text-sm text-secondary/70">Weekly recipes + swaps</p>
                </div>
                <div className="rounded-2xl border border-secondary/10 bg-primary p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">Support</p>
                  <p className="mt-2 text-sm text-secondary/70">Priority help on Green plan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">Choose a plan</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-secondary sm:text-3xl">
            Simple, transparent pricing.
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {subscriptionPlans.map((p) => {
              const active = p.id === selectedPlanId;

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onPlanPick(p.id)}
                  className={classNames(
                    "text-left rounded-3xl border bg-primary p-6 shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
                    active ? "border-accent/50 shadow-md" : "border-secondary/10 hover:shadow-md",
                  )}
                  aria-pressed={active}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-secondary">{p.name}</p>
                      <p className="mt-1 text-sm text-secondary/70 leading-relaxed">{p.description}</p>
                    </div>

                    {p.badge ? (
                      <span
                        className={classNames(
                          "rounded-full px-3 py-1 text-xs font-semibold",
                          active ? "bg-accent text-primary" : "bg-accent/15 text-secondary",
                        )}
                      >
                        {p.badge}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-5 flex items-end gap-2">
                    <p className="text-3xl font-semibold tracking-tight text-secondary">
                      {p.price === 0 ? "Free" : `$${p.price}`}
                    </p>
                    {p.price !== 0 && <p className="pb-1 text-sm text-secondary/60">/ {p.period}</p>}
                  </div>

                  <ul className="mt-5 space-y-2 text-sm text-secondary/70">
                    {p.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Icon icon="mdi:check-circle-outline" width="18" height="18" className="mt-0.5 text-accent" />
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                    {active ? (
                      <>
                        <Icon icon="mdi:check" width="18" height="18" className="text-accent" />
                        Selected
                      </>
                    ) : (
                      <>
                        <Icon icon="mdi:cursor-default-click-outline" width="18" height="18" className="text-accent" />
                        Select plan
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">Sign up</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-secondary sm:text-3xl">
              Get started in under a minute.
            </h2>
            <p className="mt-3 text-sm text-secondary/70 leading-relaxed">
              This is client-side validation only. You’ll see clear success and error states, with accessible messages
              and focus styles.
            </p>

            <div className="mt-6 rounded-3xl border border-secondary/10 bg-primary p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15">
                  <Icon icon="mdi:information-outline" width="22" height="22" className="text-accent" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-secondary">Selected plan</p>
                  <p className="mt-1 text-sm text-secondary/70 leading-relaxed">
                    <span className="font-semibold text-secondary">{selectedPlan?.name}</span>{" "}
                    {selectedPlan?.price === 0 ? "(Free)" : `($${selectedPlan?.price} / ${selectedPlan?.period})`}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-secondary/10 bg-primary p-6 shadow-sm">
              <p className="text-sm font-semibold text-secondary">Why subscriptions?</p>
              <ul className="mt-3 space-y-2 text-sm text-secondary/70">
                <li className="flex items-start gap-2">
                  <Icon icon="mdi:recycle" width="18" height="18" className="mt-0.5 text-accent" />
                  Consistent refills reduce last-minute single-use purchases.
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="mdi:calendar-check-outline" width="18" height="18" className="mt-0.5 text-accent" />A
                  routine makes sustainable habits easier to stick with.
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="mdi:account-group-outline" width="18" height="18" className="mt-0.5 text-accent" />
                  Community knowledge helps you learn practical swaps quickly.
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-secondary/10 bg-primary p-6 shadow-sm sm:p-8">
            <form onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-secondary">
                  Full name
                </label>
                <div className="mt-2 relative">
                  <input
                    id="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    onBlur={() => {
                      markTouched("fullName");
                      setErrors((prev) => ({ ...prev, ...validate({ ...form }) }));
                    }}
                    className={classNames(inputBase, hasError("fullName") ? inputBad : inputOk)}
                    placeholder="Your name"
                    aria-invalid={hasError("fullName")}
                    aria-describedby={hasError("fullName") ? "fullName-error" : undefined}
                  />
                  {touched.fullName && !errors.fullName && form.fullName.trim() ? (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600">
                      <Icon icon="mdi:check-circle-outline" width="20" height="20" />
                    </span>
                  ) : null}
                </div>

                {hasError("fullName") && (
                  <p id="fullName-error" className="mt-2 text-sm text-rose-500">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mt-5">
                <label htmlFor="email" className="block text-sm font-semibold text-secondary">
                  Email
                </label>
                <div className="mt-2 relative">
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    onBlur={() => {
                      markTouched("email");
                      setErrors((prev) => ({ ...prev, ...validate({ ...form }) }));
                    }}
                    className={classNames(inputBase, hasError("email") ? inputBad : inputOk)}
                    placeholder="you@example.com"
                    aria-invalid={hasError("email")}
                    aria-describedby={hasError("email") ? "email-error" : undefined}
                  />
                  {touched.email && !errors.email && form.email.trim() ? (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600">
                      <Icon icon="mdi:check-circle-outline" width="20" height="20" />
                    </span>
                  ) : null}
                </div>

                {hasError("email") && (
                  <p id="email-error" className="mt-2 text-sm text-rose-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Plan (hidden but validated) */}
              <input type="hidden" name="planId" value={form.planId} />

              {touched.planId && errors.planId ? <p className="mt-4 text-sm text-rose-500">{errors.planId}</p> : null}

              {/* Consent */}
              <div className="mt-5">
                <label className="flex items-start gap-3 rounded-2xl border border-secondary/10 bg-primary p-4">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => update("consent", e.target.checked)}
                    onBlur={() => {
                      markTouched("consent");
                      setErrors((prev) => ({ ...prev, ...validate({ ...form }) }));
                    }}
                    className="mt-1 h-4 w-4 rounded border-secondary/30 text-accent focus:ring-accent"
                    aria-invalid={hasError("consent")}
                    aria-describedby={hasError("consent") ? "consent-error" : undefined}
                  />
                  <span className="text-sm text-secondary/70 leading-relaxed">
                    I agree to be contacted about this subscription (updates and onboarding details).
                  </span>
                </label>

                {hasError("consent") && (
                  <p id="consent-error" className="mt-2 text-sm text-rose-500">
                    {errors.consent}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                <Icon icon="mdi:rocket-launch-outline" width="18" height="18" />
                Create subscription
              </button>
            </form>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-14">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">Questions</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-secondary sm:text-3xl">FAQs</h2>
          <p className="mt-3 max-w-3xl text-sm text-secondary/70 leading-relaxed">
            Clear answers to common questions about plans, cancellations, and refills.
          </p>

          <div className="mt-6">
            <Accordion
              items={subscriptionFaq.map((f) => ({
                id: f.id,
                title: f.question,
                content: f.answer,
              }))}
              allowMultiple={false}
            />
          </div>
        </div>
      </section>

      {/* Success modal */}
      <Modal open={successOpen} onClose={handleCloseSuccess} title="Subscription created" maxWidthClass="max-w-2xl">
        <div className="space-y-5">
          <div className="rounded-3xl border border-secondary/10 bg-primary p-6">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15">
                <Icon icon="mdi:check-circle-outline" width="24" height="24" className="text-accent" />
              </span>
              <div>
                <p className="text-sm font-semibold text-secondary">You’re set.</p>
                <p className="mt-1 text-sm text-secondary/70 leading-relaxed">
                  We captured your details and selected plan. In a real system, this would now be stored and linked to
                  your profile.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-secondary/10 bg-primary p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">Name</p>
              <p className="mt-2 text-sm text-secondary">{form.fullName}</p>
            </div>

            <div className="rounded-3xl border border-secondary/10 bg-primary p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">Email</p>
              <p className="mt-2 text-sm text-secondary">{form.email}</p>
            </div>

            <div className="rounded-3xl border border-secondary/10 bg-primary p-5 sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">Plan</p>
              <p className="mt-2 text-sm text-secondary">
                {getPlanById(form.planId)?.name}{" "}
                {getPlanById(form.planId)?.price === 0
                  ? "(Free)"
                  : `($${getPlanById(form.planId)?.price} / ${getPlanById(form.planId)?.period})`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCloseSuccess}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <Icon icon="mdi:check" width="18" height="18" />
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Subscription;
