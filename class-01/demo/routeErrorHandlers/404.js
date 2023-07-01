'use strict';
// error handling functions
const pageNotFoundHandler = (req, res) => {
  res.status(404).send({
    error: 404,
    route: req.path,
    message: 'no data on this route',
  });
};
module.exports = pageNotFoundHandler;
