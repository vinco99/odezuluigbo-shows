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
    <section className="sponsors-section">
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
          <div className="sponsors-flex">
            {display.map((s) => {
              const tile = (
                <div className="sponsor-logo">
                  {s.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={s.logo}
                      alt={s.name}
                      className="sponsor-img"
                      style={{ objectFit: "contain" }}
                      loading="lazy"
                    />
                  ) : (
                    <div className="img-placeholder sponsor-img">
                      <span className="ph-txt">{s.name}</span>
                    </div>
                  )}
                </div>
              );

              return s.website ? (
                <a
                  key={s.id}
                  href={s.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  style={{ textDecoration: "none" }}
                >
                  {tile}
                </a>
              ) : (
                <div key={s.id}>{tile}</div>
              );
            })}
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