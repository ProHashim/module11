// Import the 'fs' (file system) module for reading and writing files.
const fs = require("fs");

// Read the content of the "db.json" file and parse it as JSON.
// This assumes that the "db.json" file is in the same directory as this module.
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

// Export a function that takes an Express application instance as a parameter.
module.exports = function (app) {
  // Define a route for handling HTTP GET requests to "/api/notes".
  app.get("/api/notes", function (req, res) {
    // Respond with the JSON data containing the notes.
    res.json(data);
  });

  // Define a route for handling HTTP GET requests to "/api/notes/:id".
  app.get("/api/notes/:id", function (req, res) {
    // Respond with the JSON data of the specific note identified by the provided 'id' parameter.
    res.json(data[Number(req.params.id)]);
  });

  // Define a route for handling HTTP POST requests to "/api/notes".
  app.post("/api/notes", function (req, res) {
    // Get the new note from the request body.
    let newNote = req.body;
    // Generate a unique ID for the new note.
    let uniqueId = data.length.toString();
    console.log(uniqueId);
    // Assign the unique ID to the new note.
    newNote.id = uniqueId;
    // Add the new note to the data array.
    data.push(newNote);

    // Write the updated data array to the "db.json" file.
    fs.writeFileSync("./db/db.json", JSON.stringify(data), function (err) {
      if (err) throw err;
    });

    // Respond with the updated data containing the new note.
    res.json(data);
  });

  // Define a route for handling HTTP DELETE requests to "/api/notes/:id".
  app.delete("/api/notes/:id", function (req, res) {
    // Get the ID of the note to be deleted from the request parameters.
    let noteId = req.params.id;
    let newId = 0;
    console.log(`Deleting note with id ${noteId}`);
    // Filter out the note with the specified ID from the data array.
    data = data.filter((currentNote) => {
      return currentNote.id != noteId;
    });
    // Reassign new IDs to the remaining notes in the array.
    for (currentNote of data) {
      currentNote.id = newId.toString();
      newId++;
    }
    // Write the updated data array to the "db.json" file.
    fs.writeFileSync("./db/db.json", JSON.stringify(data));
    // Respond with the updated data after the note has been deleted.
    res.json(data);
  });
};
