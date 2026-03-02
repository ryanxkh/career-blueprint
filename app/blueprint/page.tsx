import type { Metadata } from "next";
import { BlueprintClient } from "./blueprint-client";

export const metadata: Metadata = {
  title: "Blueprint",
  description: "View and track your personalized Career Blueprint.",
};

export default function BlueprintPage() {
  return <BlueprintClient />;
}
