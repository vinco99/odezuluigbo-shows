import { AdPlacementsTable } from "./_components/AdPlacementsTable"
import { BlogTable } from "./_components/BlogTable";
import { StreamingNow } from "./_components/SongForm"
import { Sponsors } from "./_components/SponsorGrid"


export default function AdminContentPage () {
    return (
        <div className="admin-tab-content active" id="admin-tab-content">
            <Sponsors />

            <AdPlacementsTable />

            <StreamingNow />

            <BlogTable />    
        </div>
    );
}