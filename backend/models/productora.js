const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProductoraSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre de la productora es requerido"],
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
  slogan: {
    type: String,
  },
  descripcion: {
    type: String,
  },
});

module.exports = model("Productora", ProductoraSchema);
