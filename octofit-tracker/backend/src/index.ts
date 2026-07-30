import express from 'express';
import dotenv from 'dotenv';
import './config/database';
import { User } from './models/User';
import { Activity } from './models/Activity';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker API is running', baseUrl });
});

app.get('/api/users', async (_req, res) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch users', details: error });
  }
});

app.get('/api/activities', async (_req, res) => {
  try {
    const activities = await Activity.find().lean();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch activities', details: error });
  }
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
  console.log(`Base URL: ${baseUrl}`);
});
