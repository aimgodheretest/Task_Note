import Note from "../models/Note.js";

// Get all  notes
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order(most recent first)
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching notes",
      error: error.message,
    });
  }
}

//Get a single note by ID
export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    // Check if the note exists
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error fetching note by ID:", error);
    res.status(500).json({
      message: "Error fetching note",
      error: error.message,
    });
  }
}

//Create a new note
export async function createNote(req, res) {
  try {
    const { title, content } = req.body; // Destructure title and content from the request body
    const note = new Note({ title, content }); // Create a new Note instance
    const savedNote = await note.save(); // Save the note to the database
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({
      message: "Error creating note",
      error: error.message,
    });
  }
}

// Update an existing note
export async function updateNote(req, res) {
  try {
    const { title, content } = req.body; // Destructure title and content from the request body
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    ); // Find the note by ID and update it, returning the updated note

    if (!updatedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    } // Check if the note was found and updated
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({
      message: "Error updating note",
      error: error.message,
    });
  }
}

// Delete a note
export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id); // Find the note by ID and delete it

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    } // Check if the note was found and deleted

    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({
      message: "Error deleting note",
      error: error.message,
    });
  }
}
