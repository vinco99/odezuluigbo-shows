"use client";

import { useState, useTransition } from "react";
import { deleteSong, toggleSongActive } from "../../_actions";
import { SongForm } from "./SongForm";

export type AdminSong = {
  id: string;
  title: string;
  artist: string;
  streamingUrl: string;
  platform: string;
  coverImage: string | null;
  active: boolean;
  sortOrder: number;
  createdAt: Date;
};

export function SongsManager({ songs }: { songs: AdminSong[] }) {
  const [editing, setEditing] = useState<AdminSong | "new" | null>(null);

  return (
    <>
      <div style={{ textAlign: "right", marginBottom: 16 }}>
        <button className="btn btn-gold btn-sm" onClick={() => setEditing("new")} type="button">
          + Add Song
        </button>
      </div>

      {editing !== null && (
        <SongForm song={editing === "new" ? null : editing} onClose={() => setEditing(null)} />
      )}

      <div className="form-box" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem" }}>
          <thead>
            <tr style={th}>
              <th style={thCell}>Title</th>
              <th style={thCell}>Artist</th>
              <th style={thCell}>Platform</th>
              <th style={thCell}>Status</th>
              <th style={thCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((s) => (
              <Row key={s.id} song={s} onEdit={setEditing} />
            ))}
            {songs.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: 20, textAlign: "center", color: "var(--w30)" }}>
                  No songs yet. Add the first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p style={{ color: "var(--w30)", fontSize: ".78rem", marginTop: 12 }}>
        The homepage shows the <strong>two most recent</strong> active songs.
      </p>
    </>
  );
}

function Row({ song, onEdit }: { song: AdminSong; onEdit: (s: AdminSong) => void }) {
  const [pending, startTransition] = useTransition();

  return (
    <tr style={{ borderBottom: "1px solid var(--w10)" }}>
      <td style={td}>{song.title}</td>
      <td style={td}>{song.artist}</td>
      <td style={td}>{song.platform.replaceAll("-", " ")}</td>
      <td style={td}>
        <span
          style={{
            background: song.active ? "rgba(46,139,46,.15)" : "var(--w10)",
            color: song.active ? "#2e8b2e" : "var(--w30)",
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: ".72rem",
          }}
        >
          {song.active ? "Active" : "Hidden"}
        </span>
      </td>
      <td style={{ ...td, display: "flex", gap: 6 }}>
        <button className="btn btn-outline btn-xs" type="button" onClick={() => onEdit(song)}>
          Edit
        </button>
        <button
          className="btn btn-outline btn-xs"
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(() => toggleSongActive(song.id, !song.active).then(() => {}))
          }
        >
          {song.active ? "Hide" : "Show"}
        </button>
        <button
          className="btn btn-outline btn-xs"
          type="button"
          disabled={pending}
          onClick={() => {
            if (!confirm(`Delete "${song.title}"?`)) return;
            startTransition(() => deleteSong(song.id).then(() => {}));
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

const th: React.CSSProperties = {
  borderBottom: "1px solid var(--w10)",
  textAlign: "left",
  color: "var(--gold)",
  fontFamily: "var(--fd)",
  fontSize: ".72rem",
  letterSpacing: ".1em",
  textTransform: "uppercase",
};
const thCell: React.CSSProperties = { padding: 10 };
const td: React.CSSProperties = { padding: 10 };