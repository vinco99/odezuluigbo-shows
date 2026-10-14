import type { ReactNode } from "react";

type IconName =
  | "grid"
  | "vote"
  | "wallet"
  | "ticket"
  | "history"
  | "arrowUpRight"
  | "chevronRight"
  | "clock"
  | "arrowUp"
  | "arrowDown"
  | "search"
  | "download"
  | "spark"
  | "check"
  | "calendar"
  | "activity"
  | "shield"
  | "plus"
  | "minus"
  | "sliders"
  | "close";

const paths: Record<IconName, ReactNode> = {
  grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>,
  vote: <><path d="M12 21s-7.5-4.4-7.5-10.1A4.15 4.15 0 0 1 12 8.3a4.15 4.15 0 0 1 7.5 2.6C19.5 16.6 12 21 12 21Z" /><path d="m8.9 12.1 2 2 4.4-4.5" /></>,
  wallet: <><rect x="3" y="5" width="18" height="15" rx="2.5" /><path d="M3.5 8h15.8a2 2 0 0 1 2 2v3.2h-5.1a2.3 2.3 0 0 1 0-4.6H20" /><path d="M16.2 11.1h.1" /></>,
  ticket: <><path d="M4 5.5h16a1.5 1.5 0 0 1 1.5 1.5v3a2 2 0 0 0 0 4v3a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 17v-3a2 2 0 0 0 0-4V7A1.5 1.5 0 0 1 4 5.5Z" /><path d="M13 6v2m0 3v2m0 3v2" /></>,
  history: <><path d="M3.5 12a8.5 8.5 0 1 0 2.5-6" /><path d="M3.5 4.8v5h5" /><path d="M12 7v5l3.2 2" /></>,
  arrowUpRight: <><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>,
  chevronRight: <path d="m9 18 6-6-6-6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" /></>,
  arrowUp: <><path d="M12 19V5" /><path d="m5 12 7-7 7 7" /></>,
  arrowDown: <><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
  download: <><path d="M12 3.5v11" /><path d="m7.5 10.5 4.5 4.5 4.5-4.5" /><path d="M4.5 17v3h15v-3" /></>,
  spark: <><path d="m12 3 1.55 5.05L18.6 10l-5.05 1.55L12 16.6l-1.55-5.05L5.4 10l5.05-1.95L12 3Z" /><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" /></>,
  check: <path d="m5 12.5 4.2 4L19 7" />,
  calendar: <><rect x="3.5" y="5" width="17" height="16" rx="2" /><path d="M7.5 3v4M16.5 3v4M3.5 10h17" /></>,
  activity: <><path d="M3 12h4l2.2-6 4.1 12 2.1-6H21" /></>,
  shield: <><path d="M12 22s8-3.8 8-10V5l-8-3-8 3v7c0 6.2 8 10 8 10Z" /><path d="m8.8 12.2 2.2 2.2 4.4-4.8" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  minus: <path d="M5 12h14" />,
  sliders: <><path d="M4 7h9M17 7h3M4 17h3m4 0h9" /><circle cx="15" cy="7" r="2" /><circle cx="9" cy="17" r="2" /></>,
  close: <><path d="m18 6-12 12M6 6l12 12" /></>,
};

export default function Icon({
  name,
  size = 18,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
