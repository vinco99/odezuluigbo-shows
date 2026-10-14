"use client";

export function ShareButton({
  contestantName,
  contestantId,
}: {
  contestantName: string;
  contestantId: string;
}) {
  async function share() {
    const url = `${window.location.origin}/vote?c=${contestantId}`;
    const payload = {
      title: `Vote for ${contestantName}`,
      text: `Support ${contestantName} on Odezuluigbo!`,
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(payload);
        return;
      } catch {
        // fall through to copy
      }
    }

    await navigator.clipboard.writeText(url);
    alert("Voting link copied to clipboard.");
  }

  return (
    <button
      type="button"
      className="btn btn-outline btn-xs share-btn"
      onClick={share}
      title={`Share ${contestantName}'s voting link`}
      aria-label="Share"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    </button>
  );
}