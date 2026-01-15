import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db('Abid_ELearning_Hub');
    const collection = db.collection('students');

    const { email, password } = req.body;

    // Search for the student with matching email AND password
    const user = await collection.findOne({ email: email, password: password });

    if (user) {
      // Success! Send back the name and email for LocalStorage
      res.status(200).json({ 
        message: 'Identity Verified', 
        name: user.name, 
        email: user.email 
      });
    } else {
      // Failed!
      res.status(401).json({ error: 'Invalid Identity Credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
}
