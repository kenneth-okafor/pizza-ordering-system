import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const client = await clientPromise;
    const db = client.db("app");

    const product = await db.collection("products").findOne({
      _id: new ObjectId(id)
    });

    if (!product) {
      return Response.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return Response.json({
      ...product,
      _id: product._id.toString()
    });

  } catch (error) {
    return Response.json(
      {
        message: "Failed to load product",
        error: error.message
      },
      { status: 500 }
    );
  }
}