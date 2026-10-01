import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BlogComments from "@/components/BlogComments";

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog = await prisma.blog.findUnique({ 
        where: { slug: id }, 
    });
    if (!blog) {
        notFound();
    }


    return (
        <main className="page active">
            <div className="page-hero">
                <div className="container">
                    <span className="section-badge">{blog.category}</span>
                    <h1>{blog.title}</h1>
                    <p>Odezuluigbo Blog Article</p>
                </div>
            </div>
            <section className="section">
                <div className="container" style={{ maxWidth: "900px" }}>
                    <Link href="/blog" className="btn btn-ghost btn-sm" style={{ marginBottom: "24px" }}>← Back to Blog</Link>
                    <article className="blog-card">
                        {blog.coverImage && 
                            <img className="b-img" src={blog.coverImage} alt={blog.title} style={{ height: "420px", objectFit: "cover", width: "100%" }} />
                        }
                        <div className="b-body" style={{ padding: "32px 32px 40px" }}>
                            <span className="b-cat">{blog.category}</span>
                            <h2 style={{fontFamily: "var(--fh)", fontSize: "2rem", lineHeight: "1.2", margin: "12px 0 18px"}}>{blog.title}</h2>

                            <div style={{
                                display: "flex", 
                                flexWrap: "wrap", gap: "12px 18px", 
                                alignItems: "center", marginBottom: "22px", 
                                paddingBottom: "18px", borderBottom: "1px solid var(--w10)", 
                                color: "var(--w70)", fontSize: ".88rem"
                            }}>
                                <span>By <strong style={{color: "var(--white)"}}>{blog.authorName}</strong></span>
                                <span>•</span>
                                <span>
                                    {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric"
                                    })}
                                </span>
                                <span>•</span>
                                <span>5 min read</span>
                            </div>
                            <div style={{display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "26px"}}>
                                <span style={{color: "var(--w70)", fontSize: ".82rem ", letterSpacing: "0.08em", textTransform: "uppercase"}}>Share:</span>
                                <button className="btn btn-ghost btn-xs" >Facebook</button>
                                <button className="btn btn-ghost btn-xs" >X</button>
                                <button className="btn btn-ghost btn-xs" >WhatsApp</button>
                                <button className="btn btn-ghost btn-xs" >Copy Link</button>
                            </div>

                            <div style={{color: "var(--w70)", fontSize: "1rem", lineHeight: "1.95", whiteSpace: "pre-line"}}>
                                {blog.content}
                            </div>
                        </div>
                    </article>

                    <BlogComments slug={blog.slug} />
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <div className="footer-bottom">
                        <p>© 2025 Odezuluigbo Global Ltd.</p>
                    </div>
                </div>
            </footer>
        </main>
    )
}
