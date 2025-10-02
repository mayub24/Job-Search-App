import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import admin from "firebase-admin";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const serviceAccount = {
  type: "service_account",
  project_id: "muhammads-api",
  private_key_id: "1448357b69145eade3218e1bd2e61b282d03c77c",
  private_key: `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC7vAPfWl7RxyPA
+CueQ3jYSUUEbe4PxGiwEDAOI9N82JbyHiyL0eSW2RiyzFT/nx49VugrdgsaUIQN
I5wE75Wy4k1r3zV+itrc7MOzr0gNdlAvZmTnDTjEyFDQTPSGaT0q24VDogvIAHkB
Wa+WDsCre91hlK5k1oNDA1VBLZbZXsC3EADdwS/oEMV5S5IaKUXrR+QQdyyCW4dk
kIaUYryRC1TezcfSsO4siNLJX2ZtJ7l87rkyIm7bvTZKSqWmLghLIwSqKSHtD7O4
VD8tfi5Ui+jAvl04k70dLzzIBnkFLhwu//aMk76JF/iVWjwZvEX33RCo2VXACYj1
acEsHmHHAgMBAAECggEAUwa7z7Pv62be8SDQaZX9g+ojk+nqNx7uDa+bESXXCoff
egTOPqf9KJmqyqiDjumYPhiJZW83SdQCEq2E+snastpS0zpMNkLCuKIdiwIiI5IH
tG7cgTLfwGe3Fehy3F7+pk2fimHIRBOxcF9xwDOWEkEdj2JqHj6gnqqCseivpkH3
ndxbGlZJGrizUCp7p3wAmnsEO5c9vT9zEjrOu7DLqeERUxOXO1QzGLh8UlD+idY9
1wX4FRq8UE5deDMMqc2X59HRZWVaLlqwk3emuldW9TUwJzxaMtcE/aZPQSYbNT3y
Trk2ZWIV56cj6ui1qa7ErMONq4Ol3+EanRq1NCcYQQKBgQDdR6GJ88UpqBph/bkT
uqzTqQkb2D4hiFEQBUvkz9zRiyAyLA8Pgr5Y73cWTqG2ZsOMyUwRnAEmRVn4bqKV
7SdhiQN4S1YVvh2XMGHMb35MOHsN5rXzBzt0UXLGkQ74tW4BRYZa4emliN56S4Is
SPs+V8KCWwDjRErX+YK+r/9VEwKBgQDZMO7qUBNPzDS6UNe01Y+8UtF7oweRwXeh
9xBV0mBnSjRhnpBGs3oNLNtIpLyMq40o+xv8NaeYVdoKSgW2k/r6Ou+hXP+RIdSn
42DwyAzfhpWBo94lzSOAyahr+U3hKAeLyPDEBpajIAwrPse7/e/kQ63KBQ3sn2/i
P+aQu5s6/QKBgEDJXC57xNoxcagHFU0FdtxxvUz9vxMqSjGam2HeyhQ/26lU5QPx
j7GSSxeo5gf1hoON3Eu7lUqTO4hVPB0RVlpkNzPdOtMa2qcNb1Tfv+apEr47MkJ5
d5rSzfv9NJj05cRRisjJJBNnQ1wjB3XX2FekcjqgUl43/IHHd9REy0kpAoGBAIh1
Tia5mOiSDK7jDCP56g0Qm71qeN8DBv8kE4dYXmmHHdIXpd5F9XFBtaS2nCBlyJLu
8m5L57i2d//u8hf8cbu2O8jOfWPaNZomKkod5rip/lUtd+2YLa5FBSSRxnSoidUx
stP2r75d7Edfcm6S5Z4tR4ueEVmR8uHb9CkLNkShAoGBAICspnsWql6Ey9k/91FQ
gKgZIsdUqj97SXqgJ8l9LNEUqz+EymoSjUGA2qWlItyrYHk7mppbu5Xfqzl2UDIe
P1lEF3F4AoAYb/ICJPwhLJYdd11Ye7nSUuLeTDZHLVD9qsAMcRV8EMCtSTNQLN7t
6rCF3pO6WkSUsLFvzgOvNRex
-----END PRIVATE KEY-----`,
  client_email: "firebase-adminsdk-fbsvc@muhammads-api.iam.gserviceaccount.com",
  client_id: "117678119616338834225",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc@muhammads-api.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
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
