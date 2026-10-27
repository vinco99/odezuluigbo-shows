import "./event-preview.css";

type Ticket = {
  id: string;
  name: string;
  price: number;
  description: string | null;
  perks: string[];
  maxQuantity: number | null;
  active: boolean;
};

export function TicktesPanel({
  ticketPackages,
}: {
  ticketPackages: Ticket[];
}) {
  const activeTickets = ticketPackages.filter((ticketPackages) => ticketPackages.active);

  return (
    <section className="section" style={{paddingTop: "40px"}}>
      <div className="section-header">
        <span className="section-badge">Tickets Panel</span>
        <h2 className="section-title" style={{ fontSize: "1.3rem" }}>
          Tickets
        </h2>

        {activeTickets.length > 0 && (
          <p className="section-sub" style={{ marginTop: 4 }}>
            {activeTickets.length} ticket
            {activeTickets.length === 1 ? "" : "s"} available
          </p>
        )}
      </div>

      {activeTickets.length === 0 ? (
        <div className="form-box">
          <p className="section-sub" style={{ margin: 0 }}>
            No tickets available yet.
          </p>
        </div>
      ) : (
        <div className="container">
          <div className="new-events-grid">
            {activeTickets.map((ticket) => (
              <div className="new-event-card" key={ticket.id}>
                <div className="event-card__content">
                  <h3>{ticket.name}</h3>

                  {ticket.description && (
                    <p
                      style={{
                        color: "var(--w70)",
                        fontSize: ".85rem",
                        marginBottom: 14,
                      }}
                    >
                      {ticket.description}
                    </p>
                  )}

                  <div
                    className="ev-prize"
                    style={{ marginBottom: 14 }}
                  >
                    <span>Price</span>
                    <strong>
                      ₦{ticket.price.toLocaleString("en-NG")}
                    </strong>
                  </div>

                  {ticket.perks.length > 0 && (
                    <div>
                      <p>Includes:</p>
                      <ul>
                        {ticket.perks.map((perk, index) => (
                          <li key={`${ticket.id}-${index}`}>{perk}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {ticket.maxQuantity !== null && (
                    <p>
                      Limited availability
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
