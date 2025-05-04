import { getCustomSession } from "../sessionCode.js";
import { MongoClient, ObjectId } from 'mongodb';


export async function GET(req, res) {
    // Make a note we are on 
    // the api. This goes to the console.  
   console.log("in updateDealStatus api page")
 
    // get the values 
    // that were sent across to us. 
   const { searchParams } = new URL(req.url);
   const requestId = searchParams.get('requestId');
   const itemId = searchParams.get('itemId');
   const swapItemId = searchParams.get('swapItemId');
  

   //get the user sending equest details through sessions
   let session = await getCustomSession();
   const senderEmail = session.email;
   const senderName = session.fullName;

   console.log('Received parameters:', { requestId });



  // =================================================
   const { MongoClient } = require('mongodb');
      const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
   const client = new MongoClient(url);
   const dbName = 'greenerme';
 
   
       await client.connect();
       console.log('Connected successfully to server');
       const db = client.db(dbName);
       const collection = db.collection('swapRequests');
 
       const updateResult = await collection.updateOne(
        { _id:new ObjectId(requestId) }, // Find  by requestId
        { $set: { dealStatus: 'Sold' } } // Update deal status to Sold
      );

      console.log('Update Result:', updateResult);


      // Determine points to deduct based on product category
      let category = null;
      const newlistingCollection = db.collection('newlisting');

      if (itemId && itemId.length > 0) {
        const itemDoc = await newlistingCollection.findOne({ _id: new ObjectId(itemId) });
        if (itemDoc && itemDoc.category) {
          category = itemDoc.category.trim().toLowerCase();
        }
      } else if (swapItemId && swapItemId.length > 0) {
        const swapItemDoc = await newlistingCollection.findOne({ _id: new ObjectId(swapItemId) });
        if (swapItemDoc && swapItemDoc.category) {
          category = swapItemDoc.category.trim().toLowerCase();
        }
      }

      let pointsToDeduct = 20; // default points deduction
      if (category === 'small') {
        pointsToDeduct = 20;
      } else if (category === 'medium') {
        pointsToDeduct = 50;
      } else if (category === 'large') {
        pointsToDeduct = 100;
      }

      const usersCollection = db.collection('users');
      const pointsUpdateResult = await usersCollection.findOneAndUpdate(
        { email: senderEmail },
        {
          $inc: { points: -pointsToDeduct },
          $push: { pointsHistory: `- ${pointsToDeduct} points Deducted due to swapping Item (category: ${category || 'unknown'})` }
        },
        { returnDocument: 'after' }
      );
      console.log('Points deduction result:', pointsUpdateResult);
      

      //Update deal status for items being swapped in newlisting
      if(itemId.length>0){
         const updateResult1 = await newlistingCollection.updateOne(
            { _id:new ObjectId(itemId) }, // Find  by requestId
            { $set: { dealStatus: 'Sold' } } // Update deal status to Sold
          );
  
        console.log('Update Result1:', updateResult1);   
      }
      if(swapItemId.length>0){
        const updateResult2 = await newlistingCollection.updateOne(
            { _id:new ObjectId(swapItemId) }, // Find  by requestId
            { $set: { dealStatus: 'Sold' } } // Update deal status to Sold
          );
  
        console.log('Update Result2:', updateResult2);   
      }
         
         

     return new Response(JSON.stringify({ data: "updated" }), { status: 200 });
 }



// //Make a put function for *updating* the status of message in database
//  export async function PUT(req) {
//   try {
//     const { requestId } = await req.json(); // Get request ID from request body

//     if (!requestId) {
//       return new Response(JSON.stringify({ error: 'Request ID is required' }), { status: 400 });
//     }

//     const { MongoClient } = require('mongodb');
//     const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//     const client = new MongoClient(url);
//     const dbName = 'greenerme';

//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection('swapRequests');

//     // Update request status to "Sold"
//     const updateResult = await collection.updateOne(
//       { _id: new ObjectId(requestId) },
//       { $set: { dealStatus: 'Sold' } }
//     );

//     if (updateResult.modifiedCount === 0) {
//       return new Response(JSON.stringify({ error: 'donedeal status Request not found or no update made' }), { status: 404 });
//     }

//     // Respond with success
//     return new Response(JSON.stringify({ message: 'Done deal status Request accepted' }), { status: 200 });
//   } catch (error) {
//     console.error('Error updating request:', error);
//     return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
//   }
// }



 