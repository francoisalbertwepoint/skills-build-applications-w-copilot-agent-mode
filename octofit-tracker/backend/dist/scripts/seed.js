"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const Team_1 = require("../models/Team");
const Activity_1 = require("../models/Activity");
const LeaderboardEntry_1 = require("../models/LeaderboardEntry");
const Workout_1 = require("../models/Workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User_1.User.deleteMany({}),
            Team_1.Team.deleteMany({}),
            Activity_1.Activity.deleteMany({}),
            LeaderboardEntry_1.LeaderboardEntry.deleteMany({}),
            Workout_1.Workout.deleteMany({}),
        ]);
        const users = await User_1.User.insertMany([
            { name: 'Ava Martinez', email: 'ava@example.com', role: 'captain' },
            { name: 'Noah Kim', email: 'noah@example.com', role: 'member' },
            { name: 'Mina Patel', email: 'mina@example.com', role: 'member' },
        ]);
        const teams = await Team_1.Team.insertMany([
            { name: 'Northstar Runners', sport: 'Running', members: 12 },
            { name: 'Harbor Cyclists', sport: 'Cycling', members: 8 },
        ]);
        const activities = await Activity_1.Activity.insertMany([
            { title: 'Morning run', type: 'run', duration: 35 },
            { title: 'Strength circuit', type: 'strength', duration: 45 },
            { title: 'Cycling intervals', type: 'cycling', duration: 40 },
        ]);
        const leaderboardEntries = await LeaderboardEntry_1.LeaderboardEntry.insertMany([
            { userId: users[0]._id.toString(), score: 980, rank: 1 },
            { userId: users[1]._id.toString(), score: 915, rank: 2 },
            { userId: users[2]._id.toString(), score: 890, rank: 3 },
        ]);
        const workouts = await Workout_1.Workout.insertMany([
            { title: 'Tempo Run', focus: 'endurance', duration: 30 },
            { title: 'Core Burn', focus: 'core', duration: 20 },
            { title: 'Hill Intervals', focus: 'speed', duration: 25 },
        ]);
        console.log('Seeded users:', users.length);
        console.log('Seeded teams:', teams.length);
        console.log('Seeded activities:', activities.length);
        console.log('Seeded leaderboard entries:', leaderboardEntries.length);
        console.log('Seeded workouts:', workouts.length);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
