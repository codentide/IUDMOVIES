const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DirectorSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del director es requerido"],
    minlength: 1, // Asegura que el nombre tenga al menos una letra.
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
});

module.exports = model("Director", DirectorSchema);
