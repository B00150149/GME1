export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the getNessages api page")
    // get the values 
    // that were sent across to us. 
   const { searchParams } = new URL(req.url);
   const requestId = searchParams.get('requestId');

    // =================================================
    const { MongoClient } = require('mongodb');
      const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    const client = new MongoClient(url);
    const dbName = 'greenerme'; // database name

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('messages'); // collection name
    const findResult = await collection.find({requestId:requestId}).toArray();
    console.log('Found documents =>', findResult);

    //==========================================================
    // at the end of the process we need to send something back.
    return Response.json(findResult)
    }
    