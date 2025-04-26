import { getCustomSession } from '../sessionCode.js';
import { MongoClient } from 'mongodb';

export async function POST(req) {
  try {
    const session = await getCustomSession();
    const email = session.email;

    if (!email) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(url);
    const dbName = 'greenerme';

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('swapRequests');

    // Update all pending requests for the user to status "Viewed"
    const updateResult = await collection.updateMany(
      { userEmail: email, status: "Pending" },
      { $set: { status: "Viewed" } }
    );

    return new Response(JSON.stringify({ message: 'Requests marked as viewed', modifiedCount: updateResult.modifiedCount }), { status: 200 });
  } catch (error) {
    console.error('Error marking requests as viewed:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
