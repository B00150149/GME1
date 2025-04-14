
import { getCustomSession } from '../sessionCode.js';

export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the getAcceptedRequest api page")
    const session = await getCustomSession()
    const email = session.email;
    
    // =================================================
    const { MongoClient } = require('mongodb');
       const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    const client = new MongoClient(url);
    const dbName = 'greenerme'; // database name

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('swapRequests'); // collection name
    //filter rout request and status of request for the particular user 
    //const findResult = await collection.find({userEmail:email,status:"Accepted"}).toArray();
    const findResult2 = await collection.find({senderEmail:email,status:"Accepted"}).toArray();
    //console.log('Found documents =>', findResult);
    console.log('Found documents (User as sender) =>', findResult2);


    // Merge results and remove duplicates
   //  const mergedResults = [...findResult, ...findResult2];
   //  const uniqueResults = Array.from(new Map(mergedResults.map(obj => [obj._id.toString(), obj])).values());

    //==========================================================
    // at the end of the process we need to send something back.

    //await client.close(); // Close DB connection after use
    return Response.json(findResult2);
   
   }
    