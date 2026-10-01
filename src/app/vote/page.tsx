import Footer from "@/components/Footer";
import Tabs from "./Tabs";

export default function VotePage() {
    
    return (
        <div className="page active" id="page-voting">
            <div className="page-hero">
                <div className="container">
                    <span className="section-badge">Cast Your Vote</span>
                    <h1>Vote Now</h1>
                    <p>Support your favourite contestant with real votes — purchase via Paystack</p>
                </div>
            </div>
            <section className="section">
                <Tabs />
            </section>

            <Footer />
        </div>
    )
}