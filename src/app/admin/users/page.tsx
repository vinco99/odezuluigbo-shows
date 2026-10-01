import { UserSearch } from "./_components/UserSearch"
import { UsersTable } from "./_components/UsersTable";

export default function AdminUsersPage () {
    return (
        <div className="admin-tab-content active" id="admin-tab-users">
            <div className="section-header">
                <span className="section-badge">Directory</span>
                <h2 className="section-title">Manage Users</h2>
                <p className="section-sub">Voters, contestants, organizers, judges and staff accounts</p>
            </div>
            <div className="form-box">
                <UserSearch />
                <UsersTable />
                <p id="adminUserNoResults" 
                    style={{
                        display: "none", 
                        color: "var(--w30)", 
                        fontSize: ".85rem", 
                        textAlign: "center", 
                        padding: "16px 0"
                    }
                }>No users match that search.</p>
            </div>
        </div>
    );
}