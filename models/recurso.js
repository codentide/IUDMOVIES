const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const RecursoSchema = new Schema({
  serial: {
    type: String,
    required: [true, "El serial es requerido"],
    unique: [true, "Este serial ya existe"],
  },
  titulo: {
    type: String,
    required: [true, "El título del recurso es requerido"],
  },
  sinopsis: {
    type: String,
  },
  url: {
    type: String,
    unique: [true, "Esta URL ya existe"],
  },
  portada: {
    type: String,
    required: [true, "La portada del recurso es requerida"],
  },
  anioEstreno: {
    type: Number,
  },
  genero: {
    type: Schema.Types.ObjectId,
    ref: "Genero",
    required: [true, "El género es requerido"],
  },
  director: {
    type: Schema.Types.ObjectId,
    ref: "Director",
    required: [true, "El director es requerido"],
  },
  productora: {
    type: Schema.Types.ObjectId,
    ref: "Productora",
    required: [true, "La productora es requerida"],
  },
  tipo: {
    type: Schema.Types.ObjectId,
    ref: "Tipo",
    required: [true, "El tipo es requerido"],
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  fechaModificacion: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Recurso", RecursoSchema);
