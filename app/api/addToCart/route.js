import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db("app");

    await db.collection("cart").insertOne({
      username: body.username,
      productId: body.productId,
      item: body.item,
      cost: body.cost,
      size: body.size,
      toppings: body.toppings
    });

    return Response.json(
      { message: "Product added to cart" },
      { status: 201 }
    );

  } catch (error) {
    return Response.json(
      {
        message: "Failed to add product to cart",
        error: error.message
      },
      { status: 500 }
    );
  }
}