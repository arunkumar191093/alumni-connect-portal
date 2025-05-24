import express from 'express';
import cors from 'cors';
import { users, jobs, successStories, guidanceTopics } from './mockData.js';

const app = express();
const PORT = 5001;

// Basic CORS setup
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Users endpoints
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// Jobs endpoints
app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

app.get('/api/jobs/:id', (req, res) => {
  const job = jobs.find(j => j.id === parseInt(req.params.id));
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job);
});

// Success stories endpoints
app.get('/api/stories', (req, res) => {
  res.json(successStories);
});

app.get('/api/stories/:id', (req, res) => {
  const story = successStories.find(s => s.id === parseInt(req.params.id));
  if (!story) return res.status(404).json({ message: 'Story not found' });
  res.json(story);
});

// Guidance topics endpoints
app.get('/api/guidance', (req, res) => {
  res.json(guidanceTopics);
});

app.get('/api/guidance/:id', (req, res) => {
  const topic = guidanceTopics.find(t => t.id === parseInt(req.params.id));
  if (!topic) return res.status(404).json({ message: 'Topic not found' });
  res.json(topic);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 