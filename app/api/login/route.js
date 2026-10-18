import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();

    console.log("Login attempt:", body.username);

    const client = await clientPromise;
    const db = client.db("app");

    const user = await db.collection("users").findOne({
      username: body.username,
      pass: body.pass
    });

    if (!user) {
      return Response.json(
        {
          message: "Invalid username or password"
        },
        { status: 401 }
      );
    }

    return Response.json({
      message: "Login successful",
      username: user.username
    });
  } catch (error) {
    console.error("LOGIN API ERROR:", error);

    return Response.json(
      {
        message: "Login failed",
        error: error.message
      },
      { status: 500 }
    );
  }
}