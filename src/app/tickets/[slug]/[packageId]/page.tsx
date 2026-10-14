import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TicketOrderForm } from "./TicketOrderForm";

export default async function TicketOrder({ params, }: {
  params: Promise<{ slug: string; packageId: string }>;
}) {
    const { slug, packageId } = await params;

  const pkg = await prisma.ticketPackage.findUnique({
    where: { id: packageId },
    include: { event: true },
  });

  if (!pkg || pkg.event.slug !== slug || !pkg.active) notFound();

  if (pkg.event.status !== "LIVE") {
    return (
      <div id="ticketStep3" style={{ maxWidth: 520, margin: "0 auto" }}>
        <Link href="/tickets" className="btn btn-outline btn-sm" style={{ marginBottom: 24 }}>
          ← Back to Events
        </Link>
        <div className="section-header">
          <span className="section-badge">Unavailable</span>
          <h2 className="section-title">This event is no longer on sale</h2>
        </div>
      </div>
    );
  }

  return (
    <div id="ticketStep3" style={{ maxWidth: 520, margin: "0 auto" }}>
      <Link href={`/tickets/${slug}`} className="btn btn-outline btn-sm" style={{ marginBottom: 24 }}>
        ← Back to Tickets
      </Link>
      <div className="section-header">
        <span className="section-badge">Step 3 of 3</span>
        <h2 className="section-title">Checkout</h2>
      </div>

      <TicketOrderForm
        eventName={pkg.event.title}
        packageName={pkg.name}
        price={pkg.price}
        packageId={pkg.id}
      />
    </div>
  );
}