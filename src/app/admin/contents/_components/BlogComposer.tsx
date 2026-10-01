"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";

const CATEGORIES = [
    { value: "CULTURE",       label: "Culture" },
    { value: "ENTERTAINMENT", label: "Entertainment" },
    { value: "DIASPORA",      label: "Diaspora" },
    { value: "HERITAGE",      label: "Heritage" },
    { value: "LIFESTYLE",     label: "Lifestyle" },
    { value: "SUCCESS",       label: "Success" },
    { value: "EVENTS",        label: "Events" },
] as const;

export default function BlogComposer() {
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const [coverImage, setCoverImage] = useState("");
    const [coverImageId, setCoverImageId] = useState("");

    async function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget; // capture before await
        const data = Object.fromEntries(new FormData(form));

        const blogData = {
            ...data,
            coverImage,
            coverImageId,
        };

        let response: Response;
        try {
            response = await fetch("/api/blog", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(blogData),
            });
        } catch {
            setIsError(true);
            setMessage("Network error. Please try again.");
            return;
        }

        const result = await response.json().catch(() => ({} as { error?: string }));
        
        const ok = response.ok;

        setIsError(!ok);
        setMessage(
            ok ? 
            "Article published." : result.error ?? 
            "Unable to publish article."
        );

        if (ok) {
            form.reset();

            // clear upload image state
            setCoverImage("");
            setCoverImageId("");
        }
    }

    return (
        <div style={{marginTop: "50px"}}>
            <div className="section-header">
                <span className="section-badge">Blog Form</span>
                <h2 className="section-title">Create Blog Articles</h2>
                <p className="section-sub">Publish stories that appear immediately on the public blog.</p>
            </div>
            <div className="form-section" style={{ marginTop: "14px" }}>
                <div className="form-box">
                    <form onSubmit={submit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            name="title"
                            type="text"
                            required
                            minLength={3}
                            placeholder="Article title"
                        />
                    </div>

                    <div className="form-group">
                        <label>Author</label>
                        <input type="text" name="authorName" required placeholder="Author" />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" required defaultValue="">
                        <option value="" disabled>Select a category</option>
                        {CATEGORIES.map((c) => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                        </select>
                    </div>


                    <div className="form-group">
                        <label>Cover image URL</label>

                        <ImageUploader 
                            folder="odezuluigbo/blog"
                            onUpload={(url, publicId) => {
                                setCoverImage(url);
                                setCoverImageId(publicId);
                            }}
                        />

                        {/* Image Preview */}
                        {coverImage && (
                            <div style={{marginTop: "16px"}}>
                                <img 
                                    src={coverImage}
                                    alt="Blog cover preview"
                                    style={{width: "100%", maxWidth: "500px", height: "280px", objectFit: "cover", borderRadius: "12px"}}
                                />
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Article Body</label>
                        <textarea
                            name="content"
                            required
                            minLength={20}
                            placeholder="Write the article"
                            rows={15}
                        />
                    </div>

                    <button className="btn btn-gold btn-sm">Publish Article</button>

                    {message && (
                        <p className="section-sub" style={isError ? { color: "crimson" } : undefined}>
                            {message}
                        </p>
                    )}
                    </form>
                </div>
            </div>
        </div>
    );
}