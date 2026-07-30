import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { Workout } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Ava Martinez', email: 'ava@example.com', role: 'captain' },
      { name: 'Noah Kim', email: 'noah@example.com', role: 'member' },
      { name: 'Mina Patel', email: 'mina@example.com', role: 'member' },
    ]);

    const teams = await Team.insertMany([
      { name: 'Northstar Runners', sport: 'Running', members: 12 },
      { name: 'Harbor Cyclists', sport: 'Cycling', members: 8 },
    ]);

    const activities = await Activity.insertMany([
      { title: 'Morning run', type: 'run', duration: 35 },
      { title: 'Strength circuit', type: 'strength', duration: 45 },
      { title: 'Cycling intervals', type: 'cycling', duration: 40 },
    ]);

    const leaderboardEntries = await LeaderboardEntry.insertMany([
      { userId: users[0]._id.toString(), score: 980, rank: 1 },
      { userId: users[1]._id.toString(), score: 915, rank: 2 },
      { userId: users[2]._id.toString(), score: 890, rank: 3 },
    ]);

    const workouts = await Workout.insertMany([
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

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
