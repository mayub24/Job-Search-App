import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import admin from "firebase-admin";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Initialize Firebase Admin using environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);

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
