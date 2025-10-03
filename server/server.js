import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import admin from "firebase-admin";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const jobsCollection = db.collection("jobs");

// ROUTES
app.get("/api/jobs", async (req, res) => {
  try {
    const snapshot = await jobsCollection.get(); // get all documents
    const jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/jobs/:id", async (req, res) => {
  try {
    const doc = await jobsCollection.doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ message: "Job not found" });
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/jobs", async (req, res) => {
  try {
    const newDoc = await jobsCollection.add(req.body);
    const job = await newDoc.get();
    res.status(201).json({ id: job.id, ...job.data() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/api/jobs/:id", async (req, res) => {
  try {
    const docRef = jobsCollection.doc(req.params.id);
    await docRef.update(req.body);
    const updatedDoc = await docRef.get();
    res.json({ id: updatedDoc.id, ...updatedDoc.data() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/api/jobs/:id", async (req, res) => {
  try {
    await jobsCollection.doc(req.params.id).delete();
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
