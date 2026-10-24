"use server";

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { fulfillVotePayment } from "@/lib/voting/fulfill";

export async function GET(req: Request) {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? req.url;
  const ref = new URL(req.url).searchParams.get("reference");

  if (!ref) return NextResponse.redirect(new URL("/vote/failed", base));

  const result = await fulfillVotePayment(ref);
  if (!result) {
    console.error("VOTE PAID BUT UNFULFILLED", { ref });
    return NextResponse.redirect(
      new URL(`/vote/failed?ref=${encodeURIComponent(ref)}`, base)
    );
  }

  revalidatePath("/vote");
  revalidatePath("/dashboard");
  return NextResponse.redirect(
    new URL(
      result.kind === "money_vote" ? "/vote/pageant?cast=1" : "/vote/topup?credited=1",
      base
    )
  );
}