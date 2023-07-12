'use strict';

// import the stuff we need
// express router - express
const express = require('express');
const { People } = require('../models/index.js');
// const { People } from our model index CAPITAL P

// the router method is the umbrella for all things having to do with the /people

const router = express.Router();

// RESTful route declations
router.get('/people', getPeople); // get all records from people table
router.get('/people/:id', getOnePerson); // get one person record back based on ID
router.post('/people', createPerson); // creates a single person record
router.put('/people/:id', updatePerson); // updates a single person record
router.delete('/people/:id', deletePerson); // deletes a single record

// route handlers - all async because database
async function getPeople(req, res) {
  // search the db and return all peoples
  let allPeople = await People.findAll();
  // console.log(People);
  res.status(200).json(allPeople);
}

async function getOnePerson(req, res) {
  const id = parseInt(req.params.id);
  let retrievedPerson = await People.findOne({ where: { id: id } });
  res.status(200).json(retrievedPerson);
}

async function createPerson(req, res) {
  let newPerson = req.body;
  // ppeople have first and last names, we are assuming that anyone that posts to our route knows that people {firstName: "blah", lastName: "blah"}
  let savedPerson = await People.create(newPerson);
  res.status(200).json(savedPerson);
}

async function updatePerson(req, res) {
  const id = parseInt(req.params.id);
  const updatedPersonObj = req.body;
  // find current rec associated with that person
  let retrievedPerson = await People.findOne({ where: { id: id } });
  // update the record
  let updatedPerson = await retrievedPerson.update(updatedPersonObj);
  res.status(200).json(updatedPerson);
}

async function deletePerson(req, res) {
  const id = parseInt(req.params.id);
  let deletePerson = await People.destroy({ where: { id } });
  res.status(204).json(deletePerson); //{}
}

module.exports = router;
