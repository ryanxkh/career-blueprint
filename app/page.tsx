import Link from "next/link";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { HeroChat } from "@/components/landing/hero-chat";
import { AnimatedCounter } from "@/components/landing/animated-counter";

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative">
        {/* Background layers — blueprint-style line grid */}
        <div className="hero-glow absolute inset-0" />
        <div className="blueprint-grid absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />


        {/* Content */}
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center md:gap-16 md:py-32 lg:py-40">
          {/* Left — copy */}
          <div>
            <h1 className="font-display text-5xl leading-[1.15] md:text-6xl lg:text-7xl">
              One conversation.
              <br />
              <span className="text-primary">Your complete career plan.</span>
            </h1>
            <p className="mt-6 max-w-md text-xl leading-relaxed text-muted">
              A 30-minute AI coaching session that produces your personalized
              Career Blueprint — goals, skills assessment, and an actionable
              development plan.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/coach"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-medium text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30"
              >
                Start Your Blueprint
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/import"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-base font-medium transition-colors hover:border-primary/30 hover:text-primary"
              >
                Import Existing
              </Link>
            </div>
          </div>

          {/* Right — animated product mockup */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-xl border border-stone-200 bg-white shadow-2xl dark:border-stone-700 dark:bg-stone-900">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-stone-200 bg-stone-50 px-4 py-2.5 dark:border-stone-700 dark:bg-stone-800">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                </div>
                <div className="ml-3 flex-1 rounded-md bg-stone-200/60 px-3 py-1 text-[11px] text-stone-400 dark:bg-stone-700 dark:text-stone-500">
                  career-blueprint.vercel.app/coach
                </div>
              </div>
              {/* Animated chat — client component */}
              <HeroChat />
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof Bar ─────────────────────────────────────── */}
      <section className="relative bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 dark:from-stone-800 dark:via-stone-700 dark:to-stone-800">
        <div className="blueprint-grid absolute inset-0 opacity-20" />
        <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 py-14 sm:grid-cols-3 md:py-16">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`${
                i < STATS.length - 1
                  ? "sm:border-r sm:border-white/10"
                  : ""
              }`}
            >
              <AnimatedCounter value={stat.value} label={stat.label} />
            </div>
          ))}
        </div>
      </section>

      {/* ── What's Inside ──────────────────────────────────────── */}
      <section className="bg-stone-100/50 dark:bg-stone-900/50">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <ScrollReveal>
            <h2 className="font-display text-center text-3xl md:text-4xl">
              Everything you need, in one blueprint
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-center text-base leading-relaxed text-muted">
              Three sections built from your conversation, grounded in evidence.
            </p>
          </ScrollReveal>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {/* Card 1 — Goals (violet) */}
            <ScrollReveal delay={100}>
              <div className="flex h-full flex-col rounded-2xl bg-primary p-8 text-white">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
                  Career Goals
                </h3>
                <p className="mt-3 font-display text-2xl leading-snug">
                  5 time horizons
                </p>
                <p className="mt-2 text-base leading-relaxed text-white">
                  From 1-year targets to your ultimate vision — each goal builds
                  on the last.
                </p>
                <div className="mt-6 space-y-2">
                  {["1-Year", "3-Year", "5-Year", "10-Year", "Ultimate"].map(
                    (h) => (
                      <div
                        key={h}
                        className="flex items-center gap-2.5 rounded-lg bg-white/10 px-3.5 py-2 text-sm"
                      >
                        <div className="h-2 w-2 rounded-full bg-white/60" />
                        {h}
                      </div>
                    )
                  )}
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2 — Skills */}
            <ScrollReveal delay={200}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                  Skills Assessment
                </h3>
                <p className="mt-3 font-display text-2xl leading-snug">
                  Evidence-based ratings
                </p>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  Honest skill ratings drawn from your own stories, not
                  self-reported guesses.
                </p>
                <div className="mt-6 space-y-4">
                  {SAMPLE_SKILLS.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted">{skill.level}/10</span>
                      </div>
                      <div className="mt-2 h-2.5 rounded-full bg-stone-200 dark:bg-stone-700">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${skill.level * 10}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Card 3 — Action Plan */}
            <ScrollReveal delay={300}>
              <div className="flex h-full flex-col rounded-2xl bg-stone-900 p-8 text-stone-100 dark:bg-stone-800">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Action Plan
                </h3>
                <p className="mt-3 font-display text-2xl leading-snug">
                  Concrete next steps
                </p>
                <p className="mt-2 text-base leading-relaxed text-stone-300">
                  Milestones with timelines so you know exactly what to do and
                  when.
                </p>
                <div className="mt-6 space-y-4">
                  {SAMPLE_MILESTONES.map((m) => (
                    <div key={m.title} className="flex items-start gap-3">
                      <div
                        className={`mt-1 h-5 w-5 shrink-0 rounded-full border-2 ${
                          m.done
                            ? "border-green-400 bg-green-400"
                            : "border-stone-600"
                        }`}
                      />
                      <div>
                        <p className="text-base font-medium">{m.title}</p>
                        <p className="text-sm text-stone-300">{m.due}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Transformation ───────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <ScrollReveal>
          <h2 className="font-display text-center text-3xl md:text-4xl">
            From raw conversation to structured plan
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-base leading-relaxed text-muted">
            You talk naturally. The coach does the synthesis.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 md:items-start">
          {/* Input — what you share */}
          <ScrollReveal delay={100}>
            <div className="rounded-2xl bg-stone-900 p-8 dark:bg-stone-800">
              <span className="text-sm font-semibold uppercase tracking-wider text-stone-300">
                What you share
              </span>
              <p className="mt-3 font-display text-2xl text-white">
                Your story, unfiltered
              </p>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-stone-300">
                <p>
                  &ldquo;I&apos;ve been a senior engineer for 3 years and I keep
                  getting passed over for the staff role. I think it&apos;s
                  because I focus too much on coding and not enough on
                  influence...&rdquo;
                </p>
                <p>
                  &ldquo;I managed a team of 4 once during an emergency, and
                  honestly I liked it more than I expected. But I&apos;m not sure
                  I want to give up being technical...&rdquo;
                </p>
                <p>
                  &ldquo;My dream is to eventually start something of my own,
                  but not yet. I need more experience first.&rdquo;
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Output — what you get */}
          <ScrollReveal delay={200}>
            <div className="rounded-2xl border border-primary/20 bg-primary/[0.03] p-8">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                What you get
              </span>
              <p className="mt-3 font-display text-2xl">
                Structured, actionable plan
              </p>
              <div className="mt-6 space-y-4">
                <div className="rounded-xl bg-card p-5 shadow-sm">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    1-Year Goal
                  </span>
                  <p className="mt-1.5 text-base font-medium leading-relaxed">
                    Earn Staff Engineer title through a visibility strategy
                    focused on cross-team influence, not just code output
                  </p>
                </div>
                <div className="rounded-xl bg-card p-5 shadow-sm">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Key Insight
                  </span>
                  <p className="mt-1.5 text-base font-medium leading-relaxed">
                    Your emergency management experience reveals latent
                    leadership ability — this is evidence, not speculation
                  </p>
                </div>
                <div className="rounded-xl bg-card p-5 shadow-sm">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Next Milestone
                  </span>
                  <p className="mt-1.5 text-base font-medium leading-relaxed">
                    Lead the Q2 architecture review as a dry run for the Staff
                    IC influence model
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── How It Works (condensed — merged methodology into steps) */}
      <section className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
          <ScrollReveal>
            <h2 className="font-display text-center text-3xl md:text-4xl">
              How it works
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-center text-base leading-relaxed text-muted">
              A 5-phase coaching methodology, tested across 20+ career personas
              with no meaningful bias. You just show up and talk.
            </p>
          </ScrollReveal>

          <div className="relative mt-16">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-6 hidden h-px w-[60%] -translate-x-1/2 bg-border md:block" />

            <div className="grid gap-12 md:grid-cols-3">
              {STEPS.map((step, i) => (
                <ScrollReveal key={step.number} delay={i * 150}>
                  <div className="relative text-center">
                    <div className="relative z-10 mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-background text-lg font-semibold text-primary">
                      {step.number}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                    <p className="text-base leading-relaxed text-muted">
                      {step.description}
                    </p>
                    {/* Phase tags under each step */}
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {step.phases.map((phase) => (
                        <span
                          key={phase}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        >
                          {phase}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-border">
        <div className="blueprint-grid absolute inset-0 opacity-30" />

        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-5xl">
              Your blueprint is one conversation away
            </h2>
            <p className="mt-4 text-xl leading-relaxed text-muted">
              30 minutes of focused conversation. One actionable career plan.
            </p>
            <div className="mt-10">
              <Link
                href="/coach"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30"
              >
                Get Started — It&apos;s Free
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:justify-between">
          <p>Built with Next.js, Vercel AI SDK, and Claude.</p>
          <div className="flex gap-6">
            <Link
              href="/import"
              className="transition-colors hover:text-foreground"
            >
              Import Blueprint
            </Link>
            <a
              href="https://github.com"
              className="transition-colors hover:text-foreground"
            >
              Open Source
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Content data                                                       */
/* ------------------------------------------------------------------ */

const STATS = [
  { value: "20+", label: "Career personas tested" },
  { value: "9.29/10", label: "Average coaching score" },
  { value: "5", label: "Evidence-based phases" },
];

const SAMPLE_SKILLS = [
  { name: "Strategic Thinking", level: 8 },
  { name: "People Leadership", level: 6 },
  { name: "Technical Architecture", level: 8 },
  { name: "Stakeholder Comms", level: 7 },
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
      "Tell the AI coach about your career history, accomplishments, and aspirations. No prep needed — just talk naturally.",
    phases: ["Understanding", "Discovery"],
  },
  {
    number: "2",
    title: "Receive Your Blueprint",
    description:
      "The coach synthesizes everything into a structured Career Blueprint — goals, skills, milestones, and reflection.",
    phases: ["Skills", "Goals"],
  },
  {
    number: "3",
    title: "Track Your Progress",
    description:
      "Your blueprint becomes a living document. Check off actions, update milestones, and revisit monthly.",
    phases: ["Action"],
  },
];
