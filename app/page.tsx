import Link from "next/link";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { BlueprintDiamond } from "@/components/landing/blueprint-diamond";
import { HeroChat } from "@/components/landing/hero-chat";

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative">
        {/* Background layers — blueprint-style line grid */}
        <div className="hero-glow absolute inset-0" />
        <div className="blueprint-grid absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        {/* Floating brand shapes */}
        <BlueprintDiamond className="float-1 pointer-events-none absolute -right-8 top-12 h-44 w-44 text-primary/[0.12] md:h-56 md:w-56" />
        <BlueprintDiamond className="float-2 pointer-events-none absolute -left-16 top-1/3 h-32 w-32 text-primary/[0.08]" />
        <div className="float-3 pointer-events-none absolute bottom-24 right-1/4 h-20 w-20 rounded-full bg-primary/[0.06]" />
        <div className="float-2 pointer-events-none absolute left-1/3 top-16 h-12 w-12 rounded-xl bg-primary/[0.05] rotate-45" style={{ animationDelay: "3s" }} />

        {/* Content */}
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center md:gap-16 md:py-32 lg:py-40">
          {/* Left — copy */}
          <div>
            <h1 className="font-display text-5xl leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
              One conversation.
              <br />
              <span className="text-primary">Your complete career plan.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              A 30-minute AI coaching session that produces your personalized
              Career Blueprint — goals, skills assessment, and an actionable
              development plan.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/coach"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30"
              >
                Start Your Blueprint
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/import"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium transition-colors hover:border-primary/30 hover:text-primary"
              >
                Import Existing
              </Link>
            </div>
            <p className="mt-6 text-xs tracking-wide text-muted/70">
              Free to use &middot; No credit card required
            </p>
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
        {/* Subtle blueprint grid overlay */}
        <div className="blueprint-grid absolute inset-0 opacity-20" />
        <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 py-14 sm:grid-cols-3 md:py-16">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center gap-2 text-center ${
                i < STATS.length - 1
                  ? "sm:border-r sm:border-white/10"
                  : ""
              }`}
            >
              <div className="rounded-xl bg-white/[0.06] px-5 py-2 backdrop-blur-sm">
                <span className="font-display text-3xl text-white md:text-4xl">
                  {stat.value}
                </span>
              </div>
              <span className="text-xs tracking-wide text-stone-400 md:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bento Grid ───────────────────────────────────────────── */}
      <section className="bg-stone-100/50 dark:bg-stone-900/50">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <ScrollReveal>
            <h2 className="font-display text-center text-3xl tracking-tight md:text-4xl">
              Everything you need, in one blueprint
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-center text-muted">
              Your career plan comes with five key sections — all derived from
              your conversation, grounded in evidence.
            </p>
          </ScrollReveal>

          <div className="mt-16 grid gap-4 md:grid-cols-3 md:grid-rows-2">
            {/* Card 1 — Conversation (large, dark, spans 2 rows) */}
            <ScrollReveal className="md:row-span-2" delay={100}>
              <div className="flex h-full flex-col rounded-2xl bg-stone-900 p-8 text-stone-100 dark:bg-stone-800">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                  AI Coaching Session
                </h3>
                <p className="mt-3 font-display text-2xl leading-snug">
                  A real conversation, not a form.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-stone-400">
                  The coach asks targeted questions about your career — current
                  reality, future vision, and development path. It adapts to
                  your answers, not a script.
                </p>

                {/* Mini chat mockup */}
                <div className="mt-6 flex-1 space-y-2.5 rounded-xl bg-stone-800 p-4 dark:bg-stone-700/50">
                  <div className="w-fit max-w-[85%] rounded-xl rounded-tl-sm bg-stone-700 px-3 py-1.5 text-[12px] text-stone-300">
                    Tell me about your biggest career accomplishment.
                  </div>
                  <div className="ml-auto w-fit max-w-[85%] rounded-xl rounded-tr-sm bg-primary/80 px-3 py-1.5 text-[12px] text-white">
                    I led the migration of our entire platform to
                    microservices...
                  </div>
                  <div className="w-fit max-w-[85%] rounded-xl rounded-tl-sm bg-stone-700 px-3 py-1.5 text-[12px] text-stone-300">
                    What made that challenging? What skills did you develop?
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2 — Goals (violet) */}
            <ScrollReveal delay={200}>
              <div className="rounded-2xl bg-primary p-8 text-white">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Career Goals
                </h3>
                <p className="mt-3 font-display text-2xl leading-snug">
                  5 time horizons
                </p>
                <div className="mt-4 space-y-2">
                  {["1-Year", "3-Year", "5-Year", "10-Year", "Ultimate"].map(
                    (h) => (
                      <div
                        key={h}
                        className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-[12px]"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-white/60" />
                        {h}
                      </div>
                    )
                  )}
                </div>
              </div>
            </ScrollReveal>

            {/* Card 3 — Skills (light) */}
            <ScrollReveal delay={300}>
              <div className="rounded-2xl border border-border bg-card p-8">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Skills Assessment
                </h3>
                <p className="mt-3 font-display text-2xl leading-snug">
                  Evidence-based ratings
                </p>
                <div className="mt-4 space-y-3">
                  {SAMPLE_SKILLS.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted">{skill.level}/10</span>
                      </div>
                      <div className="mt-1.5 h-2 rounded-full bg-stone-200 dark:bg-stone-700">
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

            {/* Card 4 — Milestones & Reflection (dark, spans 2 cols) */}
            <ScrollReveal className="md:col-span-2" delay={400}>
              <div className="rounded-2xl bg-stone-900 p-8 text-stone-100 dark:bg-stone-800">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Milestones
                    </h3>
                    <p className="mt-3 font-display text-2xl leading-snug">
                      Concrete next steps
                    </p>
                    <div className="mt-4 space-y-3">
                      {SAMPLE_MILESTONES.map((m) => (
                        <div key={m.title} className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 ${
                              m.done
                                ? "border-green-400 bg-green-400"
                                : "border-stone-600"
                            }`}
                          />
                          <div>
                            <p className="text-sm font-medium">{m.title}</p>
                            <p className="text-xs text-stone-400">{m.due}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Reflection
                    </h3>
                    <p className="mt-3 font-display text-2xl leading-snug">
                      Values-aligned
                    </p>
                    <blockquote className="mt-4 border-l-2 border-primary/40 pl-4 text-sm italic leading-relaxed text-stone-400">
                      &ldquo;Your plan accounts for the trade-off between rapid
                      advancement and deep technical mastery. Both paths are
                      honored — the milestones sequence them intentionally.&rdquo;
                    </blockquote>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Transformation ───────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <ScrollReveal>
          <h2 className="font-display text-center text-3xl tracking-tight md:text-4xl">
            From raw conversation to structured plan
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-muted">
            You talk naturally. The coach does the synthesis.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {/* Input — what you share */}
          <ScrollReveal delay={100}>
            <div className="flex h-full flex-col rounded-2xl bg-stone-900 p-8 dark:bg-stone-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                What you share
              </span>
              <p className="mt-3 font-display text-2xl text-white">
                Your story, unfiltered
              </p>
              <div className="mt-6 flex-1 space-y-3 text-[13px] leading-relaxed text-stone-300">
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
            <div className="flex h-full flex-col rounded-2xl border border-primary/20 bg-primary/[0.03] p-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                What you get
              </span>
              <p className="mt-3 font-display text-2xl">
                Structured, actionable plan
              </p>
              <div className="mt-6 flex-1 space-y-4">
                <div className="rounded-xl bg-card p-4 shadow-sm">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                    1-Year Goal
                  </span>
                  <p className="mt-1 text-sm font-medium">
                    Earn Staff Engineer title through a visibility strategy
                    focused on cross-team influence, not just code output
                  </p>
                </div>
                <div className="rounded-xl bg-card p-4 shadow-sm">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                    Key Insight
                  </span>
                  <p className="mt-1 text-sm font-medium">
                    Your emergency management experience reveals latent
                    leadership ability — this is evidence, not speculation
                  </p>
                </div>
                <div className="rounded-xl bg-card p-4 shadow-sm">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                    Next Milestone
                  </span>
                  <p className="mt-1 text-sm font-medium">
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
            <h2 className="font-display text-center text-3xl tracking-tight md:text-4xl">
              How it works
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-center text-muted">
              A 5-phase coaching methodology, tested across 11 career personas
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
                    <p className="text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                    {/* Phase tags under each step */}
                    <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                      {step.phases.map((phase) => (
                        <span
                          key={phase}
                          className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary"
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
        {/* Floating shapes */}
        <BlueprintDiamond className="float-1 pointer-events-none absolute -left-10 top-8 h-36 w-36 text-primary/[0.10]" />
        <BlueprintDiamond className="float-3 pointer-events-none absolute -right-12 bottom-8 h-28 w-28 text-primary/[0.08]" />

        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
          <ScrollReveal>
            <h2 className="font-display text-3xl tracking-tight md:text-5xl">
              Your blueprint is one conversation away
            </h2>
            <p className="mt-4 text-lg text-muted">
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
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 text-xs text-muted sm:flex-row sm:justify-between">
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
  { value: "11", label: "Career personas tested" },
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
