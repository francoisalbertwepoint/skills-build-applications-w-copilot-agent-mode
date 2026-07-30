"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./config/database");
const User_1 = require("./models/User");
const Activity_1 = require("./models/Activity");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'OctoFit Tracker API is running', baseUrl });
});
app.get('/api/users', async (_req, res) => {
    try {
        const users = await User_1.User.find().lean();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch users', details: error });
    }
});
app.get('/api/activities', async (_req, res) => {
    try {
        const activities = await Activity_1.Activity.find().lean();
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch activities', details: error });
    }
});
app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`Base URL: ${baseUrl}`);
});
