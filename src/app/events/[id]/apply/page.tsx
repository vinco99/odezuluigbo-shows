"use client";

import ImageUploader from "@/components/ImageUploader";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type EventInfo = {
  id: string;
  title: string;
  slug: string;
};

export default function ApplyForm() {
  const params = useParams<{ id: string }>();

  const [event, setEvent] = useState<EventInfo | null>(null);
  const [loadingEvent, setLoadingEvent] = useState(true);

  const [age, setAge] = useState("");

  const [portrait, setPortrait] = useState<string | null>(null);
  const [portraitPublicId, setPortraitPublicId] = useState<string | null>(null);

  const [fullPhoto, setFullPhoto] = useState<string | null>(null);
  const [fullPhotoPublicId, setFullPhotoPublicId] = useState<string | null>(null);

  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  // Load the event so we can use event.title and event.slug
  useEffect(() => {
    if (!params.id) return;
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`/api/events/${params.id}`);
        if (!res.ok) throw new Error("Event not found");

        const data = await res.json();
        if (!cancelled) setEvent(data.event);
        
      } catch {
        if (!cancelled) setMessage("Unable to load event details.");
      } finally {
        if (!cancelled) setLoadingEvent(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  const isMinor = age === "16" || age === "17";

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!event) return;

    setBusy(true);
    setMessage("");

    const form = new FormData(e.currentTarget);
    form.set("eventId", params.id);
    form.set("portrait", portrait ?? "");
    form.set("portraitPublicId", portraitPublicId ?? "");
    form.set("fullPhoto", fullPhoto ?? "");
    form.set("fullPhotoPublicId", fullPhotoPublicId ?? "");

    try {
      const response = await fetch("/api/contestants/apply", {
        method: "POST",
        body: form,
      });
      const data = await response.json();

      if (!response.ok || !data.authorization_url) {
        setMessage(data.error ?? "Unable to initialize payment");
        setBusy(false);
        return;
      }

      window.location.href = data.authorization_url;
    } catch {
      setMessage("Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  if (loadingEvent || !event) {
    return (
      <main className="page active">
        <section className="section">
          <div className="container">
            <p>{loadingEvent ? "Loading…" : message || "Event not found."}</p>
          </div>
        </section>
      </main>
    );
  }

  const uploadFolder = `odezuluigbo/events/${event.slug}/contestants/`;

  return (
    <main className="page active">
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">Contestant Application</span>
          <h1>Apply to Participate</h1>
          <p>Complete your profile</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="form-section">
            <div className="form-box">
              <form onSubmit={submit}>
                {/* ---------- PERSONAL DETAILS ---------- */}
                <div className="form-group">
                  <label>Full Name *</label>
                  <input name="name" required minLength={2} placeholder="Full name" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Age *</label>
                    <select
                      name="age"
                      required
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    >
                      <option value="" disabled>Select age</option>
                      {Array.from({ length: 15 }, (_, i) => 16 + i).map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Phone/WhatsApp Number *</label>
                    <input name="phone" type="tel" required placeholder="+234..." />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input name="email" type="email" required placeholder="you@example.com" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>State of Origin</label>
                    <select name="state" required defaultValue="">
                      <option value="" disabled>Select state</option>
                      <option>Anambra</option>
                      <option>Imo</option>
                      <option>Enugu</option>
                      <option>Abia</option>
                      <option>Ebonyi</option>
                      <option>Rivers</option>
                      <option>Diaspora</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Current City/Town of Residence</label>
                    <input name="city" type="text" placeholder="Awka" required />
                  </div>
                </div>

                <div className="form-group">
                  <label>School/Institution (if applicable)</label>
                  <input name="institution" type="text" placeholder="UniZik" />
                </div>

                <div className="form-group">
                  <label>Course &amp; Level (if applicable)</label>
                  <input name="course" type="text" placeholder="Igbo Language, 100 Level..." />
                </div>

                <div className="form-group">
                  <label>Occupation (if applicable)</label>
                  <input name="occupation" type="text" placeholder="Student" />
                </div>

                {/* ---------- SOCIAL MEDIA ---------- */}
                <h2><strong>SOCIAL MEDIA</strong></h2>

                <div className="form-group">
                  <label>Instagram Handle (if applicable)</label>
                  <input name="instagram" type="text" placeholder="@handle" />
                </div>
                <div className="form-group">
                  <label>Facebook Handle (if applicable)</label>
                  <input name="facebook" type="text" placeholder="Facebook handle" />
                </div>
                <div className="form-group">
                  <label>TikTok Handle (if applicable)</label>
                  <input name="tiktok" type="text" placeholder="@handle" />
                </div>

                {/* ---------- BASIC INFO ---------- */}
                <h2><strong>BASIC INFORMATION</strong></h2>

                <div className="form-group">
                  <label>What is your talent/skill?</label>
                  <input name="talent" type="text" />
                </div>

                <div className="form-group">
                  <label>Why do you want to become {event.slug}?</label>
                  <textarea
                    name="bio"
                    rows={4}
                    required
                    placeholder="Tell us about your talents and background"
                  />
                </div>

                {/* ---------- PHOTOS ---------- */}
                <h2><strong>PHOTOGRAPH UPLOAD</strong></h2>

                <div className="form-group">
                  <label>Upload a clear portrait/headshot *</label>
                  <ImageUploader
                    folder={uploadFolder}
                    onUpload={(url, publicId) => {
                      setPortrait(url);
                      setPortraitPublicId(publicId);
                    }}
                  />
                    {portrait && (
                      <img
                        src={portrait}
                        alt="Portrait preview"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                    )}
                </div>

                <div className="form-group">
                  <label>Upload a clear full-length photograph *</label>
                  <ImageUploader
                    folder={uploadFolder}
                    onUpload={(url, publicId) => {
                      setFullPhoto(url);
                      setFullPhotoPublicId(publicId);
                    }}
                  />
                    {fullPhoto && (
                      <img
                        src={fullPhoto}
                        alt="Full-length preview"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                    )}
                </div>

                {/* ---------- GUARDIAN CONSENT (only for age 16/17) ---------- */}
                {isMinor && (
                  <>
                    <h2><strong>PARENT/GUARDIAN CONSENT</strong></h2>
                    <p>
                      This section is compulsory for applicants aged 16 or 17.
                      Applicants aged 18–30 do not require parental/guardian consent.
                    </p>

                    <div className="form-group">
                      <label>Parent/Legal Guardian Full Name *</label>
                      <input name="guardianName" type="text" required placeholder="Full name" />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Relationship to Applicant *</label>
                        <select name="guardianRelation" required defaultValue="">
                          <option value="" disabled>Select relationship</option>
                          <option>Father</option>
                          <option>Mother</option>
                          <option>Brother</option>
                          <option>Sister</option>
                          <option>Uncle</option>
                          <option>Aunt</option>
                          <option>Other Guardian</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Parent/Legal Guardian Phone Number *</label>
                        <input name="guardianPhone" type="tel" required placeholder="080... or +234..." />
                      </div>
                    </div>

                    <div className="form-group">
                      <label style={{ display: "flex", gap: 8 }}>
                        <input type="checkbox" name="guardianConsent" required />
                        <span>
                          I confirm that my parent/legal guardian has given permission for me
                          to register for and participate in {event.title}.
                        </span>
                      </label>
                    </div>

                    <p className="section-sub">
                      <strong>Important:</strong> Applicants aged 16–17 who are selected to
                      proceed in the competition will be required to provide a signed consent
                      form from their parent/legal guardian before being confirmed as an
                      official contestant.
                    </p>
                  </>
                )}

                {/* ---------- DECLARATION ---------- */}
                <h2><strong>DECLARATION</strong></h2>

                <div className="form-group">
                  <label style={{ display: "flex", gap: 8 }}>
                    <input type="checkbox" name="infoCorrect" required />
                    <span>I confirm that the information provided in this registration form is correct.</span>
                  </label>
                </div>

                <div className="form-group">
                  <label style={{ display: "flex", gap: 8 }}>
                    <input type="checkbox" name="agreeTerms" required />
                    <span>I agree to the {event.title} Terms &amp; Conditions and Privacy Notice.</span>
                  </label>
                </div>

                <button className="btn btn-gold btn-full" disabled={busy}>
                  {busy ? "Preparing Payment..." : "Submit Application and Pay"}
                </button>

                {message && (
                  <p className="section-sub" role="alert">{message}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}