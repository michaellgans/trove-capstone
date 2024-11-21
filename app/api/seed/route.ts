import * as seed from "@/lib/seed";

/**
 * Exposes an API endpoint `GET /api/seed`. When hit, runs the commands against the database to create tables and load data.
 */
export async function GET() {
  try {
    await seed.begin();
    await seed.seedParentTable();
    await seed.seedChildTable();
    await seed.seedTransactionTable();
    await seed.commit();

    return Response.json({ message: "Database seeded" });
  } catch (error) {
    await seed.rollback();
    return Response.json({ error }, { status: 500 });
  }
}