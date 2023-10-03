const mongoose = require("mongoose");
const Director = require("../models/director");
const { request, response } = require("express");

//$ POST, crear un director

const createDirector = async (req = request, res = response) => {
  const { nombre, estado } = req.body;

  try {
    const directorDB = await Director.findOne({ nombre });

    if (directorDB) {
      return res.status(400).json({ msj: `El director '${nombre}' existe` });
    }

    const datos = {
      nombre,
      estado,
    };

    const director = new Director(datos);

    await director.save();

    return res.status(201).json(director);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

//$ GET, Consultar todos los directores

const getDirectores = async (req = request, res = response) => {
  try {
    const directores = await Director.find();

    return res.status(200).json(directores);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

//$ GET, Consultar directores por ObjectID

const getDirectorByID = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID inválido" });
    }
    const director = await Director.findById(id);
    if (!director) {
      return res.status(404).json({ msj: "Director no encontrado" });
    }
    return res.status(200).json(director);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

//$ PUT, Actualizar un director

const updateDirector = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombre, estado } = req.body;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }
    const director = await Director.findById(id);
    if (!director) {
      return res.status(404).json({ msj: "Director no encontrado" });
    }
    director.fechaModificacion = new Date();
    director.nombre = nombre || director.nombre;
    if (estado !== undefined && estado !== null) director.estado = estado;
    {
      await director.save();
      return res.status(200).json(director);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

//$ DELETE, eliminar un director

const deleteDirector = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }
    const director = await Director.findByIdAndDelete(id);

    if (!director) {
      return res.status(404).json({ msj: "Director no encontrado" });
    }

    return res.status(200).json({ msj: "Director eliminado con exito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

module.exports = {
  createDirector,
  getDirectores,
  getDirectorByID,
  updateDirector,
  deleteDirector,
};

/**
 * [x] Crear uno
 * [x] Consultar todos
 * [x] Consultar uno por id
 * [x] Actualizar uno
 * [] Borrar uno
 *
 * $ Datos
 * $ nombre, estado, crea, modi
 *
 */
