const mongoose = require("mongoose");

const mongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Conexión exitosa a la base de datos");
  } catch (err) {
    console.error("Error de conexión a la base de datos:", err);
    throw new Error("Error de conexión a la base de datos");
  }
};

module.exports = { mongoConnection };
