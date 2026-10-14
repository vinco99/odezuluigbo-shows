"use client";

import { useState, useTransition } from "react";
import {
  deleteGalleryImage,
  reorderGallery,
  toggleGalleryActive,
} from "../_actions";
import { GalleryForm } from "./GalleryForm";

export type AdminGalleryImage = {
  id: string;
  image: string;
  imagePublicId: string | null;
  caption: string | null;
  sortOrder: number;
  active: boolean;
};

export function GalleriesManager({
  eventId,
  images,
}: {
  eventId: string;
  images: AdminGalleryImage[];
}) {
  const [editing, setEditing] = useState<AdminGalleryImage | "new" | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [localOrder, setLocalOrder] = useState<string[]>(images.map((i) => i.id));
  const [pending, startTransition] = useTransition();

  // Build a lookup so we can render in `localOrder`
  const byId = new Map(images.map((i) => [i.id, i]));
  const ordered = localOrder.map((id) => byId.get(id)).filter(Boolean) as AdminGalleryImage[];

  function onDragStart(id: string) {
    setDragId(id);
  }

  function onDragOver(e: React.DragEvent, overId: string) {
    e.preventDefault();
    if (!dragId || dragId === overId) return;
    const next = [...localOrder];
    const from = next.indexOf(dragId);
    const to = next.indexOf(overId);
    next.splice(from, 1);
    next.splice(to, 0, dragId);
    setLocalOrder(next);
  }

  function onDragEnd() {
    setDragId(null);
    startTransition(async () => {
      const res = await reorderGallery(eventId, localOrder);
      if (!res.ok) alert(res.error);
    });
  }

  return (
    <>
      <div style={{ textAlign: "right", marginBottom: 16 }}>
        <button
          className="btn btn-gold btn-sm"
          type="button"
          onClick={() => setEditing("new")}
        >
          + Add Image
        </button>
      </div>

      {editing !== null && (
        <GalleryForm
          eventId={eventId}
          image={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
        />
      )}

      {images.length === 0 ? (
        <div className="form-box">
          <p className="section-sub" style={{ textAlign: "center", margin: 0 }}>
            No gallery images yet.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 16,
            opacity: pending ? 0.6 : 1,
          }}
        >
          {ordered.map((img) => (
            <GalleryTile
              key={img.id}
              image={img}
              eventId={eventId}
              isDragging={dragId === img.id}
              onEdit={setEditing}
              onDragStart={() => onDragStart(img.id)}
              onDragOver={(e) => onDragOver(e, img.id)}
              onDragEnd={onDragEnd}
            />
          ))}
        </div>
      )}

      <p
        style={{
          color: "var(--w30)",
          fontSize: ".78rem",
          marginTop: 16,
          textAlign: "center",
        }}
      >
        Drag images to reorder. Order is saved automatically.
      </p>
    </>
  );
}

function GalleryTile({
  image,
  eventId,
  isDragging,
  onEdit,
  onDragStart,
  onDragOver,
  onDragEnd,
}: {
  image: AdminGalleryImage;
  eventId: string;
  isDragging: boolean;
  onEdit: (i: AdminGalleryImage) => void;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragEnd: () => void;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      style={{
        background: "var(--dark-2)",
        border: "1px solid var(--w10)",
        borderRadius: "var(--radius)",
        overflow: "hidden",
        opacity: isDragging ? 0.4 : image.active ? 1 : 0.5,
        cursor: "grab",
        transition: "opacity .15s",
      }}
    >
      {/* Preview */}
      <div
        style={{
          width: "100%",
          aspectRatio: "4 / 3",
          background: "var(--w10)",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.image}
          alt={image.caption ?? "Gallery image"}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          draggable={false}
        />
      </div>

      {/* Meta + actions */}
      <div style={{ padding: 10 }}>
        <p
          style={{
            margin: "0 0 8px",
            fontSize: ".78rem",
            color: "var(--w70)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={image.caption ?? ""}
        >
          {image.caption || "No caption"}
        </p>

        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          <button
            type="button"
            className="btn btn-outline btn-xs"
            onClick={() => onEdit(image)}
            disabled={pending}
          >
            Edit
          </button>

          <button
            type="button"
            className="btn btn-outline btn-xs"
            disabled={pending}
            onClick={() =>
              startTransition(async () => {
                const res = await toggleGalleryActive(image.id, !image.active, eventId);
                if (!res.ok) alert(res.error);
              })
            }
          >
            {image.active ? "Hide" : "Show"}
          </button>

          <button
            type="button"
            className="btn btn-outline btn-xs"
            disabled={pending}
            style={{ color: "#c94c4c", borderColor: "rgba(201,76,76,.4)" }}
            onClick={() => {
              if (!confirm("Delete this image?")) return;
              startTransition(async () => {
                const res = await deleteGalleryImage(image.id, eventId);
                if (!res.ok) alert(res.error);
              });
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}