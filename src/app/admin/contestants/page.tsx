import { requireRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import ReviewButtons from "./ReviewButtons";

export default async function AdminContestantsPage() {
    await requireRole(["ADMIN"]);

    const contestants = await prisma.contestant.findMany({
        include: {
            event: true,
            user: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const pendingCount = contestants.filter(
        (contestant) =>
            contestant.applicationStatus === "PENDING"
    ).length;

    const approvedCount = contestants.filter(
        (contestant) =>
            contestant.applicationStatus === "APPROVED"
    ).length;

    return (
        <div className="admin-tab-content active">
            <section className="section">
                <div className="container">

                    {/* Header */}
                    <div className="section-header text-left">
                        <span className="section-badge">
                            Approvals
                        </span>

                        <h1 className="section-title">
                            Manage Contestants
                        </h1>

                        <p className="section-sub">
                            Review and manage contestants registered
                            for Odezuluigbo Shows events.
                        </p>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

                        <div className="bg-[var(--dark-2)] border border-white/10 rounded-[var(--radius-lg)] p-6">
                            <span className="block text-xs uppercase tracking-[.15em] text-white/30">
                                Total Contestants
                            </span>

                            <strong className="block mt-2 font-[var(--fd)] text-3xl text-[var(--gold)]">
                                {contestants.length}
                            </strong>
                        </div>

                        <div className="bg-[var(--dark-2)] border border-yellow-500/20 rounded-[var(--radius-lg)] p-6">
                            <span className="block text-xs uppercase tracking-[.15em] text-white/30">
                                Pending Review
                            </span>

                            <strong className="block mt-2 font-[var(--fd)] text-3xl text-yellow-400">
                                {pendingCount}
                            </strong>
                        </div>

                        <div className="bg-[var(--dark-2)] border border-green-500/20 rounded-[var(--radius-lg)] p-6">
                            <span className="block text-xs uppercase tracking-[.15em] text-white/30">
                                Approved
                            </span>

                            <strong className="block mt-2 font-[var(--fd)] text-3xl text-green-400">
                                {approvedCount}
                            </strong>
                        </div>

                    </div>

                    {/* Contestants */}
                    <div className="flex flex-col gap-5">

                        {contestants.length === 0 ? (
                            <div className="bg-[var(--dark-2)] border border-white/10 rounded-[var(--radius-lg)] p-12 text-center">

                                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--g10)] border border-[var(--g20)]">
                                    <span className="text-2xl text-[var(--gold)]">
                                        ✦
                                    </span>
                                </div>

                                <h2 className="font-[var(--fh)] text-xl font-bold">
                                    No contestants yet
                                </h2>

                                <p className="mt-2 text-sm text-white/50">
                                    Contestant applications will appear
                                    here.
                                </p>

                            </div>
                        ) : (
                            contestants.map((contestant) => (
                                <article
                                    key={contestant.id}
                                    className="bg-[var(--dark-2)] border border-white/10 rounded-[var(--radius-lg)] overflow-hidden transition-all duration-300 hover:border-[var(--g20)]"
                                >

                                    {/* Gold accent */}
                                    <div className="h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

                                    <div className="p-6 md:p-7">

                                        <div className="flex flex-col md:flex-row gap-6">

                                            {/* Photo */}
                                            <div className="shrink-0">
                                                {contestant.photo ? (
                                                    <img
                                                        src={contestant.photo}
                                                        alt={contestant.name}
                                                        className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-[var(--radius)] border border-white/10"
                                                    />
                                                ) : (
                                                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-[var(--radius)] bg-[var(--dark-3)] border border-white/10 flex items-center justify-center">
                                                        <span className="text-3xl text-[var(--gold)]">
                                                            ✦
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Information */}
                                            <div className="flex-1 min-w-0">

                                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                                                    <div>
                                                        <span className="block text-[.62rem] uppercase tracking-[.2em] text-[var(--gold)] mb-2">
                                                            Contestant
                                                        </span>

                                                        <h2 className="font-[var(--fh)] text-xl md:text-2xl font-bold">
                                                            {contestant.name}
                                                        </h2>
                                                    </div>

                                                    {/* Status */}
                                                    <span
                                                        className={`inline-flex items-center w-fit px-3 py-1.5 rounded-full text-[.6rem] uppercase tracking-[.15em] font-bold border ${
                                                            contestant.applicationStatus ===
                                                            "PENDING"
                                                                ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                                                                : contestant.applicationStatus ===
                                                                    "APPROVED"
                                                                  ? "bg-green-500/10 border-green-500/30 text-green-400"
                                                                  : "bg-red-500/10 border-red-500/30 text-red-400"
                                                        }`}
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-current mr-2" />

                                                        {
                                                            contestant.applicationStatus
                                                        }
                                                    </span>

                                                </div>

                                                {/* Event */}
                                                <div className="mt-5 bg-[var(--g10)] border border-[var(--g20)] rounded-[var(--radius)] p-4">

                                                    <span className="block text-[.6rem] uppercase tracking-[.2em] text-[var(--gold)]">
                                                        Event
                                                    </span>

                                                    <strong className="block mt-1 text-sm font-[var(--fh)]">
                                                        {
                                                            contestant
                                                                .event
                                                                .title
                                                        }
                                                    </strong>

                                                </div>

                                                {/* Details */}
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">

                                                    <div>
                                                        <span className="block text-[.6rem] uppercase tracking-[.15em] text-white/30">
                                                            Email
                                                        </span>

                                                        <p className="mt-1 text-sm text-white/60 break-all">
                                                            {
                                                                contestant
                                                                    .user
                                                                    .email
                                                            }
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <span className="block text-[.6rem] uppercase tracking-[.15em] text-white/30">
                                                            State
                                                        </span>

                                                        <p className="mt-1 text-sm text-white/60">
                                                            {contestant.state ||
                                                                "—"}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <span className="block text-[.6rem] uppercase tracking-[.15em] text-white/30">
                                                            Age
                                                        </span>

                                                        <p className="mt-1 text-sm text-white/60">
                                                            {contestant.age
                                                                ? `${contestant.age} years`
                                                                : "—"}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <span className="block text-[.6rem] uppercase tracking-[.15em] text-white/30">
                                                            Height
                                                        </span>

                                                        <p className="mt-1 text-sm text-white/60">
                                                            {contestant.height
                                                                ? `${contestant.height} cm`
                                                                : "—"}
                                                        </p>
                                                    </div>

                                                </div>

                                                {/* Bio */}
                                                {contestant.bio && (
                                                    <div className="mt-5">

                                                        <span className="block text-[.6rem] uppercase tracking-[.2em] text-[var(--gold)] mb-2">
                                                            Bio
                                                        </span>

                                                        <div className="bg-[var(--dark)] border border-white/5 rounded-[var(--radius)] p-4">
                                                            <p className="text-sm leading-7 text-white/60 whitespace-pre-wrap">
                                                                {
                                                                    contestant.bio
                                                                }
                                                            </p>
                                                        </div>

                                                    </div>
                                                )}

                                                {/* Review */}
                                                {contestant.applicationStatus ===
                                                    "PENDING" && (
                                                    <div className="mt-6 pt-5 border-t border-white/10">
                                                        <ReviewButtons
                                                            id={
                                                                contestant.id
                                                            }
                                                        />
                                                    </div>
                                                )}

                                            </div>
                                        </div>

                                    </div>
                                </article>
                            ))
                        )}

                    </div>

                </div>
            </section>
        </div>
    );
}