const db = require('./connection.js');

exports.getAll = function (tableName, callback) {
  db.any(`SELECT * FROM ${tableName}`, [true])
  .then((data) => {
    callback(null, data);
  }).catch((err) => {
    callback(err);
  });
};

exports.getOne = function (tableName, itemId, callback) {
  db.any(`SELECT * FROM ${tableName} WHERE id = ${itemId}`, [true])
  .then(function(data) {
    callback(null, data);
  }).catch(function(err) {
    callback(err);
  });
};

exports.postOne = function (tableName, newItem, callback) {
  db.none(`INSERT INTO ${tableName} (name, region, year, price, notes, rating) VALUES ('${newItem.name}', '${newItem.region}', ${newItem.year}, ${newItem.price}, '${newItem.notes}', ${newItem.rating})`, [true])
  .then(function() {
    console.log(newItem);
    callback(null, newItem);
  }).catch(function(err) {
    callback(err);
  });
};

exports.updateOne = function (tableName, itemId, updates, callback) {
  var returnObject = {};
  db.any(`SELECT * FROM ${tableName} WHERE id = ${itemId}`, [true])
  .then(function(item) {
    item = item[0];
    for (var key in updates) {
      if (updates[key]) {
        returnObject[key] = updates[key];
      } else {
        returnObject[key] = item[key];
      }
    }
    for (key in returnObject) {
      db.any(`UPDATE ${tableName} SET ${key} = '${returnObject[key]}' WHERE id = ${itemId}`, [true]);
    }
    callback(null, returnObject);
  }).catch(function(err) {
    callback(err);
  });
};

exports.deleteOne = function(tableName, itemId, callback) {
  db.any(`DELETE from ${tableName} WHERE id = ${itemId}`)
  .then(function(data) {
    callback(null, data);
  }).catch(function(err) {
    callback(err);
  });
};

exports.getByYear = function(tableName, year, callback) {
  db.any(`SELECT * FROM ${tableName} WHERE year = ${year}`)
  .then(function(data) {
    callback(null, data);
  }).catch(function(err) {
    callback(err);
  });
};
