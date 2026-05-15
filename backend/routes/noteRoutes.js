const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  createNote,
  getNotes,
    getSingleNote,
  updateNote,
  deleteNote,
  shareNote,
getSharedNote,
archiveNote,
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

router.post("/:id/share",protect,shareNote);
  

router.get("/shared/:shareId",getSharedNote);

router.patch("/:id/archive",protect,archiveNote);
  
  
module.exports = router;