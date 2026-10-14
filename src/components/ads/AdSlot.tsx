import { getActiveAd } from "@/lib/ads";
import { getPlacement } from "@/lib/ad-placements";
import { AdImpressionTracker } from "./AdImpressionTracker";
import { AdLink } from "./AdLink";
import { AdsenseUnit } from "./AdsenseUnit";

export async function AdSlot({ placementKey }: { placementKey: string }) {
  const placement = getPlacement(placementKey);
  if (!placement) return null;

  const ad = await getActiveAd(placementKey);

  if (!ad) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <div
        className="ad-img-ph"
        data-desc={`AD PLACEHOLDER: ${placement.name} — ${placement.width}×${placement.height}`}
        style={{ maxWidth: placement.width, margin: "16px auto" }}
      >
        [ {placement.name} — {placement.width}×{placement.height} ]
      </div>
    );
  }

  const wrapperStyle: React.CSSProperties = {
    maxWidth: placement.width,
    margin: "16px auto",
  };

  return (
    <div data-ad-id={ad.id} data-placement={placementKey} style={wrapperStyle}>
      <AdImpressionTracker adId={ad.id} />

      {ad.type === "IMAGE" && ad.imageUrl && (
        <AdLink
          adId={ad.id}
          href={ad.linkUrl ?? "#"}
          target={ad.linkUrl ? "_blank" : undefined}
          rel={ad.linkUrl ? "noopener noreferrer sponsored" : undefined}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ad.imageUrl}
            alt={ad.title}
            width={placement.width}
            height={placement.height}
            loading="lazy"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </AdLink>
      )}

      {ad.type === "HTML" && ad.htmlCode && (
        <div dangerouslySetInnerHTML={{ __html: ad.htmlCode }} />
      )}

      {ad.type === "ADSENSE" && ad.htmlCode && <AdsenseUnit code={ad.htmlCode} />}
    </div>
  );
}