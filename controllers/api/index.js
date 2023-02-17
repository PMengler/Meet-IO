// Imports all our route files for single export
const router = require('express').Router();
const userRoutes = require('./user-routes');
const eventRoutes = require('./event-routes');
const socketRoutes = require('./socket-task-routes')

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/socket', socketRoutes);

module.exports = router;
