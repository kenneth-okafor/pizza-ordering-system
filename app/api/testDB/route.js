import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("app");

    await db.command({ ping: 1 });

    return Response.json({
      message: "Connected to MongoDB successfully!"
    });
  } catch (error) {
    return Response.json(
      {
        message: "Database connection failed",
        error: error.message
      },
      { status: 500 }
    );
  }
}