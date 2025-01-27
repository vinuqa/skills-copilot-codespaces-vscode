// Create web server
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

// Set up the body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Load the comments from the JSON file
function loadComments() {
  try {
    return JSON.parse(fs.readFileSync('comments.json', 'utf8'));
  } catch (error) {
    return [];
  }
}

// Save the comments to the JSON file
function saveComments(comments) {
  fs.writeFileSync('comments.json', JSON.stringify(comments, null, 2));
}

// Get all comments
app.get('/api/comments', (req, res) => {
  res.json(loadComments());
});

// Add a new comment
app.post('/api/comments', (req, res) => {
  const comments = loadComments();
  const newComment = {
    id: Date.now(),