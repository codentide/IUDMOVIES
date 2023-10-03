const { default: mongoose } = require("mongoose");
const Tipo = require("../models/tipo");
const { request, response } = require("express");

//$ POST - Crear tipo

const createTipo = async (req = request, res = response) => {
  const { nombre, descripcion } = req.body;
  try {
    const tipoDB = await Tipo.findOne({ nombre });
    if (tipoDB) {
      return res.status(400).json({ msj: `El tipo ${nombre} ya existe` });
    }
    const datos = {
      nombre,
      descripcion,
    };
    const tipo = new Tipo(datos);
    await tipo.save();
    return res.status(201).json(tipo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

//$ GET, Consultar todos los tipos

const getTipos = async (req = request, res = response) => {
  try {
    const tipos = await Tipo.find();
    return res.status(200).json(tipos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

//$ GET - Consultar tipo por ObjectID

const getTipoByID = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }
    const tipo = await Tipo.findById(id);
    if (!tipo) {
      return res.status(404).json({ msj: "Tipo no encontrado" });
    }
    return res.status(200).json(tipo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

//$ PUT - Actualizar tipo

const updateTipo = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }
    const tipo = await Tipo.findById(id);
    if (!tipo) {
      return res.status(404).json({ msj: "Género no encontrado" });
    }

    tipo.fechaModificacion = new Date();
    tipo.nombre = nombre || tipo.nombre;
    tipo.descripcion = descripcion || tipo.descripcion;

    await tipo.save();

    return res.status(200).json(tipo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

//$ DELETE - Borrar tipo

const deleteTipo = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }
    const tipo = await Tipo.findByIdAndDelete(id);
    if (!tipo) {
      return res.status(404).json({ msj: "Tipo no encontrado" });
    }
    return res.status(200).json({ msj: "Tipo eliminado con éxito" });
  } catch (error) {
    return res.status(500).json({ msj: error });
  }
};

module.exports = { createTipo, getTipos, getTipoByID, updateTipo, deleteTipo };
