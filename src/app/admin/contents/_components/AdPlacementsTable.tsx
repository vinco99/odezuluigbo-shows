

export function AdPlacementsTable () {
    return (
        <div>
            <div className="section-header">
                <span className="section-badge">Advertisements</span>
                <h2 className="section-title">Ad Placements</h2>
                <p className="section-sub">Every banner slot currently live on the site</p>
            </div>
            <div className="form-box" style={{overflowX: "auto", marginBottom: "32px"}}>
                <table style={{width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: "520px"}}>
                    <thead>
                        <tr style={{borderBottom: "1px solid var(--w10)", textAlign: "left", color: "var(--gold)", fontFamily: "var(--fd)", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase"}}>
                            <th style={{padding: "10px"}}>Placement</th>
                            <th style={{padding: "10px"}}>Type</th>
                            <th style={{padding: "10px"}}>Status</th>
                            <th style={{padding: "10px"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{borderBottom: "1px solid var(--w10)"}}>
                            <td style={{padding: "10px"}}>Homepage Banner</td>
                            <td style={{padding: "10px"}}>728×90</td>
                            <td style={{padding: "10px"}}>
                                <span style={{background: "var(--g10)", color: "var(--gold)", padding: "4px 12px", borderRadius: "20px", fontSize:".72rem"}}>Placeholder</span>
                            </td>
                            <td style={{padding: "10px"}}>
                                <button className="btn btn-outline btn-xs" >Preview</button>
                            </td>
                        </tr>
                        <tr style={{borderBottom: "1px solid var(--w10)"}}>
                            <td style={{padding: "10px"}}>Blog Page Banner</td>
                            <td style={{padding: "10px"}}>728×90</td>
                            <td style={{padding: "10px"}}>
                                <span style={{background: "var(--g10)", color: "var(--gold)", padding: "4px 12px", borderRadius: "20px", fontSize:".72rem"}}>Placeholder</span>
                            </td>
                            <td style={{padding: "10px"}}>
                                <button className="btn btn-outline btn-xs" >Preview</button>
                            </td>
                        </tr>
                        <tr style={{borderBottom: "1px solid var(--w10)"}}>
                            <td style={{padding: "10px"}}>Voting Page Banner</td>
                            <td style={{padding: "10px"}}>728×90</td>
                            <td style={{padding: "10px"}}>
                                <span style={{background: "var(--g10)", color: "var(--gold)", padding: "4px 12px", borderRadius: "20px", fontSize:".72rem"}}>Placeholder</span>
                            </td>
                            <td style={{padding: "10px"}}>
                                <button className="btn btn-outline btn-xs" >Preview</button>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: "10px"}}>Sitewide Popup Ad</td>
                            <td style={{padding: "10px"}}>400×280</td>
                            <td style={{padding: "10px"}}>
                                <span style={{background: "rgba(46,139,46,.15)", color: "#2e8b2e", padding: "4px 12px", borderRadius: "20px", fontSize: "0.72rem"}}>Live</span>
                            </td>
                            <td style={{padding: "10px"}}>
                                <button className="btn btn-outline btn-xs" >Edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}