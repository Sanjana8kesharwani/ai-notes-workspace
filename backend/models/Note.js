const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    category: {
      type: String,
      default: "General",
    },

    archived: {
      type: Boolean,
      default: false,
    },

    summary: {
      type: String,
      default: "",
    },

    actionItems: {
      type: [String],
      default: [],
    },

    isPublic: {
      type: Boolean,
      default: false,
    },

    shareId: {
      type: String,
      default: "",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;