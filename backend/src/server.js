// Import the express library
const express = require('express');
// Create an instance of the express application
const app = express();
// Define the port number the server will listen on
const PORT = 3000;

// Define a route for the homepage (GET request to '/')
app.get('/', (req, res) => {
  res.send('<h1>Hello, Express.js Server!</h1>');
});

// Define another route (GET request to '/about')
app.get('/about', (req, res) => {
  res.send('This is the about page.');
});

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
