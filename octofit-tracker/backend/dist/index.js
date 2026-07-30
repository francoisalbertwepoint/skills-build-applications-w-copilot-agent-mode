"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./config/database");
const User_1 = require("./models/User");
const Team_1 = require("./models/Team");
const Activity_1 = require("./models/Activity");
const LeaderboardEntry_1 = require("./models/LeaderboardEntry");
const Workout_1 = require("./models/Workout");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
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
        const users = await User_1.User.find().lean();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch users', details: error });
    }
});
app.get('/api/teams/', async (_req, res) => {
    try {
        const teams = await Team_1.Team.find().lean();
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch teams', details: error });
    }
});
app.get('/api/activities/', async (_req, res) => {
    try {
        const activities = await Activity_1.Activity.find().lean();
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch activities', details: error });
    }
});
app.get('/api/leaderboard/', async (_req, res) => {
    try {
        const leaderboard = await LeaderboardEntry_1.LeaderboardEntry.find().lean();
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch leaderboard', details: error });
    }
});
app.get('/api/workouts/', async (_req, res) => {
    try {
        const workouts = await Workout_1.Workout.find().lean();
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch workouts', details: error });
    }
});
app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`Base URL: ${baseUrl}`);
});
