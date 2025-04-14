import { getCustomSession } from "../sessionCode.js";
import { MongoClient, ObjectId } from 'mongodb';


export async function GET(req, res) {
    // Make a note we are on 
    // the api. This goes to the console.  
   console.log("in the PutInMessages api page")
 
    // get the values 
    // that were sent across to us. 
   const { searchParams } = new URL(req.url);
   // const userName = searchParams.get('userName');
   // const userEmail = searchParams.get('userEmail');
   const messages = searchParams.get('messages');
   const requestId = searchParams.get('requestId');
  

   //get the user sending equest details through sessions
   let session = await getCustomSession();
   const senderEmail = session.email;
   const senderName = session.fullName;

   console.log('Received parameters:', { requestId,messages });

   // console.log(`userName: ${userName} `);


if(senderEmail){
  // =================================================
   const { MongoClient } = require('mongodb');
      const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
   const client = new MongoClient(url);
   const dbName = 'greenerme';
 
   
       await client.connect();
       console.log('Connected successfully to server');
       const db = client.db(dbName);
       const collection = db.collection('messages');
 
       const findResult = await collection.find({requestId:requestId}).toArray();
       if(findResult.length==0){
         const myobj = {
            requestId:requestId,
            messages: [],
            DateMessaged: new Date(),
            status: 'open',
           };

           const insertResult = await collection.insertOne(myobj);
           console.log('Insert Result:', insertResult);
       }

       // Push the new message to the Messages array
      const newMessage = {
         senderName: senderName,
         email: senderEmail,
         message: messages,
         Timestamp: new Date().toLocaleString(), // Or format the date as per your requirement
      };
      
       const updateResult = await collection.updateOne(
         { requestId:requestId }, // Find  by requestId
         { $push: { messages: newMessage } } // Add new item to `wishlist` array
       );

       console.log('Update Result:', updateResult);       
          
    }


     // at the end of the process we need to send something back. 
     return new Response(JSON.stringify({ data: "inserted" }), { status: 200 });
 }



// import { getCustomSession } from "../sessionCode.js";
// import { MongoClient, ObjectId } from 'mongodb';


// export async function GET(req, res) {
//     // Make a note we are on 
//     // the api. This goes to the console.  
//    console.log("in the PutInMessages api page")
 
//     // get the values 
//     // that were sent across to us. 
//    const { searchParams } = new URL(req.url);
//    const userName = searchParams.get('userName');
//    const userEmail = searchParams.get('userEmail');
//  // const itemName = searchParams.get('itemName');
//    const messages = searchParams.get('messages');
//    //const requestId = searchParams.get('requestId');
  
  

//    //get the user sending equest details through sessions
//    let session = await getCustomSession();
//    const senderEmail = session.email;
//    const senderName = session.fullName;

//    console.log('Received parameters:', { userName,userEmail });

//    console.log(`userName: ${userName} `);


// if(senderEmail){
//   // =================================================
//    const { MongoClient } = require('mongodb');
//       const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//    const client = new MongoClient(url);
//    const dbName = 'greenerme';
 
   
//        await client.connect();
//        console.log('Connected successfully to server');
//        const db = client.db(dbName);
//        const collection = db.collection('messages');
 
//        const myobj = {
//         senderName: senderName,
//         senderEmail: senderEmail,
//         userName: userName,
//         userEmail: userEmail,
//         itemName: itemName,
//         messages: [],
//         DateMessaged: new Date(),
//         status: 'sent',
//        };
 
//        const insertResult = await collection.insertOne(myobj);
//        console.log('Insert Result:', insertResult);

    
//     }


//      // at the end of the process we need to send something back. 
//      return new Response(JSON.stringify({ data: "inserted" }), { status: 200 });
//  }