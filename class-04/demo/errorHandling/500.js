'use strict';

function handle500(err, req, res, next) {
  const error = err.message ? err.message : err;
  // throw new Error({message: "nice try you lose"})
  // throw new Error("you were supposed to give me your name")
  const errorObject = {
    status: 500,
    message: error,
  };
  res.status(500).json(errorObject);
}

module.exports = handle500;
