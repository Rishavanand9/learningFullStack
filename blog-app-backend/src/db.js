import { MongoClient } from "mongodb";

let db;

async function connectToDatabase(cb) {
  const client = new MongoClient(
    "mongodb+srv://rishavanand1997:newPass@cluster0.5miouwq.mongodb.net/"
  );
  await client.connect();
  db = client.db("blog");
  cb();
}

export { db, connectToDatabase };
