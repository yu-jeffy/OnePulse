require('dotenv').config();
const express = require('express');
const session = require('express-session');
const next = require('next');
const { DidDht } = require('@web5/dids');
const bcrypt = require('bcryptjs');
const connectDB = require('./db');
const MongoClient = require('mongodb').MongoClient;

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const MongoStore = require('connect-mongo');

app.prepare().then(async () => {
  const server = express();
  server.use(express.json());
  
  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db(process.env.MONGODB_DB_NAME);
  const sessionCollection = db.collection('sessions');
  await sessionCollection.deleteMany({});

  server.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
    store: MongoStore.create({ 
      client: client,
      dbName: process.env.MONGODB_DB_NAME
    })
  }));

  server.post('/api/signup', async (req, res) => {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }
  
    try {
      const didDht = await DidDht.create({ publish: true });
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = {
        did: didDht.uri,
        password: hashedPassword,
      };
  
      await db.collection('users').insertOne(user);
      req.session.user = { did: user.did };
  
      res.status(201).json({
        message: 'Signup successful, you are now logged in.',
        did: user.did
      });
    } catch (error) {
      console.error("Signup failed:", error);
      res.status(500).json({ message: 'Signup failed' });
    }
  });

  server.get('*', (req, res) => {
    return handle(req, res); // Handles all other routes
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});