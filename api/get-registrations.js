import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  try {
    await client.connect();
    
    // This command helps find the correct database automatically
    const db = client.db(); // Leaving this empty tells MongoDB to use the default db in your URI
    
    // We fetch from 'students' because your Chart shows that as the Data Source
    const data = await db.collection('students').find({}).toArray();
    
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "Vault Connection Failed" });
  } finally {
    await client.close();
  }
}
