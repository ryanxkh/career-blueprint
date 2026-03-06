import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="flex flex-col items-center py-20 text-center md:py-28">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Powered by Claude
        </div>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Build your career plan with{" "}
          <span className="text-primary">AI-powered coaching</span>
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
          A structured coaching conversation that produces your personalized
          Career Blueprint — complete with goals, skills assessment, and an
          actionable development plan with milestones.
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            href="/coach"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Start Coaching Session
          </Link>
          <Link
            href="/import"
            className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/30"
          >
            Import Existing Blueprint
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <h2 className="mb-10 text-center text-2xl font-bold">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {step.number}
              </div>
              <h3 className="mb-2 font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16">
        <h2 className="mb-10 text-center text-2xl font-bold">
          What&apos;s In Your Blueprint
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-border bg-card p-5"
            >
              <h3 className="mb-1 text-sm font-semibold">{feature.title}</h3>
              <p className="text-xs leading-relaxed text-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section className="py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold">
            5-Phase Coaching Methodology
          </h2>
          <p className="text-sm leading-relaxed text-muted">
            The coaching session follows a structured 5-phase process developed
            through A/B/C testing across multiple LLM providers, universality
            testing across 4 diverse career personas, and bias testing across 7
            additional personas — scoring an average 9.29/10 with no meaningful
            bias across industries.
          </p>
        </div>
        <div className="mt-10 grid gap-3 md:grid-cols-5">
          {PHASES.map((phase) => (
            <div
              key={phase.number}
              className="flex flex-col items-center rounded-xl border border-border bg-card p-4 text-center"
            >
              <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {phase.number}
              </span>
              <h3 className="mb-1 text-xs font-semibold">{phase.title}</h3>
              <p className="text-xs text-muted">{phase.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <h2 className="mb-4 text-2xl font-bold">Ready to build your plan?</h2>
        <p className="mb-6 text-muted">
          20-30 minutes of focused conversation. One actionable Career Blueprint.
        </p>
        <Link
          href="/coach"
          className="inline-block rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Start Your Session
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-xs text-muted">
        <p>
          Built with Next.js, Vercel AI SDK, and Claude.{" "}
          The prompt behind this project is{" "}
          <a
            href="https://github.com"
            className="underline underline-offset-2 hover:text-foreground"
          >
            open source
          </a>
          .
        </p>
      </footer>
    </div>
  );
}

const STEPS = [
  {
    number: "1",
    title: "Have a Conversation",
    description:
      "Share your career story, accomplishments, and aspirations. The AI coach asks targeted questions across three areas: current reality, future vision, and development path.",
  },
  {
    number: "2",
    title: "Get Your Blueprint",
    description:
      "The coach synthesizes your conversation into a structured Career Blueprint — goals across 5 time horizons, an evidence-based skills assessment, and concrete milestones.",
  },
  {
    number: "3",
    title: "Track & Evolve",
    description:
      "Your Blueprint becomes an interactive tracker. Check off actions, update milestone statuses, track skill progress, and review monthly as your career evolves.",
  },
];

const FEATURES = [
  {
    title: "Career Goals",
    description:
      "5 time horizons from 1-year to ultimate, with authenticity and coherence checks built in.",
  },
  {
    title: "Skills Assessment",
    description:
      "Evidence-based current skills derived from your accomplishments, plus desired skills mapped to goals.",
  },
  {
    title: "Milestone Tracker",
    description:
      "3-5 concrete milestones with due dates, success criteria, and status tracking.",
  },
  {
    title: "Reflection",
    description:
      "Values alignment, trade-offs acknowledged, constraints honored, and accountability structures.",
  },
];

const PHASES = [
  { number: 1, title: "Understanding", description: "Context & background" },
  { number: 2, title: "Discovery", description: "Strategic questioning" },
  { number: 3, title: "Skills", description: "Evidence-based assessment" },
  { number: 4, title: "Goals", description: "Synthesis & articulation" },
  { number: 5, title: "Action", description: "Milestones & next steps" },
];
