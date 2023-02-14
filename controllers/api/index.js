// Imports all our route files for single export
const router = require('express').Router();
const userRoutes = require('./user-routes');
const eventRoutes = require('./event-routes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);

module.exports = router;
