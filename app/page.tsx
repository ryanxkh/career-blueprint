import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="relative mx-auto max-w-3xl px-6 py-32 text-center md:py-40">
          <h1 className="font-display text-5xl leading-tight tracking-tight md:text-7xl">
            One conversation.
            <br />
            <span className="text-primary">Your complete career plan.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
            A 30-minute AI coaching session that produces your personalized
            Career Blueprint — goals, skills assessment, and an actionable
            development plan.
          </p>
          <div className="mt-10">
            <Link
              href="/coach"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30"
            >
              Start Your Blueprint
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <p className="mt-8 text-xs tracking-wide text-muted">
            Tested across 11 career personas &middot; 9.29/10 avg coaching score
            &middot; Free to use
          </p>
        </div>
      </section>

      {/* Blueprint Preview — show the product */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-10">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted">
              Sample Career Blueprint
            </span>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {/* Goals */}
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
                Goals
              </h3>
              <div className="space-y-3">
                {SAMPLE_GOALS.map((goal) => (
                  <div
                    key={goal.horizon}
                    className="rounded-lg bg-background p-3"
                  >
                    <span className="text-[11px] font-medium uppercase tracking-wider text-primary">
                      {goal.horizon}
                    </span>
                    <p className="mt-1 text-sm font-medium leading-snug">
                      {goal.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
                Skills Assessment
              </h3>
              <div className="space-y-3.5">
                {SAMPLE_SKILLS.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted">{skill.level}/10</span>
                    </div>
                    <div className="mt-1.5 h-1.5 rounded-full bg-border">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${skill.level * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones */}
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
                Next Milestones
              </h3>
              <div className="space-y-3">
                {SAMPLE_MILESTONES.map((m) => (
                  <div key={m.title} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 ${
                        m.done
                          ? "border-success bg-success"
                          : "border-border"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium leading-snug">
                        {m.title}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">{m.due}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
          <h2 className="font-display text-center text-3xl tracking-tight md:text-4xl">
            Three steps to your blueprint
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-muted">
            No prep needed. Just show up and have a conversation.
          </p>

          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary text-lg font-semibold text-primary">
                  {step.number}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <h2 className="font-display text-center text-3xl tracking-tight md:text-4xl">
          What&apos;s inside your blueprint
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-muted">
          Every blueprint is unique to your career story, grounded in evidence
          from your conversation.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-lg">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
          <h2 className="font-display text-center text-3xl tracking-tight md:text-4xl">
            A coaching process built on evidence
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-muted">
            Developed through A/B/C testing across multiple LLM providers,
            validated across 11 diverse career personas, and bias-tested to
            score 9.29/10 with no meaningful bias across industries.
          </p>

          <div className="mt-16 flex flex-col items-center gap-0 md:flex-row md:gap-0">
            {PHASES.map((phase, i) => (
              <div key={phase.number} className="flex items-center">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                    {phase.number}
                  </div>
                  <h3 className="mt-3 text-sm font-semibold">{phase.title}</h3>
                  <p className="mt-1 text-xs text-muted">
                    {phase.description}
                  </p>
                </div>
                {i < PHASES.length - 1 && (
                  <div className="mx-4 hidden h-px w-12 bg-border md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <h2 className="font-display text-3xl tracking-tight md:text-4xl">
          Your blueprint is one conversation away
        </h2>
        <p className="mt-4 text-muted">
          30 minutes of focused conversation. One actionable career plan.
        </p>
        <div className="mt-10">
          <Link
            href="/coach"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30"
          >
            Get Started
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 text-center text-xs text-muted">
        <p>
          Built with Next.js, Vercel AI SDK, and Claude.{" "}
          <a
            href="https://github.com"
            className="underline underline-offset-2 transition-colors hover:text-foreground"
          >
            Open source
          </a>
          .
        </p>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Content data                                                       */
/* ------------------------------------------------------------------ */

const SAMPLE_GOALS = [
  { horizon: "1-Year", text: "Lead a cross-functional product team" },
  {
    horizon: "3-Year",
    text: "Director of Product at a growth-stage startup",
  },
  { horizon: "5-Year", text: "VP Product or found own company" },
];

const SAMPLE_SKILLS = [
  { name: "Strategic Thinking", level: 8 },
  { name: "People Leadership", level: 6 },
  { name: "Technical Architecture", level: 8 },
  { name: "Stakeholder Communication", level: 7 },
];

const SAMPLE_MILESTONES = [
  { title: "Complete leadership program", due: "Mar 2026", done: true },
  { title: "Ship v2.0 product launch", due: "Jun 2026", done: false },
  { title: "Build team to 5 engineers", due: "Sep 2026", done: false },
];

const STEPS = [
  {
    number: "1",
    title: "Share Your Story",
    description:
      "Tell the AI coach about your career history, accomplishments, and aspirations. It asks targeted questions across three areas — current reality, future vision, and development path.",
  },
  {
    number: "2",
    title: "Receive Your Blueprint",
    description:
      "The coach synthesizes your conversation into a structured Career Blueprint — goals across 5 time horizons, an evidence-based skills assessment, and concrete milestones.",
  },
  {
    number: "3",
    title: "Track Your Progress",
    description:
      "Your blueprint becomes a living document. Check off actions, update milestone statuses, track skill growth, and revisit monthly as your career evolves.",
  },
];

const FEATURES = [
  {
    icon: "\u25C9",
    title: "Career Goals",
    description:
      "Goals across 5 time horizons — from your next year to your ultimate aspiration — with built-in authenticity and coherence checks.",
  },
  {
    icon: "\u2261",
    title: "Skills Assessment",
    description:
      "Evidence-based proficiency ratings derived from your real accomplishments, plus desired skills mapped to your goals.",
  },
  {
    icon: "\u25CB",
    title: "Milestone Tracker",
    description:
      "3-5 concrete milestones with target dates, success criteria, and status tracking to keep you accountable.",
  },
  {
    icon: "\u25B3",
    title: "Reflection & Values",
    description:
      "Values alignment, trade-offs acknowledged, constraints honored, and accountability structures to keep your plan honest.",
  },
];

const PHASES = [
  { number: 1, title: "Understanding", description: "Context & background" },
  { number: 2, title: "Discovery", description: "Strategic questioning" },
  { number: 3, title: "Skills", description: "Evidence-based assessment" },
  { number: 4, title: "Goals", description: "Synthesis & articulation" },
  { number: 5, title: "Action", description: "Milestones & next steps" },
];
