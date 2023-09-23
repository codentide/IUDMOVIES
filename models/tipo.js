const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TipoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del tipo es requerido"],
    minlength: 1,
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

module.exports = model("Tipo", TipoSchema);
