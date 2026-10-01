
export function UsersTable () {
    return (
        <div style={{overflowX: "auto"}}>
            <table style={{width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", minWidth: "680px"}}>
                <thead>
                    <tr style={{borderBottom: "1px solid var(--w10)", textAlign: "left", color: "var(--gold)", fontFamily: "var(--fd)", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase"}}>
                        <th style={{padding: "10px"}}>Name</th>
                        <th style={{padding: "10px"}}>Email</th>
                        <th style={{padding: "10px"}}>Role</th>
                        <th style={{padding: "10px"}}>Wallet</th>
                        <th style={{padding: "10px"}}>Status</th>
                        <th style={{padding: "10px"}}>Action</th>
                    </tr>
                </thead>
                <tbody id="adminUsersTable">
                    <tr className="admin-user-row" data-search="adaeze okonkwo adaeze@email.com">
                        <td style={{padding: "10px"}}>Adaeze Okonkwo</td>
                        <td style={{padding: "10px"}}>adaeze@email.com</td>
                        <td style={{padding: "10px"}}>Contestant</td>
                        <td style={{padding: "10px"}}>1,200</td>
                        <td style={{padding: "10px"}}>
                            <span className="user-status-badge" style={{background: "rgba(46,139,46,.15)", color: "#2e8b2e", padding: "4px 12px", borderRadius: "20px", fontSize: "0.72rem"}}>Active</span>
                        </td>
                        <td style={{padding: "10px"}}>
                            <button className="btn btn-outline btn-xs" >Suspend</button>
                        </td>
                    </tr>
                    <tr className="admin-user-row" data-search="chukwudi eze chukwudi@email.com">
                        <td style={{padding: "10px"}}>Chukwudi Eze</td>
                        <td style={{padding: "10px"}}>chukwudi@email.com</td>
                        <td style={{padding: "10px"}}>Voter</td>
                        <td style={{padding: "10px"}}>3,750</td>
                        <td style={{padding: "10px"}}>
                            <span className="user-status-badge" style={{background: "rgba(46,139,46,.15)", color: "#2e8b2e", padding: "4px 12px", borderRadius: "20px", fontSize: "0.72rem"}}>Active</span>
                        </td>
                        <td style={{padding: "10px"}}>
                            <button className="btn btn-outline btn-xs" >Suspend</button>
                        </td>
                    </tr>
                    <tr className="admin-user-row" data-search="sunrise events ltd organizer@sunrise.com">
                        <td style={{padding: "10px"}}>Sunrise Events Ltd</td>
                        <td style={{padding: "10px"}}>organizer@sunrise.com</td>
                        <td style={{padding: "10px"}}>Organizer</td>
                        <td style={{padding: "10px"}}>—</td>
                        <td style={{padding: "10px"}}>
                            <span className="user-status-badge" style={{background: "rgba(201,168,76,.15)", color: "var(--gold)", padding: "4px 12px", borderRadius: "20px", fontSize: "0.72rem"}}>Pending</span>
                        </td>
                        <td style={{padding: "10px"}}>
                            <button className="btn btn-outline btn-xs" >Suspend</button>
                        </td>
                    </tr>
                    <tr className="admin-user-row" data-search="ngozi umeh ngozi.judge@email.com">
                        <td style={{padding: "10px"}}>Ngozi Umeh</td>
                        <td style={{padding: "10px"}}>ngozi.judge@email.com</td>
                        <td style={{padding: "10px"}}>Judge</td>
                        <td style={{padding: "10px"}}>—</td>
                        <td style={{padding: "10px"}}>
                            <span className="user-status-badge" style={{background: "rgba(46,139,46,.15)", color: "#2e8b2e", padding: "4px 12px", borderRadius: "20px", fontSize: "0.72rem"}}>Active</span>
                        </td>
                        <td style={{padding: "10px"}}>
                            <button className="btn btn-outline btn-xs" >Suspend</button>
                        </td>
                    </tr>
                    <tr className="admin-user-row" data-search="obiora prosper obioraprosper04@gmail.com">
                        <td style={{padding: "10px"}}>Obiora Prosper</td>
                        <td style={{padding: "10px"}}>obioraprosper04@gmail.com</td>
                        <td style={{padding: "10px"}}>Staff</td>
                        <td style={{padding: "10px"}}>—</td>
                        <td style={{padding: "10px"}}>
                            <span className="user-status-badge" style={{background: "rgba(46,139,46,.15)", color: "#2e8b2e", padding: "4px 12px", borderRadius: "20px", fontSize: "0.72rem"}}>Active</span>
                        </td>
                        <td style={{padding: "10px"}}>
                            <button className="btn btn-outline btn-xs" >Suspend</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}