import { JudgesTable } from "./_components/JudgesTable";
import { TaskTable } from "./_components/Table"

export default function AdminTasksPage () {
    return (
        <div className="admin-tab-content active" id="admin-tab-tasks">
            <div className="section-header">
                <span className="section-badge">Engagement</span>
                <h2 className="section-title">Bonus Vote Tasks</h2>
                <p className="section-sub">Configurable tasks on the Voting page's "Earn Free Votes" tab</p>
            </div>
            
            <TaskTable />

            <JudgesTable />
        </div>
    );
}