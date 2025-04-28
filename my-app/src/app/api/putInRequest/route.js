import { getCustomSession } from "../sessionCode.js";
import { MongoClient, ObjectId } from 'mongodb';

export async function GET(req, res) {
    // Make a note we are on 
    // the api. This goes to the console.  
   console.log("in the PutInRequest api page")
 
    // get the values 
    // that were sent across to us. 
   const { searchParams } = new URL(req.url);
   const userName = searchParams.get('userName');
   const userEmail = searchParams.get('userEmail');
   const itemName = searchParams.get('itemName');
   const swapItemId = searchParams.get('swapItemId');
   const itemId = searchParams.get('ItemId');
   const swapItemName = searchParams.get('swapItemName');
  

   //get the user sending equest details through sessions
   let session = await getCustomSession();
   const senderEmail = session.email;
   const senderName = session.fullName;

   console.log('Received parameters:', { itemName, userName,userEmail });

   console.log(`Item Name: ${itemName}, userName: ${userName} `);


if(senderEmail){
  // =================================================
   const { MongoClient } = require('mongodb');
      const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
   const client = new MongoClient(url);
   const dbName = 'greenerme';
 
   
       await client.connect();
       console.log('Connected successfully to server');
       const db = client.db(dbName);
       const collection = db.collection('swapRequests');
 
       const myobj = {
        senderName: senderName,
        senderEmail: senderEmail,
        itemName: itemName,
        itemId: itemId,
        swapItemId: swapItemId,
        swapItemName: swapItemName,
        userName: userName,
        userEmail: userEmail,
        status: 'Pending',
        dealStatus: 'Open',
        DateRequested: new Date(),
        // images: images
       };
 
       const insertResult = await collection.insertOne(myobj);
       console.log('Insert Result:', insertResult);

       
       //The request wll be stored in empty array in user
        const collection1 = db.collection('users');
        // Add the new item to the `items` list for the user
        const updateResult = await collection1.updateOne(
          { email: userEmail }, // Find user by email
          { $push: { requests: insertResult.insertedId } } // Add new item to `wishlist` array
        );

        console.log("Update result:", updateResult);

        if (updateResult.modifiedCount === 0) {
            return new Response(JSON.stringify({ error: "User not found or no update made" }), { status: 404 });
        }
       //}

     //==========================================================
   
      // at the end of the process we need to send something back. 
       return new Response(JSON.stringify({ data: "inserted" }), { status: 200 });
      }
      // at the end of the process we need to send something back. 
      return new Response(JSON.stringify({ data: "Can not swap request" }), { status: 500 });
 }
 


//Make a put function for *updating* the status of message in database
export async function PUT(req) {
  try {
    const { requestId } = await req.json(); // Get request ID from request body

    if (!requestId) {
      return new Response(JSON.stringify({ error: 'Request ID is required' }), { status: 400 });
    }

    const { MongoClient } = require('mongodb');
    const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(url);
    const dbName = 'greenerme';

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('swapRequests');

    // Update request status to "Accepted"
    const updateResult = await collection.updateOne(
      { _id: new ObjectId(requestId) },
      { $set: { status: 'Accepted' } }
    );

    if (updateResult.modifiedCount === 0) {
      return new Response(JSON.stringify({ error: 'Request not found or no update made' }), { status: 404 });
    }

    // Respond with success
    return new Response(JSON.stringify({ message: 'Request accepted' }), { status: 200 });
  } catch (error) {
    console.error('Error updating request:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}


 