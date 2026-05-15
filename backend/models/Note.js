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

    summary: {
      type: String,
      default: "",
    },

    tags: [
      {
        type: String,
      },
    ],

    category: {
      type: String,
      default: "General",
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isPublic: {
      type: Boolean,
      default: false,
    },

    shareId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Note", noteSchema);
