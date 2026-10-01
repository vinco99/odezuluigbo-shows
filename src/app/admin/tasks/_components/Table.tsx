

export function TaskTable () {
    return (
        <div>
            <div className="form-box" style={{overflowX: "auto", marginBottom: "32px"}}>
                <table style={{width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: "520px"}}>
                    <thead>
                        <tr style={{borderBottom: "1px solid var(--w10)", textAlign: "left", color: "var(--gold)", fontFamily: "var(--fd)", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase"}}>
                            <th style={{padding: "10px"}}>Task</th>
                            <th style={{padding: "10px"}}>Reward</th>
                            <th style={{padding: "10px"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{borderBottom: "1px solid var(--w10)"}}>
                            <td style={{padding: "10px"}}>Watch Sponsor Video</td>
                            <td style={{padding: "10px"}}>+50 votes</td>
                            <td style={{padding: "10px"}}><button className="btn btn-outline btn-xs" >Edit</button></td>
                        </tr>
                        <tr style={{borderBottom: "1px solid var(--w10)"}}>
                            <td style={{padding: "10px"}}>Share on Facebook</td>
                            <td style={{padding: "10px"}}>+30 votes</td>
                            <td style={{padding: "10px"}}><button className="btn btn-outline btn-xs" >Edit</button></td>
                        </tr>
                        <tr style={{borderBottom: "1px solid var(--w10)"}}>
                            <td style={{padding: "10px"}}>Share on WhatsApp</td>
                            <td style={{padding: "10px"}}>+30 votes</td>
                            <td style={{padding: "10px"}}><button className="btn btn-outline btn-xs" >Edit</button></td>
                        </tr>
                        <tr style={{borderBottom: "1px solid var(--w10)"}}>
                            <td style={{padding: "10px"}}>Follow Social Pages</td>
                            <td style={{padding: "10px"}}>+20 votes per page</td>
                            <td style={{padding: "10px"}}><button className="btn btn-outline btn-xs" >Edit</button></td>
                        </tr>
                        <tr style={{borderBottom: "1px solid var(--w10)"}}>
                            <td style={{padding: "10px"}}>Complete a Quiz</td>
                            <td style={{padding: "10px"}}>+40 votes</td>
                            <td style={{padding: "10px"}}><button className="btn btn-outline btn-xs" >Edit</button></td>
                        </tr>
                        <tr>
                            <td style={{padding: "10px"}}>Complete a Survey</td>
                            <td style={{padding: "10px"}}>+35 votes</td>
                            <td style={{padding: "10px"}}><button className="btn btn-outline btn-xs" >Edit</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{textAlign: "right", marginBottom: "36px"}}>
                <button className="btn btn-gold btn-sm" >+ Add New Task</button>
            </div>
        </div>
    );
}