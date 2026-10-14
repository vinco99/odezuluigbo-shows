"use client";

import { useState, useTransition } from "react";
import ImageUploader from "@/components/ImageUploader"; // adjust path if different
import { saveAd } from "../../_actions";
import type { AdPlacement } from "@/lib/ad-placements";

export type AdType = "IMAGE" | "HTML" | "ADSENSE";

export type AdminAd = {
  id: string;
  placementKey: string;
  title: string;
  type: AdType;
  imageUrl: string | null;
  imagePublicId: string | null;
  linkUrl: string | null;
  htmlCode: string | null;
  sponsorId: string | null;
  startAt: Date | null;
  endAt: Date | null;
  active: boolean;
  sortOrder: number;
};

export function AdForm({
  placement,
  ad,
  sponsors,
  onClose,
}: {
  placement: AdPlacement;
  ad: AdminAd | null;
  /** Optional — pass the sponsor list if you want to link ads to deals. */
  sponsors?: { id: string; name: string }[];
  onClose: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const isEdit = !!ad;

  // Controlled pieces that don't map cleanly to native inputs
  const [type, setType] = useState<AdType>(ad?.type ?? "IMAGE");
  const [imageUrl, setImageUrl] = useState(ad?.imageUrl ?? "");
  const [imagePublicId, setImagePublicId] = useState(ad?.imagePublicId ?? "");
  const [htmlCode, setHtmlCode] = useState(ad?.htmlCode ?? "");

  function submit(formData: FormData) {
    setError(null);
    formData.set("placementKey", placement.key);
    formData.set("type", type);
    formData.set("imageUrl", imageUrl);
    formData.set("imagePublicId", imagePublicId);
    formData.set("htmlCode", htmlCode);

    // datetime-local → ISO (browser timezone → UTC)
    const startAt = formData.get("startAt");
    const endAt = formData.get("endAt");
    if (typeof startAt === "string" && startAt) {
      formData.set("startAt", new Date(startAt).toISOString());
    } else {
      formData.delete("startAt");
    }
    if (typeof endAt === "string" && endAt) {
      formData.set("endAt", new Date(endAt).toISOString());
    } else {
      formData.delete("endAt");
    }

    startTransition(async () => {
      const res = await saveAd(formData);
      if (res.ok) onClose();
      else setError(res.error);
    });
  }

  return (
    <form
      action={submit}
      className="form-box"
      style={{ marginBottom: 24, borderColor: "var(--gold)" }}
    >
      <div className="section-header" style={{ marginBottom: 16 }}>
        <span className="section-badge">{isEdit ? "Edit" : "New"}</span>
        <h3 className="section-title" style={{ fontSize: "1.1rem" }}>
          {isEdit ? "Edit Ad" : "Add Ad"} · {placement.name}
        </h3>
        <p className="section-sub" style={{ marginTop: 4 }}>
          {placement.width}×{placement.height}
        </p>
      </div>

      {isEdit && <input type="hidden" name="id" value={ad!.id} />}

      {/* Title */}
      <Field label="Title (internal — for your reference only)">
        <input
          name="title"
          required
          maxLength={120}
          placeholder="March Dangote Promo"
          defaultValue={ad?.title ?? ""}
          style={inputStyle}
        />
      </Field>

      {/* Type */}
      <Field label="Type">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as AdType)}
          style={inputStyle}
        >
          <option value="IMAGE">Image (banner + link)</option>
          <option value="HTML">Custom HTML</option>
          <option value="ADSENSE">AdSense code</option>
        </select>
      </Field>

      {/* ---------- IMAGE branch ---------- */}
      {type === "IMAGE" && (
        <>
          <div style={{ marginBottom: 16 }}>
            <span style={labelStyle}>Image</span>
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 8 }}>
              <div
                style={{
                  width: placement.width,
                  height: placement.height,
                  maxWidth: "100%",
                  background: "var(--w10)",
                  borderRadius: "var(--radius)",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--w30)",
                  fontSize: ".72rem",
                  flexShrink: 0,
                }}
              >
                {imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageUrl}
                    alt="Ad preview"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  `${placement.width}×${placement.height}`
                )}
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <ImageUploader
                  folder="odezuluigbo/ads"
                  onUpload={(url, publicId) => {
                    setImageUrl(url);
                    setImagePublicId(publicId);
                  }}
                />
                {imageUrl && (
                  <button
                    type="button"
                    className="btn btn-outline btn-xs"
                    onClick={() => {
                      setImageUrl("");
                      setImagePublicId("");
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          <Field label="Link URL (optional — where the ad clicks through to)">
            <input
              name="linkUrl"
              type="url"
              placeholder="https://..."
              defaultValue={ad?.linkUrl ?? ""}
              style={inputStyle}
            />
          </Field>
        </>
      )}

      {/* ---------- HTML branch ---------- */}
      {type === "HTML" && (
        <Field
          label="HTML snippet"
          hint="Raw HTML. Scripts will not run when inserted via innerHTML."
        >
          <textarea
            value={htmlCode}
            onChange={(e) => setHtmlCode(e.target.value)}
            rows={8}
            maxLength={20_000}
            placeholder={`<div style="...">...</div>`}
            style={{ ...inputStyle, fontFamily: "monospace", resize: "vertical" }}
          />
        </Field>
      )}

      {/* ---------- ADSENSE branch ---------- */}
      {type === "ADSENSE" && (
        <Field
          label="AdSense code"
          hint="Paste the full snippet including <script> tags. It will be mounted client-side so scripts run."
        >
          <textarea
            value={htmlCode}
            onChange={(e) => setHtmlCode(e.target.value)}
            rows={8}
            maxLength={20_000}
            placeholder={`<ins class="adsbygoogle" ...></ins>\n<script>...</script>`}
            style={{ ...inputStyle, fontFamily: "monospace", resize: "vertical" }}
          />
        </Field>
      )}

      {/* ---------- Schedule ---------- */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
        <Field label="Start (optional)">
          <input
            name="startAt"
            type="datetime-local"
            defaultValue={ad?.startAt ? toLocalInput(ad.startAt) : ""}
            style={inputStyle}
          />
        </Field>
        <Field label="End (optional)">
          <input
            name="endAt"
            type="datetime-local"
            defaultValue={ad?.endAt ? toLocalInput(ad.endAt) : ""}
            style={inputStyle}
          />
        </Field>
      </div>

      {/* ---------- Sponsor link (optional) ---------- */}
      {sponsors && sponsors.length > 0 && (
        <Field label="Linked sponsor (optional)">
          <select
            name="sponsorId"
            defaultValue={ad?.sponsorId ?? ""}
            style={inputStyle}
          >
            <option value="">— None —</option>
            {sponsors.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </Field>
      )}

      {/* ---------- Control ---------- */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
        <Field label="Sort order (lower = higher priority)">
          <input
            name="sortOrder"
            type="number"
            defaultValue={ad?.sortOrder ?? 0}
            style={inputStyle}
          />
        </Field>
        <label
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            alignSelf: "end",
            paddingBottom: 10,
          }}
        >
          <input type="checkbox" name="active" defaultChecked={ad?.active ?? true} />
          <span>Active</span>
        </label>
      </div>

      {error && (
        <p style={{ color: "#c94c4c", fontSize: ".85rem", marginTop: 12 }}>{error}</p>
      )}

      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <button type="submit" className="btn btn-gold btn-sm" disabled={pending}>
          {pending ? "Saving…" : isEdit ? "Save Changes" : "Add Ad"}
        </button>
        <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}

/* ---------- helpers ---------- */

function toLocalInput(d: Date | string): string {
  const date = new Date(d);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}`;
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "grid", gap: 6, marginBottom: 12 }}>
      <span style={labelStyle}>{label}</span>
      {children}
      {hint && (
        <span style={{ color: "var(--w30)", fontSize: ".72rem" }}>{hint}</span>
      )}
    </label>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: ".72rem",
  letterSpacing: ".08em",
  textTransform: "uppercase",
  color: "var(--w30)",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--w10)",
  border: "1px solid var(--w10)",
  color: "var(--white)",
  padding: "10px 12px",
  borderRadius: "var(--radius)",
  fontSize: ".85rem",
};