import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export async function BlogPreview() {

    const blogs = await prisma.blog.findMany({
        orderBy:{createdAt: "desc"},
        take: 3,
    });
    
    return (
        <div className="container active">
            <div className="section-header">
                <span className="section-badge">Latest</span>
                <h2 className="section-title">From The Blog</h2>
                <p className="section-sub"> Stories, culture and entertainment.</p>
            </div>
            <div className="blog-grid">
                {
                    blogs.map((blog, index) =>(
                        <ScrollReveal
                            key={blog.id}
                            delay={index * 120}
                        >
                            <div className="blog-card" style={{ color: "white" }}>
                                {blog.coverImage && (
                                    <img className="b-img" 
                                        src={blog.coverImage} 
                                        alt={blog.title}
                                    />
                                )}
                                <div className="b-body">
                                <span className="b-cat"><strong>{blog.category}</strong></span>
                                <h4>{blog.title}</h4>
                                <p>{blog.content.slice(0, 80)}{blog.content.length > 80 ? "..." : ""}</p>
                                <Link href={`/blog/${blog.slug}`} className="b-link">
                                    Read More →
                                </Link>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))
                }
            </div>
        </div>
    );
}