import Link from "next/link";
import { PaymentStatus } from  "@/generated/prisma/client";

type ContestantRow = { 
    id: string; 
    name: string | null;
    age: number | null; 
    email: string | null;
    phone: string | null; 
    applicationStatus: string; 
    event: { title: string }; 
    payment: { status: PaymentStatus | string }; 
};
export function ContestantTable({ contestants }: { contestants: ContestantRow[] }) {
    return (
        <div className="form-box" style={{ overflowX: "auto", marginBottom: "24px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: "640px" }}>
                <thead>
                    <tr style={{ borderBottom: "1px solid var(--w10)", textAlign: "left", color: "var(--gold)" }}>
                        <th style={{ padding: "10px" }}>Name</th>
                        <th style={{ padding: "10px" }}>Age</th>
                        <th style={{ padding: "10px" }}>Email</th>
                        <th style={{ padding: "10px" }}>Phone</th>
                        <th style={{ padding: "10px" }}>Event</th>
                        <th style={{ padding: "10px" }}>Payment</th>
                        <th style={{ padding: "10px" }}>Application</th>
                        <th style={{ padding: "10px" }}>Action</th>
                    </tr>
                </thead>
                <tbody>{contestants.map((contestant) => 
                    <tr key={contestant.id} style={{ borderBottom: "1px solid var(--w10)" }}>
                        <td style={{ padding: "10px" }}>{contestant.name}</td>
                        <td style={{ padding: "10px" }}>{contestant.age}</td>
                        <td style={{ padding: "10px" }}>{contestant.email}</td>
                        <td style={{ padding: "10px" }}>{contestant.phone}</td>
                        <td style={{ padding: "10px" }}>{contestant.event.title}</td>
                        <td style={{ padding: "10px" }}>{contestant.payment.status}</td>
                        <td style={{ padding: "10px" }}>{contestant.applicationStatus}</td>
                        <td style={{ padding: "10px" }}>
                            {contestant.applicationStatus === "PENDING" &&
                                <Link href={`admin/contestants/${contestant.id}`} className="btn btn-outline btn-xs">Review Application</Link>
                            }
                        </td>
                    </tr>)}
                </tbody>
            </table>
            {contestants.length === 0 && <p className="section-sub">No contestants found.</p>}
        </div>
    );
}
