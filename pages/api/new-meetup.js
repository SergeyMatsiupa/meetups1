// api/new-meetup
// POST api/new-meetup
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // const {title, address, img, description} = data;
    const client = await MongoClient.connect("mongodb+srv://msvmongodb1:xCjtQD7hLwM_1EYAa@cluster0.a0s4nqy.mongodb.net/?retryWrites=true&w=majority");
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log('result', result);
    client.close();
    res.status(201).json({message: "Meetup inserted!"});
  }
}

export default handler;
