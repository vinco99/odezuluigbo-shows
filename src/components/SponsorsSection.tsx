import Link from "next/link";
import { prisma } from "@/lib/prisma";

const TIER_ORDER = ["PLATINUM", "GOLD", "SILVER", "BRONZE", "PARTNER"] as const;

export async function SponsorsSection() {
    const sponsors = await prisma.sponsor.findMany({
        where: { active: true },
        orderBy: [{ tier: "asc" }, { sortOrder: "asc" }],
        select: { id: true, name: true, logo: true, website: true, tier: true },
    });

  // Optionally cap the homepage list so it never wraps awkwardly
  const display = sponsors.slice(0, 8);

  return (
    <section className="sponsors-section new_sponsors" id="sponsors">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Partners</span>
          <h2 className="section-title">Our Sponsors</h2>
        </div>

        {display.length === 0 ? (
          <p
            className="section-sub"
            style={{ textAlign: "center", marginBottom: 24 }}
          >
            We're still assembling our partner lineup. Interested?
          </p>
        ) : (
          <div className="sponsors__grid">
            {display.map((s) => (
              
            <a
              key={s.id}
              className="new_sponsor"
              href={s.website || "#sponsors"}
              target={s.website ? "_blank" : undefined}
              rel={s.website ? "noopener noreferrer" : undefined}
              aria-label={s.name}
            >
              <div className="sponsor__logo">
                {s.logo ? (
                  <img
                    src={s.logo}
                    alt={s.name}
                    loading="lazy"
                  />
                ) : (
                  <div className="img-placeholder sponsor-img">
                    <span className="ph-txt">{s.name}</span>
                  </div>
                )}
              </div>

              <span className="sponsor__name">{s.name}</span>
            </a>

            ))}
          </div>
        )}

        <div className="section-cta">
          <Link href="/contact" className="btn btn-outline">
            Become a Sponsor →
          </Link>
        </div>
      </div>
    </section>
  );
}