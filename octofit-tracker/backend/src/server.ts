import express from 'express';
import dotenv from 'dotenv';
import './config/database';
import { User } from './models/User';
import { Team } from './models/Team';
import { Activity } from './models/Activity';
import { LeaderboardEntry } from './models/LeaderboardEntry';
import { Workout } from './models/Workout';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    message: 'OctoFit Tracker API',
    baseUrl,
    endpoints: {
      health: '/api/health',
      users: '/api/users/',
      teams: '/api/teams/',
      activities: '/api/activities/',
      leaderboard: '/api/leaderboard/',
      workouts: '/api/workouts/'
    }
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker API is running', baseUrl });
});

app.get('/api/users/', async (_req, res) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch users', details: error });
  }
});

app.get('/api/teams/', async (_req, res) => {
  try {
    const teams = await Team.find().lean();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch teams', details: error });
  }
});

app.get('/api/activities/', async (_req, res) => {
  try {
    const activities = await Activity.find().lean();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch activities', details: error });
  }
});

app.get('/api/leaderboard/', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find().lean();
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch leaderboard', details: error });
  }
});

app.get('/api/workouts/', async (_req, res) => {
  try {
    const workouts = await Workout.find().lean();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch workouts', details: error });
  }
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
  console.log(`Base URL: ${baseUrl}`);
});
