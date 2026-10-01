"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type Comment = {
    id: string;
    body: string;
    createdAt: string;
    user: {
        name: string;
        image: string | null;
    };
};

type Props = {
    slug: string;
};

export default function BlogComments({ slug }: Props) {
    const { data: session } = useSession();

    const [comments, setComments] = useState<Comment[]>([]);
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(true);
    const [posting, setPosting] = useState(false);
    const [error, setError] = useState("");

    async function loadComments() {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `/api/blogs/${slug}/comments`,
                { cache: "no-store" }
            );
            
            if (!response.ok) {
                const text = await response.text();

                let message = "Failed to load comments";

                try {
                    const data = JSON.parse(text);
                    message = data.error || message;
                } catch {
                    // return non json, html page error.
                }

                throw new Error(message);
            }

            const data = await response.json();

            setComments(data.comments ?? []);

        } catch (error) {
            console.error("Load comments error",error);
            setError(error instanceof Error ? error.message : "Unable to load comments.");

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { loadComments(); }, [slug]);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (!body.trim()) { return; }

        try {
            setPosting(true);
            setError("");

            const response = await fetch(
                `/api/blogs/${slug}/comments`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json", },
                    body: JSON.stringify({
                        body,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Failed to post comment"
                );
            }

            // Add the new comment immediately
            setComments((current) => [
                data,
                ...current,
            ]);

            setBody("");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to post comment"
            );
        } finally {
            setPosting(false);
        }
    }

    return (
        <div className="form-box" style={{ marginTop: "32px" }}>
            <h3 style={{ fontFamily: "var(--fh)", fontSize: "1.2rem", marginBottom: "18px", }}>
                Comments ({comments.length})
            </h3>

            {/* COMMENTS */}

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px", }}>
                {loading && (
                    <p style={{ color: "var(--w70)" }}>Loading comments...</p>
                )}

                {!loading && comments.length === 0 && (
                    <p style={{ color: "var(--w70)" }}>No comments yet. Be the first to comment.</p>
                )}

                {comments.map((comment) => (
                    <div key={comment.id} style={{borderBottom: "1px solid var(--w10)", paddingBottom: "14px",}}>

                        <strong style={{color: "var(--white)", fontSize: ".88rem",}}>
                            {comment.user.name}
                        </strong>

                        <span style={{color: "var(--w30)",fontSize: ".75rem",marginLeft: "8px",}}>
                            {new Date(comment.createdAt).toLocaleDateString()}
                        </span>

                        <p style={{color: "var(--w70)",fontSize: ".87rem",marginTop: "6px",whiteSpace: "pre-line",}}>
                            {comment.body}
                        </p>
                    </div>
                ))}
            </div>

            {/* ERROR */}

            {error && (
                <p style={{color: "#ff6b6b",marginBottom: "12px",}}>
                    {error}
                </p>
            )}

            {/* COMMENT FORM */}

            {session ? (
                <form onSubmit={handleSubmit}>
                    <textarea rows={3} placeholder="Add a comment..." value={body} onChange={(e) => setBody(e.target.value)}
                        maxLength={1000}
                        required
                        style={{
                            width: "100%",
                            resize: "vertical",
                            background: "var(--w10)",
                            border:
                                "1px solid var(--w10)",
                            color: "var(--white)",
                            padding: "12px 16px",
                            borderRadius:
                                "var(--radius)",
                            fontSize: ".88rem",
                            marginBottom: "12px",
                        }}
                    />

                    <button type="submit" className="btn btn-gold btn-sm" disabled={posting}>
                        {posting ? "Posting..." : "Post Comment"}
                    </button>
                </form>
            ) : (
                <p style={{ color: "var(--w70)" }}>
                    Please{" "}
                    <a href="/login" style={{ color: "var(--gold)", }}>
                        login
                    </a>{" "}
                    to leave a comment.
                </p>
            )}
        </div>
    );
}