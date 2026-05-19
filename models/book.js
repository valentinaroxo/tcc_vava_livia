const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.ObjectId, ref: "Author", required: true },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  type: { type: String, enum: ['Individual','Equipe'], default: 'Individual' },
  participants_count: { type: Number, default: 0 },
  genre: [{ type: Schema.ObjectId, ref: "Genre" }],
});

// Virtual for this book instance URL.
BookSchema.virtual("url").get(function () {
  return "/catalog/book/" + this._id;
});

// Export model.
module.exports = mongoose.model("Book", BookSchema);
