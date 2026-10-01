"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import { useRouter } from "next/navigation";

export default function CreateEventForm() {
    const [eventId, setEventId] = useState("");
    const [eventSlug, setEventSlug] = useState("");

    const [logo, setLogo] = useState("");
    const [logoPublicId, setLogoPublicId] = useState("");

    const [banner, setBanner] = useState("");
    const [bannerPublicId, setBannerPublicId] = useState("");

    const [creating, setCreating] = useState(false);
    const [savingBranding, setSavingBranding] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    async function createEvent( event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setCreating(true);
        setError("");
        setMessage("");

        const form = event.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/api/events/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error( result.error || "Unable to create event." );
            }

            setEventId(result.event.id);
            setEventSlug(result.event.slug);

            setMessage( "Event created successfully. You can now upload your event branding." );

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to create event."
            );

        } finally {
            setCreating(false);
        }
    }

    async function saveBranding() {
        if (!eventId) return;

        setSavingBranding(true);
        setError("");
        setMessage("");

        try {
            const response = await fetch(
                `/api/events/${eventId}/branding`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        logo,
                        logoPublicId,
                        banner,
                        bannerPublicId,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.error || "Unable to save branding."
                );
            }

            setMessage( "Event branding saved successfully. Your event is now ready for admin review." );

            router.push("/organizer/events");
            router.refresh();

        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to save branding."
            );

        } finally {
            setSavingBranding(false);
        }
    }

    /*
     * ----------------------------------------
     * STEP 2: BRANDING
     * ----------------------------------------
     */

    if (eventId) {
        const eventFolder =
            `odezuluigbo/events/${eventSlug}`;

        return (
            <div className="page active" style={{ paddingTop: "90px"}}>
                <div className="form-section">
                    

                    <div className="section-header">
                        <span className="section-badge">Event Branding</span>

                        <h2 className="section-title">Add Event Images</h2>

                        <p className="section-sub">
                            Your event has been created.
                            Add your logo and banner.
                        </p>
                    </div>
                    <div className="form-box">

                        {message && (
                            <p style={{ color: "var(--gold)", marginBottom: "20px", }}>
                                {message}
                            </p>
                        )}

                        {error && (
                            <p style={{ color: "#ff6b6b", marginBottom: "20px", }}>
                                {error}
                            </p>
                        )}

                        {/* EVENT LOGO */}

                        <div className="form-group">
                            <label><strong>Event Logo</strong></label>

                            <div
                                className="img-placeholder"
                                style={{
                                    minHeight: "130px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    gap: "12px",
                                }}
                            >
                                <ImageUploader
                                    folder={`${eventFolder}/branding`}
                                    onUpload={(url, publicId) => {
                                        setLogo(url);
                                        setLogoPublicId(publicId);
                                    }}
                                />

                                {logo && (
                                    <img
                                        src={logo}
                                        alt="Event logo preview"
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                            objectFit: "contain",
                                            borderRadius: "12px",
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        {/* EVENT BANNER */}

                        <div className="form-group">
                            <label><strong>Event Banner</strong></label>

                            <div
                                className="img-placeholder"
                                style={{
                                    minHeight: "160px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    gap: "12px",
                                }}
                            >
                                <ImageUploader
                                    folder={`${eventFolder}/branding`}
                                    onUpload={(url, publicId) => {
                                        setBanner(url);
                                        setBannerPublicId(publicId);
                                    }}
                                />

                                {banner && (
                                    <img
                                        src={banner}
                                        alt="Event banner preview"
                                        style={{
                                            width: "100%",
                                            maxWidth: "700px",
                                            height: "220px",
                                            objectFit: "cover",
                                            borderRadius: "12px",
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={saveBranding}
                            className="btn btn-gold btn-full"
                            disabled={savingBranding}
                        >
                            {savingBranding
                                ? "Saving..."
                                : "Save Event Branding"}
                        </button>

                    </div>
                </div>
            </div>
        );
    }

    /*
     * ----------------------------------------
     * STEP 1: CREATE EVENT
     * ----------------------------------------
     */

    return (
        <main className="page active" style={{ paddingTop: "90px"}}>
            <div className="form-section">

                <div className="section-header">
                    <span className="section-badge">Create Event</span>

                    <h2 className="section-title">Create a New Event</h2>

                    <p className="section-sub">
                        Enter the event details first.
                        You can upload your branding after creation.
                    </p>
                </div>
                <div className="form-box">
                    
                    <form onSubmit={createEvent}>

                        <div className="form-group">
                            <label><strong>Proposed Event Name *</strong></label>

                            <input
                                name="title"
                                type="text"
                                placeholder="e.g. Igbo Comedy Showdown"
                                required
                            />
                        </div>

                        <div className="form-row">

                            <div className="form-group">
                                <label><strong>Event Category *</strong></label>

                                <select name="type" defaultValue="PAGEANT" required>
                                    <option value="PAGEANT">Pageant</option>
                                    <option value="REALITY_SHOW">Reality show</option>
                                    <option value="TALENT_SHOW">Talent show</option>
                                    <option value="CULTURAL_FESTIVAL">Cultural festival</option>
                                    <option value="MUSIC">Music</option>
                                    <option value="COMEDY">Comedy</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label><strong>Country</strong></label>

                                <select name="country" defaultValue="Nigeria">
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="U.S.A">U.S.A</option>
                                    <option value="UK">UK</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Australia">Australia</option>
                                    <option value="South Africa">South Africa</option>
                                </select>
                            </div>

                        </div>

                        <div className="form-row">

                            <div className="form-group">
                                <label><strong>State</strong></label>

                                <select name="state" defaultValue="Anambra">
                                    <option value="Anambra">Anambra</option>
                                    <option value="Enugu">Enugu</option>
                                    <option value="Imo">Imo</option>
                                    <option value="Abia">Abia</option>
                                    <option value="Ebonyi">Ebonyi</option>
                                    <option value="Delta">Delta</option>
                                    <option value="Rivers">Rivers</option>
                                    <option value="Lagos">Lagos</option>
                                    <option value="Abuja">Abuja</option>
                                    <option value="Edo">Edo</option>
                                </select>
                            </div>

                        </div>

                        <div className="form-group">
                            <label><strong>Venue</strong></label>
                            <input name="venue" type="text"/>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label><strong>Event Date *</strong></label>
                                <input name="eventDate" type="datetime-local" required/>
                            </div>

                            <div className="form-group">
                                <label><strong>Registration Beginning Date</strong></label>
                                <input name="registrationStart" type="datetime-local"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label><strong>Registration Ends</strong></label>
                            <input name="registrationEnd" type="datetime-local"/>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label><strong>Proposed Registration Fee (₦)</strong></label>

                                <input
                                    name="registrationFee"
                                    type="number"
                                    min="0"
                                    placeholder="e.g. 10000"
                                />
                            </div>

                            <div className="form-group">
                                <label><strong>Voting Fee (₦)</strong></label>

                                <input
                                    name="votingFee"
                                    type="number"
                                    min="0"
                                    placeholder="e.g. 1000"
                                />
                            </div>

                        </div>

                        <div className="form-group">
                            <label><strong>Event Description *</strong></label>

                            <textarea
                                name="description"
                                rows={4}
                                placeholder="Tell us about your event, its purpose and target audience..."
                                required
                                style={{
                                    resize: "vertical",
                                }}
                            />
                        </div>

                        {error && (
                            <p style={{ color: "#ff6b6b", marginBottom: "20px", }}>
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="btn btn-gold btn-full"
                            disabled={creating}
                            style={{
                                marginTop: "8px",
                            }}
                        >
                            {creating
                                ? "Creating Event..."
                                : "Create Event & Continue"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}