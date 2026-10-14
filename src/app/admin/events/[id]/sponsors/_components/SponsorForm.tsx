"use client";

import { useState, useTransition } from "react";
import ImageUploader from "@/components/ImageUploader";
import { saveSponsor } from "../_actions";
import type { AdminSponsor } from "./SponsorsManager";

const TIERS = ["PLATINUM", "GOLD", "SILVER", "BRONZE", "PARTNER"] as const;

export function SponsorForm({
  eventId,
  sponsor,
  onClose,
}: {
  eventId: string;
  sponsor: AdminSponsor | null;
  onClose: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [logo, setLogo] = useState(sponsor?.logo ?? "");
  const [logoPublicId, setLogoPublicId] = useState(sponsor?.logoPublicId ?? "");
  const isEdit = !!sponsor;

  function submit(formData: FormData) {
    setError(null);
    formData.set("eventId", eventId);
    formData.set("logo", logo);
    formData.set("logoPublicId", logoPublicId);
    startTransition(async () => {
      const res = await saveSponsor(formData);
      if (res.ok) onClose();
      else setError(res.error);
    });
  }

  return (
    <form
      action={submit}
      className="form-box"
      style={{ maxWidth: 560, marginBottom: 32, borderColor: "var(--gold)" }}
    >
      <div className="section-header" style={{ marginBottom: 16 }}>
        <span className="section-badge">{isEdit ? "Edit" : "New"}</span>
        <h3 className="section-title" style={{ fontSize: "1.1rem" }}>
          {isEdit ? "Edit Sponsor" : "Add Sponsor"}
        </h3>
      </div>

      {isEdit && <input type="hidden" name="id" value={sponsor!.id} />}

      {/* Logo */}
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Logo</label>
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 8 }}>
          <div
            style={{
              width: 120,
              height: 80,
              background: "var(--w10)",
              borderRadius: "var(--radius)",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--w30)",
              fontSize: ".7rem",
              flexShrink: 0,
            }}
          >
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo}
                alt="Sponsor logo preview"
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              />
            ) : (
              "No logo"
            )}
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <ImageUploader
              folder="odezuluigbo/sponsors"
              onUpload={(url, publicId) => {
                setLogo(url);
                setLogoPublicId(publicId);
              }}
            />
            {logo && (
              <button
                type="button"
                className="btn btn-outline btn-xs"
                onClick={() => {
                  setLogo("");
                  setLogoPublicId("");
                }}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Name</label>
        <input name="name" required defaultValue={sponsor?.name ?? ""} />
      </div>

      <div className="form-group">
        <label>Website (optional)</label>
        <input
          name="website"
          type="url"
          placeholder="https://..."
          defaultValue={sponsor?.website ?? ""}
        />
      </div>

      <div className="form-group">
        <label>Tier</label>
        <select name="tier" defaultValue={sponsor?.tier ?? "PARTNER"}>
          {TIERS.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0) + t.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Display order</label>
        <input
          name="sortOrder"
          type="number"
          defaultValue={sponsor?.sortOrder ?? 0}
        />
      </div>

      <label style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 12 }}>
        <input type="checkbox" name="active" defaultChecked={sponsor?.active ?? true} />
        <span>Show on event page</span>
      </label>

      {error && <p style={{ color: "#c94c4c", fontSize: ".85rem", marginTop: 12 }}>{error}</p>}

      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <button type="submit" className="btn btn-gold btn-sm" disabled={pending}>
          {pending ? "Saving…" : isEdit ? "Save Changes" : "Add Sponsor"}
        </button>
        <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: ".72rem",
  letterSpacing: ".08em",
  textTransform: "uppercase",
  color: "var(--w30)",
};