import Link from "next/link";

type ApplicationRow = { 
    id: string; 
    businessName: string; 
    phone: string; 
    status: string; 
    user: { 
        name: string; 
        email: string 
    } 
};
export function OrganizersTable({ applications }: { applications: ApplicationRow[] }) {

    return (
        <div className="form-box" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: "640px" }}>
                <thead>
                    <tr style={{ borderBottom: "1px solid var(--w10)", textAlign: "left", color: "var(--gold)" }}>
                        <th style={{ padding: "10px" }}>Organization</th>
                        <th style={{ padding: "10px" }}>Applicant</th>
                        <th style={{ padding: "10px" }}>Phone</th>
                        <th style={{ padding: "10px" }}>Status</th>
                        <th style={{ padding: "10px" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { applications.map((application) => 
                        <tr key={application.id} style={{ borderBottom: "1px solid var(--w10)" }}>
                            <td style={{ padding: "10px" }}>{application.businessName}</td>
                            <td style={{ padding: "10px" }}>{application.user.name || application.user.email}</td>
                            <td style={{ padding: "10px" }}>{application.phone}</td>
                            <td style={{ padding: "10px" }}>{application.status}</td>
                            <td style={{ padding: "10px" }}>
                                {application.status === "PENDING" &&
                                    <Link href={`/admin/events/organizers/${application.id}`} className="btn btn-outline btn-xs">Review Application</Link>
                                }
                            </td>
                        </tr>
                    )}
                </tbody>
                </table>
                    {applications.length === 0 && 
                        <p className="section-sub">No organizer applications found.</p>
                    }
                </div>
            );
}
