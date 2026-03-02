import type { Metadata } from "next";
import { ImportClient } from "./import-client";

export const metadata: Metadata = {
  title: "Import",
  description: "Import an existing Career Blueprint from markdown.",
};

export default function ImportPage() {
  return <ImportClient />;
}
