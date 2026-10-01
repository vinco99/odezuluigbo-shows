

export function JudgesTable () {
    return (
        <div>
            <div className="section-header">
                <span className="section-badge">Judging Panel</span>
                <h2 className="section-title">Judges</h2>
                <p className="section-sub">Currently assigned to the AdaomaIgbonile Pageant</p>
            </div>
            <div className="form-box" style={{overflowX: "auto"}}>
                <table style={{width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: "480px"}}>
                    <thead>
                        <tr style={{borderBottom: "1px solid var(--w10)", textAlign: "left", color: "var(--gold)", fontFamily: "var(--fd)", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase"}}>
                            <th style={{padding: "10px"}}>Judge</th>
                            <th style={{padding: "10px"}}>Category</th>
                            <th style={{padding: "10px"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{borderBottom: "1px solid var(--w10)"}}>
                            <td style={{padding: "10px"}}>Judge Name 1</td>
                            <td style={{padding: "10px"}}>Beauty & Culture</td>
                            <td style={{padding: "10px"}}>
                                <button className="btn btn-outline btn-xs" >Edit</button>
                            </td>
                        </tr>
                        <tr style={{borderBottom: "1px solid var(--w10)"}}>
                            <td style={{padding: "10px"}}>Judge Name 2</td>
                            <td style={{padding: "10px"}}>Cultural Intelligence</td>
                            <td style={{padding: "10px"}}>
                                <button className="btn btn-outline btn-xs" >Edit</button>
                            </td>
                        </tr>
                        <tr style={{borderBottom: "1px solid var(--w10)"}}>
                            <td style={{padding: "10px"}}>Judge Name 3</td>
                            <td style={{padding: "10px"}}>Talent & Entertainment</td>
                            <td style={{padding: "10px"}}>
                                <button className="btn btn-outline btn-xs" >Edit</button>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: "10px"}}>Judge Name 4</td>
                            <td style={{padding: "10px"}}>Fashion & Style</td>
                            <td style={{padding: "10px"}}>
                                <button className="btn btn-outline btn-xs" >Edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{textAlign: "right", marginTop: "16px"}}>
                <button className="btn btn-gold btn-sm" >+ Add Judge</button>
            </div>
        </div>
    );
}