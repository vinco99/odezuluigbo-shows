import { redirect } from "next/navigation";

export default async function VotePage() {
  // Permanently redirects incoming user traffic to the topup endpoint
  redirect("/vote/topup");
}
