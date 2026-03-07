import type { Metadata } from "next";
import { auth } from "@/auth";
import { ImportClient } from "./import-client";

export const metadata: Metadata = {
  title: "Import",
  description: "Import an existing Career Blueprint from markdown.",
};

export default async function ImportPage() {
  const session = await auth();
  const isAuthenticated = !!session?.user?.id;

  return <ImportClient isAuthenticated={isAuthenticated} />;
}
