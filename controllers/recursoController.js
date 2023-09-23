const Recurso = require("../models/recurso");
const { request, response } = require("express");

const createRecurso = async (req = request, res = response) => {
  // Destructurar los elementos a enviar
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
    const recursoDB = await Recurso.findOne({ serial });

    if (recursoDB) {
      return res.status(400).json({ msj: `El recurso ${titulo} ya existe` });
    }

    // Crear un nuevo objeto recurso
    const recurso = new Recurso({
      serial,
      titulo,
      sinopsis,
      url,
      portada,
      anioEstreno,
      genero: genero,
      director: director,
      productora: productora,
      tipo: tipo,
    });

    console.log(req.body);
    // Se guardan los datos en recurso
    await recurso.save();

    return res.status(201).json(recurso);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

module.exports = { createRecurso };
