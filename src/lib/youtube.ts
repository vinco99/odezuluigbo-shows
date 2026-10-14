
export function parseYouTubeId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();

  // Bare video ID: 11 chars of base64-url-safe
  if (/^[A-Za-z0-9_-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, "");

    // youtu.be/VIDEO_ID
    if (host === "youtu.be") {
      const id = url.pathname.slice(1);
      return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
    }

    // youtube.com (any subdomain)
    if (host === "youtube.com" || host.endsWith(".youtube.com")) {
      // watch?v=VIDEO_ID
      const v = url.searchParams.get("v");
      if (v && /^[A-Za-z0-9_-]{11}$/.test(v)) return v;

      // /live/VIDEO_ID, /embed/VIDEO_ID, /v/VIDEO_ID, /shorts/VIDEO_ID
      const match = url.pathname.match(
        /^\/(?:live|embed|v|shorts)\/([A-Za-z0-9_-]{11})/,
      );
      if (match) return match[1];
    }
  } catch {
    return null;
  }

  return null;
}

/** Builds a privacy-friendly embed URL from a video ID. */
export function youTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
}

/** Builds a thumbnail URL (used in the admin preview). */
export function youTubeThumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}