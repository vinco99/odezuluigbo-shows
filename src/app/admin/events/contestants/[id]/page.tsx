import { requireRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { ApplicationStatus } from "@/generated/prisma/enums";
import { notFound, redirect } from "next/dist/client/components/navigation";
import ReviewButtons from "./ReviewButtons";


const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

function formatDate(value: Date) {
  return dateFormatter.format(value);
}

function applicationRef(id: string) {
  return `AP-${id.slice(-4).toUpperCase()}`;
}

const formatNigerianNumber = (phone: string) => {
  // 1. Remove all non-digit characters (spaces, +, -, (), etc.)
  let cleaned = String(phone).replace(/\D/g, '');
  
  // 2. If it already starts with 234 and is the correct length (13 digits), return it
  if (cleaned.startsWith('234') && cleaned.length === 13) {
    return cleaned;
  }
  
  // 3. If it starts with 0, remove that leading 0
  if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }
  
  // 4. Add the 234 prefix
  return `234${cleaned}`;
};


export default async function ContestantReviewPage({params}:{params: Promise<{id:string}>}) {
    await requireRole(["ADMIN"], "/");

    const { id } = await params;

    const contestant = await prisma.contestant.findFirst({
        where: { id, applicationStatus: ApplicationStatus.PENDING },
        include: {
            event: true,
            payment: true,
        },
    });

    if (!contestant) {
        notFound();
    }

    if (contestant.applicationStatus !== ApplicationStatus.PENDING) {
        // Already reviewed — redirect back to the list
        redirect("/admin/events");
    }

    const {
        name,
        age,
        city,
        state,
        email,
        phone,
        institution,
        course,
        talent,
        bio,
        guardianName,
        guardianRelation,
        guardianPhone,
        event,
        applicationStatus,
        createdAt
    } = contestant;




    return (
        <main id="main" className="page active">
            <div className="page-heading">
                <div>
                <div className="eyebrow"><span className="eyebrow-line"></span> APPLICATIONS <span className="eyebrow-slash">/</span> <span className="eyebrow-current">CANDIDATE REVIEW</span></div>
                <h1>Review submission</h1>
                <p className="page-subtitle">Take a moment to get to know this contestant.</p>
                </div>
            </div>

            <section className="review-layout" aria-labelledby={name}>
                <aside className="portrait-column">
                <figure className="portrait-card">
                    <img className="portrait-image" src={name} alt={`Portrait photograph for sample contestant ${name}`} />
                    <div className="portrait-vignette" aria-hidden="true"></div>
                    <figcaption className="portrait-caption">
                    <span className="portrait-tag"><span className="portrait-tag-dot"></span> CONTESTANT PORTRAIT</span>
                    <span className="portrait-id">APPLICATION <strong>{applicationRef(contestant.id)}</strong></span>
                    </figcaption>
                    <span className="portrait-corner" aria-hidden="true"></span>
                </figure>
                <div className="submission-note">
                    <span className="note-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M12 8v4l2.5 1.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                    <span><strong>Submitted {formatDate(createdAt)}</strong><small>Application complete · ready for review</small></span>
                    <span className="complete-check" aria-label="Complete">
                    <svg viewBox="0 0 20 20" fill="none"><path d="m5 10 3.1 3.1L15 6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </span>
                </div>
                </aside>

                <div className="candidate-panel">
                <div className="candidate-header">
                    <div>
                    <div className="candidate-kicker"><span className="gold-star" aria-hidden="true">✦</span> CONTESTANT PROFILE</div>
                    <h2 id="candidate-name capitalize">{name}</h2>
                    <p className="candidate-deck">A voice ready to be heard.</p>
                    </div>
                    <span className="status-pill" id="decision-status">
                        <span className="status-dot"></span>
                            <span id={`status-badge ${applicationStatus}`}>{applicationStatus}</span>
                    </span>
                </div>

                <section className="event-applied" aria-labelledby="event-applied-label">
                    <span className="event-applied-mark" aria-hidden="true">✦</span>
                    <span className="event-applied-copy"><span id="event-applied-label">EVENT APPLIED FOR</span><strong>{event.title}</strong></span>
                </section>

                <div className="profile-rule"><span></span></div>

                <section className="details-section" aria-labelledby="personal-heading">
                    <div className="section-label"><span className="section-index">01</span><h3 id="personal-heading">Personal details</h3><span className="label-rule"></span></div>
                    <dl className="detail-grid personal-grid">
                    <div className="detail-item"><dt>Age</dt><dd>{age} <span className="detail-unit">years</span></dd></div>
                    <div className="detail-item"><dt>City / town</dt><dd>{city}</dd></div>
                    <div className="detail-item"><dt>State of origin</dt><dd>{state}</dd></div>
                    </dl>
                </section>

                <section className="details-section" aria-labelledby="contact-heading">
                    <div className="section-label"><span className="section-index">02</span><h3 id="contact-heading">Contact details</h3><span className="label-rule"></span></div>
                    <dl className="detail-grid contact-grid">
                    <div className="detail-item"><dt>Email</dt><dd><a className="contact-link" href={`mailto:${email}`}>{email}</a></dd></div>
                    <div className="detail-item"><dt>Phone</dt><dd><a className="contact-link" href={`https://wa.me/${formatNigerianNumber(phone || "")}`}>+{formatNigerianNumber(phone || "")}</a></dd></div>
                    </dl>
                </section>

                <section className="details-section" aria-labelledby="education-heading">
                    <div className="section-label"><span className="section-index">03</span><h3 id="education-heading">Education</h3><span className="label-rule"></span></div>
                    <dl className="detail-grid education-grid">
                    <div className="detail-item detail-item-wide"><dt>Institution</dt><dd>{institution}</dd></div>
                    <div className="detail-item"><dt>Course</dt><dd>{course}</dd></div>
                    </dl>
                </section>

                <section className="details-section" aria-labelledby="talent-heading">
                    <div className="section-label"><span className="section-index">04</span><h3 id="talent-heading">Talent</h3><span className="label-rule"></span></div>
                    <div className="talent-chip"><span className="mic-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none"><rect x="9" y="3" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.5"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3m-4 0h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </span><span>{talent}</span><span className="talent-spark" aria-hidden="true">✦</span></div>
                </section>

                <section className="details-section reason-section" aria-labelledby="reason-heading">
                    <div className="section-label"><span className="section-index">05</span><h3 id="reason-heading">Why I am contesting</h3><span className="label-rule"></span></div>
                    <blockquote className="reason-quote">“{bio}”</blockquote>
                </section>

                {Number(age) < 18 && guardianName && guardianRelation && guardianPhone && (
                <section className="details-section guardian-section" aria-labelledby="guardian-heading">
                    <div className="section-label"><span className="section-index">06</span><h3 id="guardian-heading">Parent / guardian</h3><span className="label-rule"></span></div>
                    <dl className="detail-grid guardian-grid">
                        <div className="detail-item"><dt>Full name</dt><dd>{guardianName}</dd></div>
                        <div className="detail-item"><dt>Relationship</dt><dd>{guardianRelation}</dd></div>
                        <div className="detail-item"><dt>Phone</dt><dd><a className="contact-link" href={`https://wa.me/${formatNigerianNumber(guardianPhone || "")}`}>+{formatNigerianNumber(guardianPhone || "")}</a></dd></div>
                    </dl>
                </section>
                )}


                <div className="review-actions">
                    <div className="action-copy"><strong>Your decision</strong><span id="action-message">Choose an outcome for this application.</span></div>
                    <div className="action-buttons">
                        <ReviewButtons id={contestant.id} />
                    </div>
                </div>
                <div className="decision-footer" id="decision-footer" aria-live="polite" aria-atomic="true"></div>
                </div>
            </section>
        </main>
    );
}