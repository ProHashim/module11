// Dependencies
const express = require("express"); // Import the Express.js framework
const fs = require("fs"); // Import the File System module for working with files

// Sets up the express app
var app = express(); // Create an instance of the Express application
var PORT = process.env.PORT || 8080; // Set the port to either the environment variable PORT or default to 8080

// Middleware is a series of functions in Express.js that handle tasks such as parsing request data, serving static files, and routing, enhancing the request-response cycle between the client and the server.

// Sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded data
app.use(express.json()); // Middleware for parsing JSON data
app.use("/public/assets", express.static(__dirname + "/public/assets")); // Serve static files from the specified directory

require("./routes/html-routes")(app); // Include and invoke HTML route configuration
require("./routes/api-routes")(app); // Include and invoke API route configuration

// Starts the server to begin listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT); // Start the server and log a message indicating the port it's listening on
});
