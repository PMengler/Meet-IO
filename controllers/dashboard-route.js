const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Event } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  Event.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: [
      'id',
      'title',
      'description',
      'start_time',
      'end_time',
      'date',
    ],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbEventData) => {
      const posts = dbEventData.map((event) => event.get({ plain: true }));
      res.render('dashboard', { events, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Event.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      'id',
      'title',
      'description',
      'start_time',
      'end_time',
      'date',
    ],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbEventData) => {
      if (!dbEventData) {
        res.status(404).json({ message: 'No Event found with this id' });
        return;
      }

      const event = dbEventData.get({ plain: true });
      res.render('edit-event', { event, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/new', (req, res) => {
  res.render('new-event');
});

module.exports = router;
