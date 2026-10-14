import { PrismaClient } from "@/generated/prisma/client";
import { randomBytes } from "crypto";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const organizer = await prisma.user.upsert({
    where: { email: "organizer@test.local" },
    update: {},
    create: {
      email: "organizer@test.local",
      name: "Test Organizer",
      role: "ORGANIZER",
    },
  });

  const event = await prisma.event.upsert({
    where: { slug: "test-show" },
    update: { status: "LIVE" },
    create: {
      title: "Test Show",
      slug: "test-show",
      description: "Local test event for the ticket flow",
      status: "LIVE",
      type: "MUSIC",
      eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 days
      venue: "Eko Hotel",
      state: "Lagos",
      country: "Nigeria",
      organizerId: organizer.id,
      ticketPackages: {
        create: [
          { name: "Regular", price: 5000, description: "General admission" },
          {
            name: "VIP",
            price: 25000,
            description: "Front row + drinks",
            perks: ["Front row", "Free drink"],
          },
          {
            name: "Table for 4",
            price: 100000,
            description: "Reserved table, seats 4",
            perks: ["Reserved seating", "Bottle service"],
            maxQuantity: 5,
          },
        ],
      },
    },
  });

  console.log("Seeded:");
  console.log("  organizer:", organizer.email);
  console.log("  event:    ", `http://localhost:3000/tickets/${event.slug}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());