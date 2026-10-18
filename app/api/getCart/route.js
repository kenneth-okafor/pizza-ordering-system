import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    const client = await clientPromise;
    const db = client.db("app");

    const cartItems = await db
      .collection("cart")
      .find({ username: username })
      .toArray();

    const formattedCart = cartItems.map((item) => ({
      ...item,
      _id: item._id.toString()
    }));

    return Response.json(formattedCart);
  } catch (error) {
    return Response.json(
      {
        message: "Failed to load cart",
        error: error.message
      },
      { status: 500 }
    );
  }
}