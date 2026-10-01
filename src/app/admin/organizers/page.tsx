import { requireRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import ReviewButtons from "./ReviewButtons";

export default async function AdminOrganizersPage() {
    await requireRole(["ADMIN"]);

    const applications =
        await prisma.organizerApplication.findMany({
            include: {
                user: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

    const pendingCount = applications.filter(
        (application) => application.status === "PENDING"
    ).length;

    const approvedCount = applications.filter(
        (application) => application.status === "APPROVED"
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
                            Manage Organizers
                        </h1>

                        <p className="section-sub">
                            Review and manage organizer applications
                            submitted to Odezuluigbo Shows.
                        </p>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

                        <div className="bg-[#141414] border border-white/10 rounded-[var(--radius-lg)] p-6">
                            <span className="block text-xs uppercase tracking-[.15em] text-white/30">
                                Total Applications
                            </span>

                            <strong className="block mt-2 font-[var(--fd)] text-3xl text-[var(--gold)]">
                                {applications.length}
                            </strong>
                        </div>

                        <div className="bg-[#141414] border border-yellow-500/20 rounded-[var(--radius-lg)] p-6">
                            <span className="block text-xs uppercase tracking-[.15em] text-white/30">
                                Pending
                            </span>

                            <strong className="block mt-2 font-[var(--fd)] text-3xl text-yellow-400">
                                {pendingCount}
                            </strong>
                        </div>

                        <div className="bg-[#141414] border border-green-500/20 rounded-[var(--radius-lg)] p-6">
                            <span className="block text-xs uppercase tracking-[.15em] text-white/30">
                                Approved
                            </span>

                            <strong className="block mt-2 font-[var(--fd)] text-3xl text-green-400">
                                {approvedCount}
                            </strong>
                        </div>

                    </div>

                    {/* Applications */}
                    <div className="flex flex-col gap-5">

                        {applications.length === 0 ? (
                            <div className="bg-[var(--dark-2)] border border-white/10 rounded-[var(--radius-lg)] p-12 text-center">

                                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--g10)] border border-[var(--g20)]">
                                    <span className="text-2xl text-[var(--gold)]">
                                        ✦
                                    </span>
                                </div>

                                <h2 className="font-[var(--fh)] text-xl font-bold">
                                    No organizer applications
                                </h2>

                                <p className="mt-2 text-sm text-white/50">
                                    New organizer applications will appear
                                    here.
                                </p>

                            </div>
                        ) : (
                            applications.map((application) => (
                                <article
                                    key={application.id}
                                    className="bg-[var(--dark-2)] border border-white/10 rounded-[var(--radius-lg)] overflow-hidden transition-all duration-300 hover:border-[var(--g20)]"
                                >

                                    {/* Gold accent */}
                                    <div className="h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

                                    <div className="p-6 md:p-7">

                                        {/* Top */}
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

                                            <div>
                                                <span className="block text-[.62rem] uppercase tracking-[.2em] text-[var(--gold)] mb-2">
                                                    Organizer Application
                                                </span>

                                                <h2 className="font-[var(--fh)] text-xl md:text-2xl font-bold">
                                                    {application.businessName}
                                                </h2>

                                                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-white/50">
                                                    <span>
                                                        {application.user.name}
                                                    </span>

                                                    <span className="text-white/20">
                                                        •
                                                    </span>

                                                    <span>
                                                        {application.user.email}
                                                    </span>

                                                    <span className="text-white/20">
                                                        •
                                                    </span>

                                                    <span>
                                                        {application.phone}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Status */}
                                            <span
                                                className={`inline-flex items-center w-fit px-3 py-1.5 rounded-full text-[.6rem] uppercase tracking-[.15em] font-bold border ${
                                                    application.status ===
                                                    "PENDING"
                                                        ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                                                        : application.status ===
                                                            "APPROVED"
                                                          ? "bg-green-500/10 border-green-500/30 text-green-400"
                                                          : "bg-red-500/10 border-red-500/30 text-red-400"
                                                }`}
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-current mr-2" />

                                                {application.status}
                                            </span>

                                        </div>

                                        {/* Divider */}
                                        <div className="border-t border-white/10 my-6" />

                                        {/* Proposal */}
                                        <div>
                                            <span className="block text-[.62rem] uppercase tracking-[.2em] text-[var(--gold)] mb-2">
                                                Proposal
                                            </span>

                                            <div className="bg-[var(--dark)] border border-white/5 rounded-[var(--radius)] p-5">
                                                <p className="text-sm text-white/60 leading-7 whitespace-pre-wrap">
                                                    {application.proposal}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-5 border-t border-white/10">

                                            <span className="text-xs text-white/30">
                                                Submitted for administrative
                                                review
                                            </span>

                                            <ReviewButtons
                                                id={application.id}
                                                disabled={
                                                    application.status !==
                                                    "PENDING"
                                                }
                                            />

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