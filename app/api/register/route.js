import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db("app");

    const users = db.collection("users");

    const existingUser = await users.findOne({
      username: body.username
    });

    if (existingUser) {
      return Response.json(
        { message: "Username already exists" },
        { status: 400 }
      );
    }

    await users.insertOne({
      firstname: body.firstname,
      secondname: body.secondname,
      username: body.username,
      pass: body.pass,
      address: body.address
    });

    return Response.json(
      { message: "Account created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        message: "Registration failed",
        error: error.message
      },
      { status: 500 }
    );
  }
}