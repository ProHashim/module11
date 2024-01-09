// Import the 'path' module, which provides utilities for working with file and directory paths.
const path = require("path");

// Export a function that takes an Express application instance as a parameter.
module.exports = function (app) {
  // Define a route for handling HTTP GET requests to the root path ("/").
  app.get("/", function (req, res) {
    // Send the file located at the specified path as the response to the client.
    // The '__dirname' variable represents the current directory of the module.
    // The 'path.join' method is used to create a correct file path.
    res.sendFile(path.join(__dirname, "../public/assets/index.html"));
  });

  // Define another route for handling HTTP GET requests to the "/notes" path.
  app.get("/notes", function (req, res) {
    // Send the file located at the specified path as the response to the client.
    // Similar to the previous route, but for a different HTML file.
    res.sendFile(path.join(__dirname, "../public/assets/notes.html"));
  });
};
