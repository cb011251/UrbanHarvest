import React from "react";
import { Icon } from "@iconify/react";

import Accordion from "../components/Accordion.jsx";
import { impactStats, impactHighlights } from "../data/impactStats.js";

const classNames = (...arr) => arr.filter(Boolean).join(" ");

const About = () => {
  const faqs = [
    {
      id: "faq-ethics",
      title: "How do you evaluate ethical sourcing?",
      content:
        "We prioritise suppliers who can demonstrate transparent sourcing, fair labour standards, and responsible harvesting or manufacturing practices. Where possible, we request documentation and certifications, and we maintain ongoing dialogue with our partners.",
    },
    {
      id: "faq-carbon",
      title: "What does a carbon score represent?",
      content:
        "The carbon score is an internal comparative indicator based on packaging type, estimated transport distance, and product lifecycle considerations. It is designed to help users compare options quickly rather than provide a precise scientific calculation.",
    },
    {
      id: "faq-packaging",
      title: "Why focus on refills and reusables?",
      content:
        "Refills and reusable formats reduce single-use packaging and often lower total material use over time. Small, consistent swaps in packaging have measurable impact when adopted at scale.",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      {/* INTRO */}
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-secondary">
            <Icon icon="mdi:leaf-circle-outline" width="16" height="16" className="text-accent" />
            About Urban Harvest
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-secondary sm:text-4xl">
            A practical approach to sustainable living.
          </h1>

          <p className="mt-4 text-base leading-relaxed text-secondary/70">
            Urban Harvest is built around a simple idea: sustainability should feel achievable, repeatable, and
            transparent. We combine eco-friendly products, subscription models, and a community knowledge space to
            support everyday habits — not one-off gestures.
          </p>

          <p className="mt-4 text-base leading-relaxed text-secondary/70">
            Our focus is on clarity. Clear signals, measurable indicators, and straightforward comparisons help users
            make informed choices that align with their routines and values.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-accent/10 blur-2xl" />
          <div className="overflow-hidden rounded-3xl border border-secondary/10 bg-primary shadow-sm">
            <img
              src="https://picsum.photos/seed/uh-about-hero/1200/900"
              alt="Sustainable products and ethical sourcing"
              loading="lazy"
              className="h-72 w-full object-cover sm:h-80"
            />
            <div className="p-6">
              <p className="text-sm text-secondary/70 leading-relaxed">
                We work with suppliers who demonstrate responsible sourcing practices, reduced packaging impact, and
                transparent production methods.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* VALUES */}
      <div className="mt-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">Core principles</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-secondary sm:text-3xl">
            Designed with clarity and accountability.
          </h2>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {impactHighlights.map((h) => (
            <div
              key={h.id}
              className="rounded-3xl border border-secondary/10 bg-primary p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15">
                  <Icon icon={h.icon} width="22" height="22" className="text-accent" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-secondary">{h.title}</h3>
                  <p className="mt-2 text-sm text-secondary/70 leading-relaxed">{h.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* IMPACT METRICS */}
      <div className="mt-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">Measurable impact</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-secondary sm:text-3xl">
            Indicators that support informed decisions.
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-secondary/70 leading-relaxed">
            Our metrics focus on packaging reduction, supplier onboarding, and community engagement. They are not
            perfect representations of environmental impact, but they provide a consistent and transparent framework for
            comparison.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {impactStats.map((s) => (
            <div key={s.id} className="rounded-3xl border border-secondary/10 bg-primary p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15">
                  <Icon icon={s.icon} width="22" height="22" className="text-accent" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">{s.label}</p>
                  <p className="mt-1 text-2xl font-semibold text-secondary">
                    {String(s.value)}
                    {s.unit && <span className="ml-1 text-base font-semibold text-secondary/70">{s.unit}</span>}
                  </p>
                  {s.note && <p className="mt-2 text-sm text-secondary/60 leading-relaxed">{s.note}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROCESS / SOURCING FLOW */}
      <div className="mt-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">Sourcing approach</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-secondary sm:text-3xl">
            From supplier selection to delivery.
          </h2>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              id: "step-1",
              icon: "mdi:clipboard-text-outline",
              title: "Evaluation",
              text: "Suppliers are assessed based on material sourcing, packaging, labour practices, and production transparency.",
            },
            {
              id: "step-2",
              icon: "mdi:truck-delivery-outline",
              title: "Logistics optimisation",
              text: "Grouped deliveries and regional fulfilment are prioritised to reduce unnecessary transport emissions.",
            },
            {
              id: "step-3",
              icon: "mdi:account-group-outline",
              title: "Community feedback",
              text: "User feedback and product ratings inform continuous improvement and long-term supplier relationships.",
            },
          ].map((step) => (
            <div key={step.id} className="rounded-3xl border border-secondary/10 bg-primary p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15">
                  <Icon icon={step.icon} width="22" height="22" className="text-accent" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-secondary">{step.title}</h3>
                  <p className="mt-2 text-sm text-secondary/70 leading-relaxed">{step.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="mt-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary/60">Transparency</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-secondary sm:text-3xl">
            Frequently asked questions.
          </h2>
        </div>

        <div className="mt-8">
          <Accordion items={faqs} allowMultiple={false} />
        </div>
      </div>
    </section>
  );
};

export default About;
