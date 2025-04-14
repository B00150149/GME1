import { getCustomSession } from "../sessionCode.js";

export async function GET(req, res) {
    // Make a note we are on 
    // the api. This goes to the console.  
   console.log("in the putInWishlist api page")
 
    // get the values 
    // that were sent across to us. 
   const { searchParams } = new URL(req.url);
   const itemName = searchParams.get('itemName');
   const description = searchParams.get('description');
   const category = searchParams.get('category');
   const userName = searchParams.get('userName');
   //const swapDetails = searchParams.get('swapDetails');
    const images = searchParams.getAll('images'); // Handle multiple files if needed

  //  console.log('Received parameters:', { itemName, description, category, swapDetails, images });
   console.log('Received parameters:', { itemName, description, images , category, userName});

 
  //  console.log(`Item Name: ${itemName}, Description: ${description}, Category: ${category}, Swap Details: ${swapDetails}, Images:${images} `);
  console.log(`Item Name: ${itemName}, Description: ${description}, Images:${images} , category:${category}, userName: ${userName}`);


  // =================================================
   const { MongoClient } = require('mongodb');
      const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
   const client = new MongoClient(url);
   const dbName = 'greenerme';
 
   
       await client.connect();
       console.log('Connected successfully to server');
       const db = client.db(dbName);
       const collection = db.collection('wishlist');
 
       const myobj = {
        itemName: itemName,
        description: description,
         category: category,
         userName: userName,
        images: images
       };
 
       const insertResult = await collection.insertOne(myobj);
       console.log('Insert Result:', insertResult);

       //add wishlist in loggedin users data
       let session = await getCustomSession();
       const email = session.email;
       if(email){ //or use isLoggedin
        const collection1 = db.collection('users');
        // Add the new item to the `items` list for the user
        const updateResult = await collection1.updateOne(
          { email: email }, // Find user by email
          { $push: { wishlist: myobj } } // Add new item to `wishlist` array
        );

        console.log("Update result:", updateResult);

        if (updateResult.modifiedCount === 0) {
            return new Response(JSON.stringify({ error: "User not found or no update made" }), { status: 404 });
        }
       }

     //==========================================================
   
      // at the end of the process we need to send something back. 
       return new Response(JSON.stringify({ data: "inserted" }), { status: 200 });
  
 }
 




 