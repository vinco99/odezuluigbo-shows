'use client'

export function StreamingNow () {
    return (
        <div>
            <div className="section-header">
                <span className="section-badge">Now Streaming</span>
                <h2 className="section-title">Homepage Song Promo</h2>
                <p className="section-sub">The "Now Streaming" card on the homepage</p>
            </div>
            <div className="form-box" style={{maxWidth: "480px", marginBottom: "32px"}}>
                <div className="form-group">
                    <label>Song Title</label>
                    <input type="text" defaultValue="Muo Nso Asalu Oku" />
                </div>
                <div className="form-group">
                    <label>Artist</label>
                    <input type="text" defaultValue="Fr. Bona Umeogu" />
                </div>
                <div className="form-group">
                    <label>Streaming Link</label>
                    <input type="text" defaultValue="https://music.youtube.com/channel/UCdAQEoE6u2HqY0rHsmSsUOQ" />
                </div>
                <button className="btn btn-gold btn-sm" >Save Changes</button>
            </div>
        </div>
    );
}