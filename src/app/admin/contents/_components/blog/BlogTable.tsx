import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BlogComposer from "./BlogComposer";

export async function BlogTable() {
    const posts = await prisma.blog.findMany(
        { 
            orderBy: { createdAt: "desc" } 
        }
    );
    return (
        <div>
            <div className="section-header">
                <span className="section-badge">Blog</span>
                <h2 className="section-title">Blog Articles</h2>
                <p className="section-sub">Publish stories that appear immediately on the public blog.</p>
            </div>
            <div className="form-box" style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: "560px" }}>
                    <thead>
                        <tr style={{ borderBottom: "1px solid var(--w10)", textAlign: "left", color: "var(--gold)", fontFamily: "var(--fd)", fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase" }}>
                            <th style={{ padding: "10px" }}>Title</th>
                            <th style={{ padding: "10px" }}>Author</th>
                            <th style={{ padding: "10px" }}>Published</th>
                            <th style={{ padding: "10px" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => 
                            <tr style={{ borderBottom: "1px solid var(--w10)" }} key={post.id}>
                                <td style={{ padding: "10px" }}>{post.title}</td>
                                <td style={{ padding: "10px" }}>{post.authorName}</td>
                                <td style={{ padding: "10px" }}>{post.createdAt.toLocaleDateString()}</td>
                                <td style={{ padding: "10px" }}>
                                    <Link className="btn btn-outline btn-xs" href={`/blog/${post.slug}`}>View</Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <BlogComposer />
        </div>
    );
}
