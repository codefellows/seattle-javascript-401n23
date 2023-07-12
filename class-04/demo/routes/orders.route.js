'use strict';

const express = require('express');

const { orderCollection } = require('../models/index');

const router = express.Router();

// RESTful route declarations
router.get('/orders', getOrders);
router.get('/orders/:id', getOneOrder);
router.post('/orders', createOrder);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);

// route handlers
async function getOrders(req, res) {
  let allOrders = await orderCollection.read();
  res.status(200).json(allOrders);
}

async function getOneOrder(req, res) {
  let id = parseInt(req.params.id);
  let theOrder = await orderCollection.read(id);
  res.status(200).json(theOrder);
}

async function createOrder(req, res) {
  let obj = req.body;
  let newOrder = await orderCollection.create(obj);
  res.status(200).json(newOrder);
}

async function updateOrder(req, res) {
  let obj = req.body;
  let id = parseInt(req.params.id);
  let updatedOrder = await orderCollection.update(id, obj);
  res.status(200).json(updatedOrder);
}

async function deleteOrder(req, res) {
  let id = parseInt(req.params.id);
  let deletedOrder = await orderCollection.delete(id);
  res.status(204).json(deletedOrder);
}

module.exports = router;
