const { request, response } = require("express");

const testGet = (req = request, res = response) => {
  console.log(req.query);
  return res.json({ msj: "Ok" });
};

module.exports = { testGet };
