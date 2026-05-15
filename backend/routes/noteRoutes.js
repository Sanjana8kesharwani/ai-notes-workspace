const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  createNote,
  getNotes,
    getSingleNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const router = express.Router();

// create note
router.post("/", protect, createNote);

// get all notes
router.get("/", protect, getNotes);

//updated routes
router.put("/:id", protect, updateNote);

//delete routes
router.delete("/:id", protect, deleteNote);

router.get("/:id", protect, getSingleNote);

module.exports = router;