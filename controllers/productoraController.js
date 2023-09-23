const Productora = require("../models/productora");
const { request, response } = require("express");

const createProductora = async (req = request, res = response) => {
  // Destructurar los elementos a enviar
  const { nombre, slogan, descripcion } = req.body;

  try {
    const productoraDB = await Productora.findOne({ nombre });

    if (productoraDB) {
      return res.status(400).json({ msj: `La productora ${nombre} ya existe` });
    }

    // Cuando la clave es igual al valor se puede colocar solo la clave
    const datos = {
      nombre,
      slogan,
      descripcion,
    };

    // Se instancia un nuevo objeto productora
    const productora = new Productora(datos);
    console.log(req.body);
    // Se guardan los datos en productora
    await productora.save();

    return res.status(201).json(productora);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

module.exports = { createProductora };
