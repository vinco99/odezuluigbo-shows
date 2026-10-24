
import { AdSlot } from "@/components/ads/AdSlot";
import { VoteNavigation } from "./_components/VoteNavigation";
import Footer from "@/components/Homefooter";

export default function VoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page active" id="page-voting">
        <div className="page-hero">
            <div className="container">
                <span className="section-badge">Cast Your Vote</span>
                <h1>Vote Now</h1>
                <p>Support your favourite contestants</p>
            </div>
        </div>
        <div className="container"style={{paddingBottom: "50px"}}>
            <div className="container" style={{ margin: "32px auto" }}>
                <AdSlot placementKey="vote-banner" />
            </div>
            <VoteNavigation />
            {children}
        </div>
        <Footer />
    </div>
  );
}
