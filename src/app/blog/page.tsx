import Link from "next/link";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { BlogCategory } from "@/generated/prisma/client";

type Counts = Partial<Record<BlogCategory, number>>;

const CATEGORIES = Object.values(BlogCategory);

const formatLabel = (c: string) =>
  c.charAt(0) + c.slice(1).toLowerCase();

export default async function BlogPage() {
    const blogs = await prisma.blog.findMany({
        orderBy: { createdAt: "desc" },
    });

    const counts = blogs.reduce<Counts>((acc, blog) => {
        const cat = blog.category as BlogCategory;
        acc[cat] = (acc[cat] ?? 0) + 1;
        return acc;
    }, {});

    return (
        <main>
            <div className="page active">
                <div className="page-hero">
                    <div className="container">
                        <span className="section-badge">Stories & Culture</span>
                        <h1>The Blog</h1>
                        <p>Culture, entertainment, talent stories, and Igbo heritage articles</p>
                    </div>
                </div>
                <section className="section">
                    <div className="container">
                        <div className="ad-banner">
                            <p>Advertisement</p>
                            <div className="ad-img-ph" data-desc="AD BANNER: 728×90 leaderboard advertisement on blog page. Replace with Google AdSense code or sponsor banner image.">[ Advertisement Banner — 728×90 ]</div>
                        </div>
                        <div className="blog-main-grid">
                            <div>
                                {blogs.length === 0 ? (
                                    <div className="form-box">
                                        <h2>No articles published yet</h2>
                                        <p className="section-sub">Check back soon for stories from Odezuluigbo.</p>
                                    </div>
                                ) : (
                                    <div className="blog-grid" style={{gridTemplateColumns: "1fr 1fr", marginBottom: "32px"}}>
                                        {blogs.map((blog) => (
                                            <article className="blog-card" key={blog.id}>
                                                {blog.coverImage ? <img className="b-img" src={blog.coverImage} alt={blog.title} /> : <div className="b-img img-placeholder" data-desc="Article cover image" />}
                                                <div className="b-body">
                                                    <span className="b-cat"><strong>{blog.category}</strong></span>
                                                    <h4>{blog.title}</h4>
                                                    <p>{blog.content.slice(0, 150)}{blog.content.length > 150 ? "..." : ""}</p>
                                                    <Link className="b-link" href={`/blog/${blog.slug}`}>Read More →</Link>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                )}
                                <button className="btn btn-ghost btn-full" id="loadMoreBtn" >Load More Articles →</button>
                            </div>

                            <div>
                                <div className="blog-sidebar-widget">
                                    <h4>Categories</h4>
                                    <div className="sidebar-cats">
                                        {CATEGORIES.map((cat) => (
                                            <Link key={cat} href={`/blog?category=${cat.toLowerCase()}`}>
                                                {cat.charAt(0) + cat.slice(1).toLowerCase()}
                                                <span>{counts[cat] ?? 0}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div className="blog-sidebar-widget">
                                    <h4>Subscribe</h4>
                                    <div className="form-group" style={{marginBottom: "10px"}}>
                                        <input type="email" placeholder="Your email" 
                                            style={{
                                                background: "var(--w10)", border: "1px solid var(--w10)", 
                                                color: "var(--white)", padding: "12px 16px", 
                                                borderRadius: "var(--radius)", fontSize: "0.85rem", 
                                                width: "100%"
                                            }}
                                        />
                                    </div>
                                    <button className="btn btn-gold btn-full btn-sm" >Subscribe to Blog</button>
                                </div>
                                <div className="blog-sidebar-widget">
                                    <h4>Latest Events</h4>
                                    <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
                                        <div style={{display: "flex", gap: "12px", alignItems: "flex-start"}}>
                                            <div style={{
                                                flexShrink: "0", width: "52px", 
                                                height: "52px", background: "var(--g10)", 
                                                border: "1px solid var(--g20)", borderRadius: "8px", 
                                                display: "flex", alignItems: "center", justifyContent: "center", 
                                                fontSize: "1.3rem"
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
                                                </svg>
                                            </div>
                                            <div>
                                                <p style={{fontSize: ".83rem", fontWeight: "700", marginBottom: "2px"}}>AdaomaIgbonile Pageant</p>
                                                <span style={{fontSize: ".7rem", color: "var(--w70)"}}>Nov 30, 2025 · Awka</span>
                                            </div>
                                        </div>
                                        <div style={{display: "flex", gap: "12px", alignItems: "flex-start"}}>
                                            <div style={{
                                                flexShrink: "0", width: "52px", 
                                                height: "52px", background: "var(--g10)", 
                                                border: "1px solid var(--g20)", borderRadius: "8px", 
                                                display: "flex", alignItems: "center", justifyContent: "center", 
                                                fontSize: "1.3rem"
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
                                                <line x1="7" y1="2" x2="7" y2="22"/>
                                                <line x1="17" y1="2" x2="17" y2="22"/>
                                                <line x1="2" y1="12" x2="22" y2="12"/>
                                                <line x1="2" y1="7" x2="7" y2="7"/>
                                                <line x1="2" y1="17" x2="7" y2="17"/>
                                                <line x1="17" y1="17" x2="22" y2="17"/>
                                                <line x1="17" y1="7" x2="22" y2="7"/>
                                                </svg>
                                            </div>
                                            <div>
                                                <p style={{fontSize: ".83rem", fontWeight: "700", marginBottom: "2px"}}>Odenigwe Reality TV</p>
                                                <span style={{fontSize: ".7rem", color: "var(--w70)"}}>2025 · Nationwide</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </main>
    );
}
