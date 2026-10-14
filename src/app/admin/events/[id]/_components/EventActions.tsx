import { EventReviewButtons } from "./EventReviewButton";
import { GoLiveButton } from "./GoLiveButton";
import { SuspendEventButton } from "./SuspendEventButton";
import { UnsuspendEventButton } from "./UsuspendEvent";

type EventStatus = "PENDING" | "APPROVED" | "REJECTED" | "LIVE" | "COMPLETED" | "SUSPENDED";

export function EventActions({
  id,
  status,
}: {
  id: string;
  status: EventStatus;
}) {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {status === "PENDING" && <EventReviewButtons id={id} />}
      {status === "APPROVED" && <GoLiveButton id={id} />}
      {status === "LIVE" && <SuspendEventButton id={id} />}
      {status === "SUSPENDED" && <UnsuspendEventButton id={id} />}
      {/* COMPLETED and REJECTED show no actions */}
    </div>
  );
}