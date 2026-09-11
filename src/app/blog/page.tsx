import Link from "next/link";
import Footer from "@/components/Footer";

const blogs = [
    {
        id: 1,
        title: "The Beauty and Power of Igbo Womanhood",
        category: "Culture",
        description: "Exploring the rich traditions and modern achievements of Igbo women...",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Igbo%20lady%20wearing%20ichafu%20and%20akwete.jpg?width=700",
    },
    {
        id: 2,
        title: "How Odezuluigbo Is Changing Igbo Entertainment",
        category: "Entertainment",
        description: "A deep dive into how our platform is revolutionizing talent discovery...",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Stage%20lights.jpg?width=700",
    },
    {
        id: 3,
        title: "Igbos Worldwide: Staying Connected to Culture",
        category: "Diaspora",
        description: "How the global Igbo diaspora is keeping the flame of culture alive...",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Nwaotam%20dance%20troupe.jpg?width=700",
    },
    {
        id: 4,
        title: "The Sacred Masquerades of Igboland",
        category: "Heritage",
        description: "Understanding the spiritual and cultural significance of the Mmanwu tradition...",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Mmanwu%20Masquerade.jpg?width=700",
    },
    {
        id: 5,
        title: "The Rich Flavours of Igbo Cuisine",
        category: "Lifestyle",
        description: "Discovering the diverse and delicious flavors that define Igbo culinary traditions...",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Igbo%20food%20prep.jpg?width=700",
    },
    {
        id: 6,
        title: "The Igbo Business Spirit: Born to Excel",
        category: "Success",
        description: "Exploring the entrepreneurial spirit and business acumen of the Igbo people...",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Igbo%20market.jpg?width=700",
    },
    {
        id: 7,
        title: "Traditional Igbo Weddings: A Celebration of Union",
        category: "Heritage",
        description: "The colors, customs, and ceremonies that make Igbo weddings truly unforgettable...",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Igbo%20wedding%20ceremony.jpg?width=700",
    },
    {
        id: 8,
        title: "The Sound of Igboland: Music That Moves the Soul",
        category: "Entertainment",
        description: "From highlife to modern Ogene, explore the evolution of Igbo music...",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Igbo%20music%20performance.jpg?width=700",
    }
]

function BlogCard({ 
    blog,
} : { blog: (typeof blogs)[number];
}) {
    return (
        <div className="blog-card">
            <img className="b-img" src={blog.image} alt={blog.title} />
            <div className="b-body">
                <span className="b-cat">{blog.category}</span>
                <h4>{blog.title}</h4>
                <p>{blog.description}</p>
                <Link className="b-link" href="#">Read More →</Link>
            </div>
        </div>
    );
}

export default function BlogPage() {
    return (
        <div className="page" id="page-blog">
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
                            <div className="blog-grid" style={{ gridTemplateColumns: "1fr 1fr", marginBottom: "32px"}}>

                                {blogs.map((blog) => (
                                    <BlogCard 
                                        key={blog.id} 
                                        blog={blog} 
                                    />
                                ))}

                            </div>
                            <button className="btn btn-ghost btn-full" id="loadMoreBtn">
                                Load More Articles →
                            </button>
                        </div>

                        <div>
                            <div className="blog-sidebar-widget">
                                <h4>Categories</h4>
                                <div className="sidebar-cats">
                                    <a>Culture <span>12</span></a>
                                    <a>Entertainment <span>8</span></a>
                                    <a>Diaspora <span>6</span></a>
                                    <a>Heritage <span>9</span></a>
                                    <a>Lifestyle <span>5</span></a>
                                    <a>Success <span>7</span></a>
                                    <a>Events <span>11</span></a>
                                </div>
                            </div>

                            <div className="blog-sidebar-widget">
                                <h4>Subscribe</h4>
                                <div className="form-group" style={{"marginBottom:10px"}}>
                                    <input type="email" placeholder="Your email" style={{"background:var(--w10);border:1px solid var(--w10);color:var(--white);padding:12px 16px;border-radius:var(--radius);font-size:.85rem;width:100%"}}/>
                                </div>
                                <button className="btn btn-gold btn-full btn-sm">
                                    Subscribe to Blog
                                </button>
                            </div>

                            <div className="blog-sidebar-widget">
                                <h4>Latest Events</h4>
                                <div style="display:flex;flex-direction:column;gap:12px">
                                    <div style="display:flex;gap:12px;align-items:flex-start">
                                        <div style="flex-shrink:0;width:52px;height:52px;background:var(--g10);border:1px solid var(--g20);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.3rem">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <p style="font-size:.83rem;font-weight:700;marginBottom:2px">AdaomaIgbonile Pageant</p>
                                            <span style="font-size:.7rem;color:var(--w70)">Nov 30, 2025 · Awka</span>
                                        </div>
                                    </div>
                                    <div style="display:flex;gap:12px;align-items:flex-start">
                                        <div style="flex-shrink:0;width:52px;height:52px;background:var(--g10);border:1px solid var(--g20);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.3rem">
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
                                            <p style="font-size:.83rem;font-weight:700;marginBottom:2px">Odenigwe Reality TV</p>
                                            <span style="font-size:.7rem;color:var(--w70)">2025 · Nationwide</span>
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
    );
}