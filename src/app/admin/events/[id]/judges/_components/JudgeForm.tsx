"use client";

import { useState, useTransition } from "react";
import ImageUploader from "@/components/ImageUploader"; // adjust path
import { saveJudge } from "../_actions";
import type { AdminJudge } from "./JudgesManager";

export function JudgeForm({
  eventId,
  judge,
  onClose,
}: {
  eventId: string;
  judge: AdminJudge | null;
  onClose: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState(judge?.image ?? "");
  const [imagePublicId, setImagePublicId] = useState(judge?.imagePublicId ?? "");
  const isEdit = !!judge;

  function submit(formData: FormData) {
    setError(null);
    formData.set("eventId", eventId);
    formData.set("image", image);
    formData.set("imagePublicId", imagePublicId);
    startTransition(async () => {
      const res = await saveJudge(formData);
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
          {isEdit ? "Edit Judge" : "Add Judge"}
        </h3>
      </div>

      {isEdit && <input type="hidden" name="id" value={judge!.id} />}

      {/* Avatar */}
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Photo</label>
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 8 }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: "50%",
              background: "var(--w10)",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--w30)",
              fontSize: ".7rem",
              flexShrink: 0,
            }}
          >
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt="Judge preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              "No photo"
            )}
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <ImageUploader
              folder="odezuluigbo/judges"
              onUpload={(url, publicId) => {
                setImage(url);
                setImagePublicId(publicId);
              }}
            />
            {image && (
              <button
                type="button"
                className="btn btn-outline btn-xs"
                onClick={() => {
                  setImage("");
                  setImagePublicId("");
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
        <input name="name" required defaultValue={judge?.name ?? ""} />
      </div>

      <div className="form-group">
        <label>Title</label>
        <input
          name="title"
          placeholder="Head Judge"
          defaultValue={judge?.title ?? ""}
        />
      </div>

      <div className="form-group">
        <label>Bio (optional)</label>
        <textarea
          name="bio"
          rows={3}
          maxLength={500}
          defaultValue={judge?.bio ?? ""}
        />
      </div>

      <div className="form-group">
        <label>Display order</label>
        <input
          name="sortOrder"
          type="number"
          defaultValue={judge?.sortOrder ?? 0}
        />
      </div>

      <label style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 12 }}>
        <input type="checkbox" name="active" defaultChecked={judge?.active ?? true} />
        <span>Show on event page</span>
      </label>

      {error && <p style={{ color: "#c94c4c", fontSize: ".85rem", marginTop: 12 }}>{error}</p>}

      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <button type="submit" className="btn btn-gold btn-sm" disabled={pending}>
          {pending ? "Saving…" : isEdit ? "Save Changes" : "Add Judge"}
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