import React from 'react';

export function PromoVideo() {
    return (
        <section className="section">
            <div className="section-header">
                <div className="section-badge">
                    ODEZULUIGBO PROMO VIDEO
                </div>
            </div>

            <div className="container flex justify-center items-center text-center">
                <iframe
                    width="315"
                    height="560"
                    src="https://www.youtube.com/embed/Vw7SGH99i6c"
                    title="Odezuluigbo Igbo Reality Show Short"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-xl shadow-lg border border-gray-200"
                />
            </div>
        </section>
    );
}