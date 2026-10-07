

export default async function ForgottenLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="page active" id="page-forgot">
            
            <div className="auth-page">
                <div className="auth-card">
                    {children}
                </div>
            </div>

            <footer className="footer">
                <div className="container">
                    <div className="footer-bottom">
                        <p>© 2025 Odezuluigbo Global Ltd. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}