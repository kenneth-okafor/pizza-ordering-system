import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db("app");

    const orderNumber =
      "ORD-" +
      Math.floor(100000 + Math.random() * 900000);

    await db.collection("orders").insertOne({
      orderNumber,
      username: body.username,
      items: body.items,
      total: body.total,
      address: body.address,
      paymentMethod: body.paymentMethod,
      status: "Confirmed",
      date: new Date()
    });

    await db.collection("cart").deleteMany({
      username: body.username
    });

    return Response.json(
      {
        message: "Order placed successfully",
        orderNumber
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        message: "Checkout failed",
        error: error.message
      },
      { status: 500 }
    );
  }
}