"use client";

import { useState, useTransition } from "react";
import { saveSong } from "../../_actions";
import type { AdminSong } from "./SongsManager";

const PLATFORMS = [
  { value: "youtube-music", label: "YouTube Music" },
  { value: "spotify", label: "Spotify" },
  { value: "apple-music", label: "Apple Music" },
  { value: "audiomack", label: "Audiomack" },
  { value: "boomplay", label: "Boomplay" },
  { value: "other", label: "Other" },
];

export function SongForm({ song, onClose,}: { song: AdminSong | null; onClose: () => void; }) {
    const [pending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const isEdit = !!song;

    function submit(formData: FormData) {
        setError(null);
        startTransition(async () => {
        const res = await saveSong(formData);
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
            {isEdit ? "Edit Song" : "Add Song"}
            </h3>
        </div>

        {isEdit && <input type="hidden" name="id" value={song!.id} />}

        <div className="form-group">
            <label>Song Title</label>
            <input name="title" required defaultValue={song?.title ?? ""} />
        </div>

        <div className="form-group">
            <label>Artist</label>
            <input name="artist" required defaultValue={song?.artist ?? ""} />
        </div>

        <div className="form-group">
            <label>Streaming Link</label>
            <input
            name="streamingUrl"
            type="url"
            required
            placeholder="https://music.youtube.com/..."
            defaultValue={song?.streamingUrl ?? ""}
            />
        </div>

        <div className="form-group">
            <label>Platform</label>
            <select name="platform" defaultValue={song?.platform ?? "youtube-music"}>
            {PLATFORMS.map((p) => (
                <option key={p.value} value={p.value}>
                {p.label}
                </option>
            ))}
            </select>
        </div>

        <div className="form-group">
            <label>Cover Image URL (optional)</label>
            <input
            name="coverImage"
            type="url"
            placeholder="https://res.cloudinary.com/..."
            defaultValue={song?.coverImage ?? ""}
            />
        </div>

        <label style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 12 }}>
            <input type="checkbox" name="active" defaultChecked={song?.active ?? true} />
            <span>Show on homepage</span>
        </label>

        {error && <p style={{ color: "#c94c4c", fontSize: ".85rem", marginTop: 12 }}>{error}</p>}

        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button type="submit" className="btn btn-gold btn-sm" disabled={pending}>
            {pending ? "Saving…" : isEdit ? "Save Changes" : "Add Song"}
            </button>
            <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
            Cancel
            </button>
        </div>
        </form>
    );
}