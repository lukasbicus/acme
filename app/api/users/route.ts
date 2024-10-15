import {db} from "@vercel/postgres";

const client = await db.connect();

async function getUsers() {
  return client.sql`SELECT * FROM users;`;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    const users = await getUsers();
    await client.sql`COMMIT`;

    return Response.json({ users: users.rows });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}