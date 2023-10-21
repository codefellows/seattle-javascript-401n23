'use strict';

const express = require('express');

const { todoCollection } = require('../models/index.model');

const router = express.Router();

// RESTful route declarations
router.get('/todo', getTodos);
router.get('/todo/:id', getOneTodo);
router.post('/todo', createTodo);
router.put('/todo/:id', updateTodo);
router.delete('/todo/:id', deleteTodo);

// route handlers
async function getTodos(req, res) {
  let allTodos = await todoCollection.read(null);
  res.status(200).json(allTodos);
}

async function getOneTodo(req, res) {
  let id = parseInt(req.params.id);
  let theTodo = await todoCollection.read(id);
  res.status(200).json(theTodo);
}

async function createTodo(req, res) {
  let obj = req.body;
  let newTodo = await todoCollection.create(obj);
  res.status(200).json(newTodo);
}

async function updateTodo(req, res) {
  let obj = req.body;
  let id = parseInt(req.params.id);
  let updatedTodo = await todoCollection.update(id, obj);
  res.status(200).json(updatedTodo);
}

async function deleteTodo(req, res) {
  let id = parseInt(req.params.id);
  let deletedTodo = await todoCollection.delete(id);
  res.status(204).json(deletedTodo);
}

module.exports = router;
