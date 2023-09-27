const mongoose = require("mongoose");
const Recurso = require("../models/recurso");
const { request, response } = require("express");

//$ POST - Crear genero
const createRecurso = async (req = request, res = response) => {
  const {
    serial,
    titulo,
    sinopsis,
    url,
    portada,
    anioEstreno,
    genero,
    director,
    productora,
    tipo,
  } = req.body;

  try {
    const existingRecurso = await Recurso.findOne({ serial });

    if (existingRecurso) {
      return res
        .status(400)
        .json({ msj: `El recurso con serial ${serial} ya existe` });
    }

    const recurso = new Recurso({
      serial,
      titulo,
      sinopsis,
      url,
      portada,
      anioEstreno,
      genero,
      director,
      productora,
      tipo,
    });

    await recurso.save();

    return res.status(201).json(recurso);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error.message });
  }
};

//$ GET, Consultar todos los generos
const getRecursos = async (req = request, res = response) => {
  try {
    const recursos = await Recurso.find();

    return res.status(200).json(recursos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error.message });
  }
};

//$ GET - Consultar genero por ObjectID
const getRecursoByID = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }

    const recurso = await Recurso.findById(id);

    if (!recurso) {
      return res.status(404).json({ msj: "Recurso no encontrado" });
    }

    return res.status(200).json(recurso);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error.message });
  }
};

//$ PUT - Actualizar genero
const updateRecurso = async (req = request, res = response) => {
  const { id } = req.params;
  const {
    serial,
    titulo,
    sinopsis,
    url,
    portada,
    anioEstreno,
    genero,
    director,
    productora,
    tipo,
  } = req.body;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }

    const recurso = await Recurso.findById(id);

    if (!recurso) {
      return res.status(404).json({ msj: "Recurso no encontrado" });
    }

    recurso.fechaModificacion = new Date();
    recurso.serial = serial || recurso.serial;
    recurso.titulo = titulo || recurso.titulo;
    recurso.sinopsis = sinopsis || recurso.sinopsis;
    recurso.url = url || recurso.url;
    recurso.portada = portada || recurso.portada;
    recurso.anioEstreno = anioEstreno || recurso.anioEstreno;
    recurso.genero = genero || recurso.genero;
    recurso.director = director || recurso.director;
    recurso.productora = productora || recurso.productora;
    recurso.tipo = tipo || recurso.tipo;

    await recurso.save();

    return res.status(200).json(recurso);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error.message });
  }
};

//$ DELETE - Borrar recurso

const deleteRecurso = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }

    const recurso = await Recurso.findByIdAndDelete(id);

    if (!recurso) {
      return res.status(404).json({ msj: "Recurso no encontrado" });
    }

    return res.status(200).json({ msj: "Recurso eliminado con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error.message });
  }
};

module.exports = {
  createRecurso,
  getRecursos,
  getRecursoByID,
  updateRecurso,
  deleteRecurso,
};
