const express = require("express");
const dotenv = require("dotenv").config();
const { mongoConnection } = require("./database/configuration");
const testRoutes = require("./routes/test");

const generoRoute = require("./routes/generoRoute");
const directorRoute = require("./routes/directorRoute");
const productoraRoute = require("./routes/productoraRoute");
const tipoRoute = require("./routes/tipoRoute");
const recursoRoute = require("./routes/recursoRoute");

const api = express();

api.use(express.json());

// Conectar a la base de datos MongoDB
mongoConnection();

// Middleware para configurar las cabeceras CORS
api.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Rutas para las pruebas API v1
api.use("/api/v1/tests", testRoutes);

// * Géneros
api.use("/api/v1/generos", generoRoute);

// * Director
api.use("/api/v1/directores", directorRoute);

// * Productora
api.use("/api/v1/productoras", productoraRoute);

// * Tipo
api.use("/api/v1/tipos", tipoRoute);

// * Recurso
api.use("/api/v1/recursos", recursoRoute);

module.exports = api;
