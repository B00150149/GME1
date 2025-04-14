import { getCustomSession } from '../sessionCode.js';

export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the login api page")
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    const pass = searchParams.get('pass')
    console.log(email);
    console.log(pass);

    // database call goes here
    // =================================================
    const { MongoClient } = require('mongodb');
       const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    const client = new MongoClient(url);
    const dbName = 'greenerme'; // database name

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('users'); // collection name

    const findResult = await collection.find({ email: email, pass: pass}).toArray();

    console.log('Found documents =>', findResult);

    let valid = false
    if(findResult.length >0 ){

        //Sessions start
        let session = await getCustomSession()
        session.email = email;
        session.fullName = findResult[0].fullName;
        await session.save();
        console.log(session.email);
        console.log(session.fullName);


        valid = true;
        console.log("login valid");

        //save user wishlist in current session wishlist
        if(findResult[0].wishlist.length > 0){

            console.log("Wishlist:", findResult[0].wishlist);
            const collectionw = db.collection('wishlist');
            
            findResult[0].wishlist.map((item) =>
                 collectionw.insertOne(item)
            );
        }
    
    } else {
    valid = false;
    console.log("login Invalid");
   
    }

    // at the end of the process we need to send something back.
    return Response.json({ "status":valid})
    }
    