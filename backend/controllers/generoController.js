const mongoose = require("mongoose");
const Genero = require("../models/genero");
const { request, response } = require("express");

//$ POST - Crear genero

const createGenero = async (req = request, res = response) => {
  const { nombre, descripcion, estado } = req.body;

  try {
    const generoDB = await Genero.findOne({ nombre });

    if (generoDB) {
      return res.status(400).json({ msj: "Ya existe" });
    }
    const datos = {
      nombre,
      descripcion,
      estado,
    };

    const genero = new Genero(datos);
    await genero.save();

    return res.status(201).json(genero);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

//$ GET, Consultar todos los generos

const getGeneros = async (req = request, res = response) => {
  try {
    const generos = await Genero.find();

    return res.status(200).json(generos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

//$ GET - Consultar genero por ObjectID

const getGeneroByID = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    // Valida el ObjectID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }

    const genero = await Genero.findById(id);

    if (!genero) {
      return res.status(404).json({ msj: "Género no encontrado" });
    }

    return res.status(200).json(genero);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

//$ PUT - Actualizar genero

const updateGenero = async (req = request, res = response) => {
  // Recoge el id por el params
  const { id } = req.params;
  // Recoge los elementos pertinentes del body
  const { nombre, estado, descripcion } = req.body;

  try {
    // Valida el objectID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }

    // Busca el elemento con el id
    const genero = await Genero.findById(id);

    if (!genero) {
      return res.status(404).json({ msj: "Género no encontrado" });
    }

    genero.fechaModificacion = new Date();
    genero.nombre = nombre || genero.nombre;
    if (estado !== undefined && estado !== null) {
      genero.estado = estado;
    }
    genero.descripcion = descripcion || genero.descripcion;

    await genero.save();

    return res.status(200).json(genero);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

//$ DELETE - Borrar genero

const deleteGenero = async (req, res) => {
  // Recoge el objectID
  const { id } = req.params;

  try {
    //
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }
    const genero = await Genero.findByIdAndDelete(id);
    if (!genero) {
      return res.status(404).json({ msj: "Género no encontrado" });
    }
    return res.status(200).json({ msj: "Género eliminado con exito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

module.exports = {
  createGenero,
  getGeneros,
  getGeneroByID,
  updateGenero,
  deleteGenero,
};

/**
 * [x] Crear un género
 * [x] Consultar todos los géneros
 * [x] Actualizar un género
 * [x] Borrar un género
 */
