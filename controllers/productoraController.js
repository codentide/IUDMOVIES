const mongoose = require("mongoose");
const Productora = require("../models/productora");
const { request, response } = require("express");

//$ POST - Crear productora

const createProductora = async (req = request, res = response) => {
  const { nombre, slogan, descripcion } = req.body;

  try {
    const productoraDB = await Productora.findOne({ nombre });

    if (productoraDB) {
      return res.status(400).json({ msj: `La productora ${nombre} ya existe` });
    }
    const datos = {
      nombre,
      slogan,
      descripcion,
    };

    const productora = new Productora(datos);
    console.log(req.body);
    await productora.save();
    return res.status(201).json(productora);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

//$ GET, Consultar todas las productoras

const getProductoras = async (req = request, res = response) => {
  try {
    const productoras = await Productora.find();

    return res.status(200).json(productoras);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

//$ GET - Consultar productora por ObjectID

const getProductoraByID = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }

    const productora = await Productora.findById(id);

    if (!productora) {
      return res.status(404).json({ msj: "Productora no encontrada" });
    }

    return res.status(200).json(productora);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

//$ PUT - Actualizar productora

const updateProductora = async (req = request, res = response) => {
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
    const productora = await Productora.findById(id);

    if (!productora) {
      return res.status(404).json({ msj: "Productora no encontrada" });
    }

    productora.fechaModificacion = new Date();
    productora.nombre = nombre || productora.nombre;
    productora.descripcion = descripcion || productora.descripcion;
    productora.descripcion = descripcion || productora.descripcion;
    if (estado !== undefined && estado !== null) {
      productora.estado = estado;
    }

    await productora.save();

    return res.status(200).json(productora);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

//$ DELETE productora

const deleteProductora = async (req, res) => {
  // Recoge el objectID
  const { id } = req.params;

  try {
    //
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msj: "ID no válido" });
    }
    const productora = await Productora.findByIdAndDelete(id);
    if (!productora) {
      return res.status(404).json({ msj: "Productora no encontrado" });
    }
    return res.status(200).json({ msj: "Productora eliminado con exito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msj: error });
  }
};

module.exports = {
  createProductora,
  getProductoras,
  getProductoraByID,
  updateProductora,
  deleteProductora,
};

/**
 * [x] Crear uno
 * [x] Consultar todos
 * [x] Actualizar uno
 * [x] Borrar uno
 */
