const { MongoClient } = require('mongodb');

let db;

const connectDB = async () => {
  if (db) return db;
  const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  db = client.db(process.env.MONGODB_DB_NAME);
  return db;
};

module.exports = connectDB;