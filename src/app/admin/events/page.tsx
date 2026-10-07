import { requireRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import {EventsTable} from "./_components/EventsTable";
import {OrganizersTable} from "./_components/OrganizerSubmissionsTable";
import Link from "next/link";
import { ContestantTable } from "./_components/ContestantTable";


export default async function AdminEventsPage(){

    await requireRole(["ADMIN"]);

    const events = await prisma.event.findMany(
        { 
            include:{organizer:true}, 
            orderBy:{createdAt:"desc"} 
        }
    );

    const organizerApplications = await prisma.organizerApplication.findMany(
        { 
            include: { user: { select: { name: true, email: true } } }, 
            orderBy: { createdAt: "desc" } 
        }
    );

    const contestants = await prisma.contestant.findMany({
        where: { payment: { status: "PAID" } },
        include: {
            event: true,
            payment: true,
        },
        orderBy: { createdAt: "desc" },
    });


    return (
        <div className="admin-tab-content active" id="admin-tab-events">
            <div className="section-header">
                <span className="section-badge">Approvals</span>
                <h2 className="section-title">Manage Events</h2>
                <p className="section-sub">Every event currently live or in draft on the platform</p>
            </div>

            <EventsTable events={events} />

            <div style={{textAlign: "right", marginBottom: "36px"}}>
                <Link href="/organizer/events/create" className="btn btn-gold btn-sm" >+ Add New Event</Link>
            </div>


            <div className="section-header">
                <span className="section-badge">Pending</span>
                <h2 className="section-title">Organizer Submissions</h2>
                <p className="section-sub">Applications from the Organizer Portal awaiting your review</p>
            </div>

            <OrganizersTable applications={organizerApplications} />


            <div className="section-header">
                <span className="section-badge">Contestants</span>
                <h2 className="section-title">Contestants Submissions</h2>
                <p className="section-sub">Contestants who have successfully registered for the show</p>
            </div>

            <ContestantTable contestants={contestants} />

        </div>

    )
}