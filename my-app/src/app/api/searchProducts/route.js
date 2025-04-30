import { MongoClient } from 'mongodb';

const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(url);
const dbName = 'greenerme'; // database name

export async function POST(req) {
  try {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('newlisting');

    const body = await req.json();
    const searchQuery = body.searchQuery;

    console.log('Received search query:', searchQuery);

    if (!searchQuery) {
      return new Response(JSON.stringify({ error: 'Search query is required' }), { status: 400 });
    }

    const products = await collection
      .find({
        $or: [
          { itemName: { $regex: searchQuery, $options: 'i' } },
          { description: { $regex: searchQuery, $options: 'i' } },
          { category: { $regex: searchQuery, $options: 'i' } },
        ],
        dealStatus: "Open"
      })
      .toArray();

    console.log('Found products count:', products.length);

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error('Error in searchProducts POST API:', error);
    return new Response(JSON.stringify({ error: 'Failed to search products', details: error.message }), { status: 500 });
  }
}
