const Note = require("../models/Note");

const { generateSummary } = require("../services/geminiService");

const generateNoteSummary = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    // ownership check
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // generate AI response
    const aiResponse = await generateSummary(note.content);

    // save summary
    note.summary = aiResponse;

    await note.save();

    res.status(200).json({
      summary: aiResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  generateNoteSummary,
};