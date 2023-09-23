const Genero = require("../models/genero");
const { request, response } = require("express");

const createGenero = async (req = request, res = response) => {
  // Destructurar los elementos a enviar
  const { nombre, descripcion } = req.body;

  try {
    const generoDB = await Genero.findOne({ nombre: nombre });

    if (generoDB) {
      return res.status(400).json({ msj: "Ya existe" });
    }

    // Cuando la clave es igual al valor se puede colocar solo la clave
    const datos = {
      nombre,
      descripcion,
    };

    // Se instancia un nuevo objeto genero
    const genero = new Genero(datos);
    // Se guardan los datos en genero
    await genero.save();

    return res.status(201).json(genero);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

module.exports = { createGenero };

/**
 * [x] Crear un género
 * [] Consultar todos los géneros
 * [] Consultar género por id
 * [] Actualizar un género
 * [] Borrar un género
 *
 * $ Datos
 * $ nombre, estado, fechaCreacion, fechaModificacion, descripcion
 *
 */
