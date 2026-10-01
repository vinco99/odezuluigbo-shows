import { requireRole } from "@/lib/permissions";
import Link from "next/link";
import { AdminTabs } from "./_components/AdminTabs";
import { Footer } from "./_components/AdminFooter";
import LogoutButton from "@/components/auth/LogoutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    await requireRole(["ADMIN"]);
    return (
        <div className="page active" id="page-admin">
            <div className="page-hero">
                <div className="container admin-hero-content">
                <div className="admin-hero-copy">
                    <span className="section-badge">Restricted Access</span>
                    <h1 style={{marginBottom: "0"}}>Admin Dashboard</h1>
                    <p>Platform-wide control centre</p>
                </div>
                <LogoutButton />
                </div>
            </div>
            <AdminTabs />
            <section className="section">
                <div className="container">{children}</div>
            </section>
            <Footer />
        </div>
    );
}