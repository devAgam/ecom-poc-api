const express = require("express"),
  app = express.Router();
const functions = require("../functions/order.functions");

const joi = require("joi");

app.get("/", async (req, res) => {
  const result = await functions.getAll();
  res.status(result.status).send(result.data);
});

const getByIdValidator = joi.object({
  id: joi.number().required(),
});

app.get("/:id", async (req, res) => {
  const { error, value } = getByIdValidator.validate(req.params);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const result = await functions.getById(value.id);
  res.status(result.status).send(result.data);
});

const createValidator = joi.object({
  orderDescription: joi.string().required(),
  products: joi.array().items(joi.number()).required(),
});

app.post("/", async (req, res) => {
  const { error, value } = createValidator.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const result = await functions.create(value);
  res.status(result.status).send(result.data);
});

const updateValidator = joi.object({
  id: joi.number().required(),
  name: joi.string().required(),
  description: joi.string().required(),
});

app.put("/:id", async (req, res) => {
  const { error, value } = updateValidator.validate({
    ...req.params,
    ...req.body,
  });
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const result = await functions.update(value.id, value);
  res.status(result.status).send(result.data);
});

const deleteValidator = joi.object({
  id: joi.number().required(),
});

app.delete("/:id", async (req, res) => {
  const { error, value } = deleteValidator.validate(req.params);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const result = await functions.delete(value.id);
  res.status(result.status).send(result.data);
});

module.exports = app;
