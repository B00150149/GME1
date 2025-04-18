import { getCustomSession } from "../sessionCode.js";

export async function POST(req) {
    console.log("in the newListing api page");

    const body = await req.json();
    const { itemName, description, category, swapDetails, images } = body;

    //add wishlist in loggedin users data
    let session = await getCustomSession();
    const email = session.email;
    const fullName = session.fullName;

    console.log("Received itemName:", itemName);
    console.log("Received description:", description);
    console.log("Received category:", category);
    console.log("Received swapDetails:", swapDetails);
    console.log("Received images:", images);

    // Validate input
    if (!itemName || !description || !category || !swapDetails) {
        console.log("Invalid input detected");
        return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    // =================================================
    const { MongoClient } = require('mongodb');
    const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    const client = new MongoClient(url);
    const dbName = 'greenerme';

    // Connect to MongoDB
    await client.connect();
    console.log("Connected successfully to MongoDB Atlas");
    const db = client.db(dbName);
    const collection = db.collection('newlisting');

    // Insert the Listing data
    const newlisting = {
        itemName,
        description,
        category,
        swapDetails,
        images, // Save image URLs
        userName: fullName,
        email: email,
        dealStatus: 'Open',
        createdAt: new Date(),
    };

    const insertResult = await collection.insertOne(newlisting);
    console.log("Insert result:", insertResult);

    if (email) { //or use isLoggedin
        const collection2 = db.collection('users');
        // Add the new item to the `items` list for the user
        const updateResult = await collection2.updateOne(
            { email: email }, // Find user by email
            { $push: { products: insertResult.insertedId } } // Add new item to `wishlist` array
        );

        console.log("Update result:", updateResult);

        if (updateResult.modifiedCount === 0) {
            return new Response(JSON.stringify({ error: "User not found or no update made" }), { status: 404 });
        }
    }

    //==========================================================

    // Return success response
    return new Response(JSON.stringify({ data: "inserted" }), { status: 200 });
}
