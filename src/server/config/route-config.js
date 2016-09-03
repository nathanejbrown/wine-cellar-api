(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const wineRoutes = require('../routes/wines');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/api/wines/', wineRoutes);

  };

})(module.exports);
