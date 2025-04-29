import { getCustomSession } from "../sessionCode.js";
import { MongoClient, ObjectId } from "mongodb";

export async function DELETE(req) {
  console.log("In the removeWishlistItem API");

  try {
    // Parse itemId from query parameters
    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get("itemId");
    if (!itemId) {
      return new Response(JSON.stringify({ error: "Missing itemId parameter" }), { status: 400 });
    }

    // Get user session
    const session = await getCustomSession();
    if (!session || !session.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const userEmail = session.email;

    // Connect to MongoDB
    const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(url);
    const dbName = "greenerme";
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    // Delete wishlist item from wishlist collection
    const wishlistCollection = db.collection("wishlist");
    const deleteResult = await wishlistCollection.deleteOne({ _id: new ObjectId(itemId) });

    if (deleteResult.deletedCount !== 1) {
      await client.close();
      return new Response(JSON.stringify({ error: "Wishlist item not found" }), { status: 404 });
    }

    // Remove wishlist item from user's wishlist array
    const usersCollection = db.collection("users");
    const updateResult = await usersCollection.updateOne(
      { email: userEmail },
      { $pull: { wishlist: { _id: new ObjectId(itemId) } } }
    );

    await client.close();

    if (updateResult.modifiedCount === 0) {
      return new Response(JSON.stringify({ warning: "Wishlist item removed from wishlist collection but not found in user's wishlist array" }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: "Wishlist item removed successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error in removeWishlistItem API:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
