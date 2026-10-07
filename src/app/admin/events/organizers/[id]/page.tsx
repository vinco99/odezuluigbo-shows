import { ApplicationStatus } from "@/generated/prisma/browser";
import { requireRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
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
  return `OR-${id.slice(-4).toUpperCase()}`;
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

export default async function OrganizerReviewPage({params}:{params: Promise<{id:string}>}) {
    await requireRole(["ADMIN"]);

    const { id } = await params;

    const organizer = await prisma.organizerApplication.findUnique({
        where: { id },
    });

    if (!organizer) {
      notFound();
    }

    if (organizer.status !== ApplicationStatus.PENDING) {
      // Already reviewed — redirect back to the list
      redirect("/admin/events");
    }


    const {
      businessName, 
      email, 
      phone,
      photo,
      experience,
      proposal,
      status,
      createdAt,
    } = organizer;

    return (
      <main id="main" className="page-shell">
        <div className="page-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-line">
              </span> APPLICATIONS <span className="eyebrow-slash">/</span> 
              <span className="eyebrow-current">ORGANIZER REVIEW</span>
            </div>
            <h1>Review organizer</h1>
            <p className="page-subtitle">Assess the applicant’s experience and event proposal.</p>
          </div>
        </div>

        <section className="review-layout" aria-labelledby={businessName}>
          <aside className="portrait-column">
            <figure className="portrait-card">
              <img className="portrait-image" src={photo ?? ""} alt={`Sample portrait for organizer applicant ${businessName}`}/>
              <span className="portrait-corner" aria-hidden="true"></span>
            </figure>
            <div className="submission-note">
              <span className="note-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 8v4l2.5 1.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span><strong>Submitted {formatDate(createdAt)}</strong><small>Organizer application · ready for review</small></span>
              <span className="complete-check" aria-label="Complete">
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="m5 10 3.1 3.1L15 6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </aside>

          <div className="candidate-panel">
            <div className="candidate-header">
              <div>
                <div className="candidate-kicker"><span className="gold-star" aria-hidden="true">✦</span> ORGANIZER PROFILE</div>
                <h2 id="organizer-name">{businessName}</h2>
                <p className="candidate-deck">Event lead · Application {applicationRef(organizer.id)}</p>
              </div>
              <span className={`status-badge ${status.toLocaleLowerCase()}`} id="decision-status"><span className="status-dot"></span><span id="status-label">{status}</span></span>
            </div>

            <div className="profile-rule"><span></span></div>

            <section className="details-section" aria-labelledby="contact-heading">
              <div className="section-label"><span className="section-index">01</span><h3 id="contact-heading">Contact details</h3><span className="label-rule"></span></div>
              <dl className="detail-grid contact-grid">
                <div className="detail-item"><dt>Phone</dt><dd><a className="contact-link" href={`tel:+${formatNigerianNumber(phone)}`}>{formatNigerianNumber(phone)}</a></dd></div>
                <div className="detail-item"><dt>Email</dt><dd><a className="contact-link" href={`mailto:${email}`}>{email}</a></dd></div>
              </dl>
            </section>

            <section className="details-section" aria-labelledby="experience-heading">
              <div className="section-label"><span className="section-index">02</span><h3 id="experience-heading">Experience</h3><span className="label-rule"></span></div>
              <div className="experience-card">
                <p>{experience}</p>
              </div>
            </section>

            <section className="details-section reason-section" aria-labelledby="proposal-heading">
              <div className="section-label">
                <span className="section-index">03</span>
                <h3 id="proposal-heading">Event proposal</h3>
                <span className="label-rule"></span>
              </div>
              <blockquote className="reason-quote">
                {proposal}
              </blockquote>
            </section>

            <div className="review-actions">
              <div className="action-copy">
                <strong>Your decision</strong>
                <span id="action-message">Choose an outcome for this application.</span>
              </div>
              <div className="action-buttons">
                <ReviewButtons id={organizer.id} />
              </div>
            </div>
            <div className="decision-footer" id="decision-footer" aria-live="polite" aria-atomic="true"></div>
          </div>
        </section>
      </main>
    );
}