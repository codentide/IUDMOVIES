const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const GeneroSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del género es requerido"],
    minlength: 1,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  fechaModificacion: {
    type: Date,
    default: Date.now,
  },
  descripcion: {
    type: String,
  },
});

module.exports = model("Genero", GeneroSchema);
