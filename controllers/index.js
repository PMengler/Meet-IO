// Basic import and export of api routes for rest of project to use
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-route');
const dashboardRoutes = require('./dashboard-route');
//const googleRoutes = require('./google-api');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
// router.use('/google-api', googleRoutes);

module.exports = router;
