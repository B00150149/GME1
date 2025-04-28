import { MongoClient, ObjectId } from 'mongodb';

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get('requestId');

    if (!requestId) {
      return new Response(JSON.stringify({ error: 'Request ID is required' }), { status: 400 });
    }

    const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(url);
    const dbName = 'greenerme';

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('swapRequests');

    // Delete the request document
    const deleteResult = await collection.deleteOne({ _id: new ObjectId(requestId) });

    if (deleteResult.deletedCount === 0) {
      return new Response(JSON.stringify({ error: 'Request not found or no deletion made' }), { status: 404 });
    }

    // Remove the requestId from the user's requests array
    const usersCollection = db.collection('users');
    const updateUserResult = await usersCollection.updateOne(
      { requests: new ObjectId(requestId) },
      { $pull: { requests: new ObjectId(requestId) } }
    );

    console.log('User update result:', updateUserResult);

    return new Response(JSON.stringify({ message: 'Request deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting request:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
