import { EventVideoPlayer } from "./EventVideoPlayer";
import type { EventVideoKind } from "@/generated/prisma/client";

type Video = {
  id: string;
  youtubeId: string;
  title: string;
  description: string | null;
  kind: EventVideoKind;
};

export function EventVideos({ videos }: { videos: Video[] }) {
  if (videos.length === 0) return null;

  const primary = videos.find((v) => v) ?? videos[0];   // assume sorted: primary first
  const rest = videos.filter((v) => v.id !== primary.id);

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Watch</span>
          <h2 className="section-title">Event Videos</h2>
        </div>

        <EventVideoPlayer primary={primary} others={rest} />
      </div>
    </section>
  );
}