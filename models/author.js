const mongoose = require("mongoose");
const { DateTime } = require("luxon"); // for date handling

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
  matricula: { type: String },
  serie: { type: String },
  sexo: { type: String, enum: ['M','F','Outro'] },
  altura_cm: { type: Number },
  peso_kg: { type: Number },
  email: { type: String },
  telefone: { type: String },
  sports: [{ type: Schema.ObjectId, ref: 'Book' }],
});

// Virtual for author "full" name.
AuthorSchema.virtual("name").get(function () {
  return this.family_name + ", " + this.first_name;
});

// Virtual for this author instance URL.
AuthorSchema.virtual("url").get(function () {
  return "/catalog/author/" + this._id;
});

AuthorSchema.virtual("lifespan").get(function () {
  let lifetime_string = "";
  if (this.date_of_birth) {
    lifetime_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    );
  }
  lifetime_string += " - ";
  if (this.date_of_death) {
    lifetime_string += DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    );
  }
  return lifetime_string;
});

AuthorSchema.virtual("date_of_birth_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toISODate(); // format 'YYYY-MM-DD'
});

AuthorSchema.virtual("date_of_death_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.date_of_death).toISODate(); // format 'YYYY-MM-DD'
});

// Body mass index (IMC) virtual
AuthorSchema.virtual('imc').get(function() {
  if (!this.altura_cm || !this.peso_kg) return null;
  const height_m = this.altura_cm / 100.0;
  const imc = this.peso_kg / (height_m * height_m);
  return Number(imc.toFixed(2));
});

// Export model.
module.exports = mongoose.model("Author", AuthorSchema);
