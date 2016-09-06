const express = require('express');
const router = express.Router();
const queries = require('../db/queries.js');
const db = require ('../db/connection.js');

router.get('/', function (req, res, next) {
  if (req.query.year) {
    next();
  } else {
    queries.getAll('wines', function (err, result) {
      if (err) {
        next(err);
      } else {
        res.send(result);
      }
    });
  }
});

router.get('/', function (req, res, next) {
  var year = req.query.year;
  queries.getByYear('wines', year, function (err, result) {
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
    name: req.body.name || 'None given',
    region: req.body.region || 'None given',
    year: parseInt(req.body.year) || 'None given',
    price: req.body.price || 'None given',
    notes: req.body.notes || 'None given',
    rating: parseInt(req.body.rating) || 'None given'
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
  };
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
