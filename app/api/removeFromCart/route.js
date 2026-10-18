import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const client = await clientPromise;
    const db = client.db("app");

    await db.collection("cart").deleteOne({
      _id: new ObjectId(id)
    });

    return Response.json({
      message: "Item removed from cart"
    });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to remove item",
        error: error.message
      },
      { status: 500 }
    );
  }
}