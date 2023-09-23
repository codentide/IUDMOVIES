const Tipo = require("../models/tipo");
const { request, response } = require("express");

const createTipo = async (req = request, res = response) => {
  // Destructurar los elementos a enviar
  const { nombre, descripcion } = req.body;

  try {
    const tipoDB = await Tipo.findOne({ nombre });

    if (tipoDB) {
      return res.status(400).json({ msj: `La tipo ${nombre} ya existe` });
    }

    // Cuando la clave es igual al valor se puede colocar solo la clave
    const datos = {
      nombre,
      descripcion,
    };

    // Se instancia un nuevo objeto tipo
    const tipo = new Tipo(datos);
    console.log(req.body);
    // Se guardan los datos en tipo
    await tipo.save();

    return res.status(201).json(tipo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

module.exports = { createTipo };
