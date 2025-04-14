export async function DELETE(req)
 {  // Make a note we are on
    // the api. This goes to the console.
    console.log("In the deleteWishlistItem API");

    
     // =================================================
     const { MongoClient } = require('mongodb');
     const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
     const client = new MongoClient(url);
     const dbName = 'greenerme'; // database name
     await client.connect();
     console.log('Connected successfully to server');
     const db = client.db(dbName);
     const collection = db.collection('wishlist'); // collection name

    try {
        // Connect to the database
        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db(dbName);
        const collection = db.collection('wishlist'); // Collection name

        // Delete the item with the specified ID
        const deleteResult = await collection.deleteOne({ _id: new ObjectId(itemId) });

        if (deleteResult.deletedCount === 1) {
            console.log(`Successfully deleted item with ID: ${itemId}`);
            return new Response(JSON.stringify({ message: "Item deleted successfully" }), { status: 200 });
        } else {
            console.error(`Item with ID: ${itemId} not found`);
            return new Response(JSON.stringify({ error: "Item not found" }), { status: 404 });
        }
    } catch (error) {
        console.error("Error deleting item:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    } finally {
        // Close the database connection
        await client.close();
    }
}