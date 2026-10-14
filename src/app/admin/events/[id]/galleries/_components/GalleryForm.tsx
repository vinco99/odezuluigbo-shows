"use client";

import { useState, useTransition } from "react";
import ImageUploader from "@/components/ImageUploader";
import { saveGalleryImage } from "../_actions";
import type { AdminGalleryImage } from "./GalleriesManager";

export function GalleryForm({
  eventId,
  image,
  onClose,
}: {
  eventId: string;
  image: AdminGalleryImage | null;
  onClose: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState(image?.image ?? "");
  const [publicId, setPublicId] = useState(image?.imagePublicId ?? "");
  const isEdit = !!image;

  function submit(formData: FormData) {
    setError(null);
    formData.set("eventId", eventId);
    formData.set("image", url);
    formData.set("imagePublicId", publicId);
    if (!formData.has("active")) formData.set("active", "false");

    startTransition(async () => {
      const res = await saveGalleryImage(formData);
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
          {isEdit ? "Edit Image" : "Add Image"}
        </h3>
      </div>

      {isEdit && <input type="hidden" name="id" value={image!.id} />}

      {/* Preview + uploader */}
      <div style={{ marginBottom: 16 }}>
        <span style={labelStyle}>Image</span>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginTop: 8, flexWrap: "wrap" }}>
          <div
            style={{
              width: 240,
              aspectRatio: "4 / 3",
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
            {url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={url}
                alt="Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              "No image selected"
            )}
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <ImageUploader
              folder="odezuluigbo/galleries"
              onUpload={(u, p) => {
                setUrl(u);
                setPublicId(p);
              }}
            />
            {url && (
              <button
                type="button"
                className="btn btn-outline btn-xs"
                onClick={() => {
                  setUrl("");
                  setPublicId("");
                }}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      <Field label="Caption (optional)">
        <input
          name="caption"
          maxLength={200}
          placeholder="Traditional attire stage shot"
          defaultValue={image?.caption ?? ""}
          style={inputStyle}
        />
      </Field>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Sort order">
          <input
            name="sortOrder"
            type="number"
            defaultValue={image?.sortOrder ?? 0}
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
          <input
            type="checkbox"
            name="active"
            value="true"
            defaultChecked={image?.active ?? true}
          />
          <span>Visible on event page</span>
        </label>
      </div>

      {error && (
        <p style={{ color: "#c94c4c", fontSize: ".85rem", marginTop: 12 }}>{error}</p>
      )}

      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <button
          type="submit"
          className="btn btn-gold btn-sm"
          disabled={pending || !url}
        >
          {pending ? "Saving…" : isEdit ? "Save Changes" : "Add Image"}
        </button>
        <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "grid", gap: 6, marginBottom: 12 }}>
      <span style={labelStyle}>{label}</span>
      {children}
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