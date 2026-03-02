"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { parseBlueprint } from "@/lib/blueprint-parser";
import { saveBlueprint } from "@/lib/storage";
import { containsBlueprint } from "@/lib/blueprint-detector";

export function ImportClient() {
  const router = useRouter();
  const [markdown, setMarkdown] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleImport() {
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
      saveBlueprint(blueprint);
      router.push("/blueprint");
    } catch {
      setError(
        "Failed to parse the Blueprint. Make sure it follows the standard Career Blueprint format."
      );
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold">Import Blueprint</h1>
      <p className="mt-2 text-sm text-muted">
        Paste your Career Blueprint markdown below. This is the output from a
        coaching session — it starts with &quot;# Career Blueprint&quot; and
        includes Career Goals, Skills, Next Steps, and Reflection sections.
      </p>

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
          disabled={!markdown.trim()}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Import & View Blueprint
        </button>
      </div>
    </div>
  );
}
