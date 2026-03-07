"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { parseBlueprint } from "@/lib/blueprint-parser";
import { saveBlueprint } from "@/lib/storage";
import { containsBlueprint } from "@/lib/blueprint-detector";

interface ImportClientProps {
  isAuthenticated: boolean;
}

export function ImportClient({ isAuthenticated }: ImportClientProps) {
  const router = useRouter();
  const [markdown, setMarkdown] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleImport() {
    setError(null);

    if (!markdown.trim()) {
      setError("Please paste your Career Blueprint markdown.");
      return;
    }

    if (!containsBlueprint(markdown)) {
      setError(
        "This doesn't look like a Career Blueprint. Make sure it contains the \"# Career Blueprint\" heading and the standard sections."
      );
      return;
    }

    try {
      const blueprint = parseBlueprint(markdown);

      if (isAuthenticated) {
        setLoading(true);
        const res = await fetch("/api/blueprints", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: blueprint.name, data: blueprint }),
        });

        if (!res.ok) {
          throw new Error("Failed to save blueprint");
        }

        const saved = await res.json();
        router.push(`/blueprint?id=${saved.id}`);
      } else {
        // Fallback to localStorage for unauthenticated users
        saveBlueprint(blueprint);
        router.push("/blueprint");
      }
    } catch {
      setError(
        "Failed to parse the Blueprint. Make sure it follows the standard Career Blueprint format."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold">Import Blueprint</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Already have a Career Blueprint? If you ran a coaching session using the{" "}
        <a href="/coach" className="text-primary underline underline-offset-2 hover:text-primary-hover">
          Career Blueprint prompt
        </a>{" "}
        in ChatGPT, Claude, Gemini, or any other AI tool, you can paste the
        output here to turn it into an interactive tracker — with checkable
        actions, milestone status updates, and skill progress tracking.
      </p>

      <div className="mt-6 rounded-xl border border-border bg-card p-4">
        <h2 className="text-sm font-semibold">How to use this</h2>
        <ol className="mt-2 space-y-1.5 text-sm text-muted">
          <li className="flex gap-2">
            <span className="shrink-0 font-medium text-foreground">1.</span>
            Copy the full Career Blueprint output from your AI conversation — everything from{" "}
            <code className="rounded bg-border px-1.5 py-0.5 text-xs font-mono"># Career Blueprint</code>{" "}
            to the end
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 font-medium text-foreground">2.</span>
            Paste it in the box below
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 font-medium text-foreground">3.</span>
            Click &quot;Import &amp; View Blueprint&quot; to see it as an interactive tracker
          </li>
        </ol>
        <p className="mt-3 text-xs text-muted">
          Don&apos;t have a Blueprint yet?{" "}
          <a href="/coach" className="text-primary underline underline-offset-2 hover:text-primary-hover">
            Start a coaching session
          </a>{" "}
          to generate one.
        </p>
      </div>

      <textarea
        value={markdown}
        onChange={(e) => {
          setMarkdown(e.target.value);
          setError(null);
        }}
        placeholder="# Career Blueprint — Your Name&#10;&#10;## Career Goals&#10;..."
        rows={16}
        className="mt-6 w-full resize-y rounded-lg border border-border bg-card p-4 font-mono text-sm outline-none transition-colors placeholder:text-muted focus:border-primary"
      />

      {error && (
        <p className="mt-3 text-sm text-red-500">{error}</p>
      )}

      <div className="mt-4 flex gap-3">
        <button
          onClick={handleImport}
          disabled={!markdown.trim() || loading}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Importing..." : "Import & View Blueprint"}
        </button>
      </div>
    </div>
  );
}
