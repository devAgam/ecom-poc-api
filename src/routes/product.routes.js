const express = require("express"),
  app = express.Router();
const functions = require("../functions/product.functions");

const joi = require("joi");

app.get("/", async (req, res) => {
  const result = await functions.getAll();
  res.status(result.status).send(result.data);
});

const newProductValidator = joi.object({
  productName: joi.string().required().max(100),
  productDescription: joi.string().required().max(100),
});

app.post("/", async (req, res) => {
  const { error, value } = newProductValidator.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const result = await functions.create(value);
  res.status(result.status).send(result.data);
});

module.exports = app;
