import { getCustomSession } from "../sessionCode.js";  
import { MongoClient } from "mongodb";

const url = "mongodb+srv://root:test@cluster0.dkegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(url);
const dbName = "greenerme";

export async function GET() {
  console.log("Fetching reviews from MongoDB");

  try {
    await client.connect();
    const db = client.db(dbName);
    const reviewCollection = db.collection("reviews");

    const reviews = await reviewCollection.find().sort({ createdAt: -1 }).toArray();
    return new Response(JSON.stringify(reviews), { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch reviews" }), { status: 500 });
  }
}

export async function POST(req) {
  const formData = await req.formData();
  const reviewText = formData.get("reviewText");
  const rating = parseInt(formData.get("rating"), 10);
  const images = formData.getAll("images"); 

  let session = await getCustomSession();
  const email = session.email;
  const fullName = session.fullName;

  if (!reviewText || !rating) {
    return new Response(JSON.stringify({ error: "Review text and rating are required" }), { status: 400 });
  }

  await client.connect();
  const db = client.db(dbName);
  const reviewCollection = db.collection("reviews");

  const newReview = { reviewText, rating, images, userName: fullName, email, createdAt: new Date() };
  await reviewCollection.insertOne(newReview);

  return new Response(JSON.stringify(newReview), { status: 200 });
}
