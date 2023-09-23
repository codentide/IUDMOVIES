const Director = require("../models/director");
const { request, response } = require("express");

const createDirector = async (req = request, res = response) => {
  const { nombre } = req.body;

  try {
    const directorDB = await Director.findOne({ nombre });

    if (directorDB) {
      return res.status(400).json({ msj: "Ya existe" });
    }

    const datos = {
      nombre,
    };

    const director = new Director(datos);

    console.log(req.body);

    await director.save();
    return res.status(201).json(director);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

module.exports = { createDirector };

/**
 * [] Crear uno
 * [] Consultar todos
 * [] Consultar uno por id
 * [] Actualizar uno
 * [] Borrar uno
 *
 * $ Datos
 * $ nombre, estado, crea, modi
 *
 */
