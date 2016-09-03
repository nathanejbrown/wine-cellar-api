const express = require('express');
const router = express.Router();
const queries = require('../db/queries.js');
const db = require ('../db/connection.js');

router.get('/', function (req, res, next) {
  queries.getAll('wines', function (err, result) {
    if (err) {
      next(err);
    } else {
      res.send(result);
    }
  });
});

router.get('/:id', function (req, res, next) {
  const wineId = req.params.id;
  queries.getOne('wines', wineId, function (err, result) {
    if (err) {
      next(err);
    } else if (result.length) {
      res.status(200).json({
        wine: result
      });
    } else {
      res.send('No wines found.');
    }
  });
});

router.post('/', function (req, res, next) {
  const newWine = {
    name: req.body.name,
    region: req.body.region,
    year: req.body.year,
    price: req.body.price,
    notes: req.body.notes,
    rating: req.body.rating
  };
  queries.postOne('wines', newWine, function (err, result) {
    if (err) {
      next(err);
    } else {
      res.status(200).json({
        wine: result
      });
    }
  });
});

router.put('/:id', function (req, res, next) {
  var wineId = req.params.id;
  var update = {
    name: req.body.name || null,
    region: req.body.region || null,
    year: parseInt(req.body.year) || null,
    price: req.body.price || null,
    notes: req.body.notes || null,
    rating: parseInt(req.body.rating) || null
  }
  queries.updateOne('wines', wineId, update, function (err, result) {
    if (err) {
      next(err);
    } else {
      res.status(200).json({
        wine: result
      });
    }
  });
});

router.delete('/:id', function (req, res, next) {
  var wineId = req.params.id;
  queries.deleteOne('wines', wineId, function(err, result) {
    if (err) {
      next(err);
    } else {
      res.status(200).json({
        message: 'Wine deleted!'
      });
    }
  });
});

module.exports = router;
