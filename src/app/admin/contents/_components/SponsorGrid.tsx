
export function Sponsors() {
    return (
        <div>
            <div className="section-header">
                <span className="section-badge">Sponsors</span>
                <h2 className="section-title">Sponsor Logos</h2>
                <p className="section-sub">Shown on the AdaomaIgbonile Pageant page</p>
            </div>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: "14px", marginBottom: "32px"}}>
                <div className="form-box" style={{textAlign: "center", padding: "18px"}}>
                    <div style={{height: "50px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--w30)", fontSize: ".72rem", border: "1px dashed var(--g20)", borderRadius: "6px", marginBottom: "10px"}}>Sponsor 1</div>
                    <button className="btn btn-outline btn-xs" >Replace</button>
                </div>
                <div className="form-box" style={{textAlign: "center", padding: "18px"}}>
                    <div style={{height: "50px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--w30)", fontSize: ".72rem", border: "1px dashed var(--g20)", borderRadius: "6px", marginBottom: "10px"}}>Sponsor 2</div>
                    <button className="btn btn-outline btn-xs" >Replace</button>
                </div>
                <div className="form-box" style={{textAlign: "center", padding: "18px"}}>
                    <div style={{height: "50px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--w30)", fontSize: ".72rem", border: "1px dashed var(--g20)", borderRadius: "6px", marginBottom: "10px"}}>Sponsor 3</div>
                    <button className="btn btn-outline btn-xs" >Replace</button>
                </div>
                <div className="form-box" style={{textAlign: "center", padding: "18px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px"}}>
                    <span style={{color: "var(--gold)", fontSize: "1.4rem"}}>+</span>
                    <button className="btn btn-gold btn-xs" >Add Sponsor</button>
                </div>
            </div>
        </div>
    );
}