"use client";

import ImageUploader from "@/components/ImageUploader";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ApplicationForm() {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    
    const [photo, setPhoto] = useState("");
    const [photoId, setPhotoId] = useState("");

    const [organizerId, setOrganizerId] = useState("");
    const [organizerName, setOrganizerName] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const [savingPhoto, setSavingPhoto] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const router = useRouter();

    async function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setSubmitting(true);

        try {
            const form = new FormData(event.currentTarget);
            const response = await fetch(
                "/api/organizers/apply", 
                { 
                    method: "POST", 
                    headers: { "Content-Type": "application/json" }, 
                    body: JSON.stringify(Object.fromEntries(form)) 
                }
            );
            const data = await response.json();

            if (response.status === 401) {
                window.location.href = "/login?callbackUrl=/organizer/apply";
                return;
            }

            if (!response.ok) {
                throw new Error( data.error || "Unable to submit application" );
            }

            setOrganizerId(data.application.id);
            setOrganizerName(data.application.businessName);

            setMessage("Application submitted for admin review.");

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to submit Application."
            );
        } finally {
            setSubmitting(false);
        }
    }

    async function photoUpload() {
        if (!organizerId) return;

        setSavingPhoto(true);
        setError("");
        setMessage("");

        try {
            const response = await fetch(
                `/api/organizers/apply/${organizerId}/photo`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        photo,
                        photoId,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.error || "Unable to upload Photo."
                );
            }

            setMessage( "Your Photo is now Uploaded" );

            router.push("/organizer");
            router.refresh();

        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to upload photo."
            );

        } finally {
            setSavingPhoto(false);
            setSubmitted(true);
        }

    }

    if (submitted) {
        
        return (
            <div className="form-section" style={{ textAlign: "center"}}>
                <div className="form-box">
                    <h2 className="Section-title">Application Submitted</h2>
                    <p className="section-sub">Awaiting Review</p>
                </div>
            </div>
        );
    }


    if (organizerId) {
        const organizerFolder = `odezuluigbo/organizers/${organizerName}`

        return(
            <>
                <div className="section-header">
                    <span className="section-badge">Photo Upload</span>
                    <h2 className="section-title">Add a Photo</h2>
                    <p className="section-sub">Your Application is Submitted for Review, Upload Photo</p>
                </div>
                <div className="form-section">
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
                                <ImageUploader folder={`${organizerFolder}/photo`}
                                    onUpload={(url, publicId) => {
                                        setPhoto(url);
                                        setPhotoId(publicId);
                                    }}
                                />

                                {photo && (
                                    <img
                                        src={photo}
                                        alt="Organizer photo preview"
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
                        <button
                            type="button"
                            onClick={photoUpload}
                            className="btn btn-gold btn-full"
                            disabled={savingPhoto}
                        >
                            {savingPhoto
                                ? "Uploading..."
                                : "Save Photo"}
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return(
        <>
            <div className="section-header">
                <span className="section-badge">Apply</span>
                <h2 className="section-title">Become An Organizer</h2>
                <p className="section-sub">No fee to apply — we only take a small platform commission on live events</p>
            </div>
            <div className="form-section">
                <div className="form-box">
                    <form id="organizerForm" onSubmit={submit}>
                        <div className="form-group">
                            <label>Organizer / Company Name *</label>
                            <input name="businessName" type="text" placeholder="Business or organization name" required/>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Contact Phone *</label>
                                <input name="phone" type="tel" placeholder="+234 xxx xxxx xxx" required/>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input name="email" type="email" placeholder="johndoe@example.com" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Experience</label>
                            <input name="experience" type="text" placeholder="Relevant experience" required/>
                        </div>
                        <div className="form-group">
                            <label>Proposal</label>
                            <textarea name="proposal" rows={4} required minLength={20} placeholder="Describe the events you want to run" style={{resize: "vertical"}}/>
                        </div>

                        {message && 
                            <p style={{ color: "var(--gold)", marginBottom: "20px", }}>
                                {message}
                            </p>
                        }
                        {error && (
                            <p style={{ color: "#ff6b6b", marginBottom: "20px", }}>
                                {error}
                            </p>
                        )}

                        <button 
                            className="btn btn-gold btn-full" 
                            style={{marginTop: "8px"}}
                            type="button"
                            disabled={submitting}
                        >
                            {submitting
                             ? "Submitting Application..."
                             : "Submit Application & Continue"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}