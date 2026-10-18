import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("app");

    const products = await db
      .collection("products")
      .find({})
      .toArray();

    const formattedProducts = products.map((product) => ({
      ...product,
      _id: product._id.toString()
    }));

    return Response.json(formattedProducts);

  } catch (error) {
    return Response.json(
      {
        message: "Failed to load products",
        error: error.message
      },
      { status: 500 }
    );
  }
}