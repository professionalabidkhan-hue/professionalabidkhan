import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db('Abid_ELearning_Hub');
    // Fetch all records, sorted by newest first
    const data = await db.collection('students').find({}).sort({ joined_at: -1 }).toArray();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
    await client.close();
  }
}
