const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    newsTitle: {
      type: String,
      required: true,
    },
    coverImgLink: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    publishDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("News", newsSchema);
