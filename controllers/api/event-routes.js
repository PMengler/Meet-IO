const router = require('express').Router();
const { User, Event, Day } = require('../../models/');
const sequelize = require('../../config/connection');
const mustAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Event.findAll({
    attributes: [
      'id',
      'event_name',
      'description',
      'start_time',
      'end_time',
      'date',
      'user_id',
    ],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
    // include: [
    //   {
    //     model: Day,
    //     attributes: ['id', 'date'],
    //   },
    // ],
  })
    .then((dbEventData) => res.json(dbEventData.reverse()))
    .catch((err) => {
      console.log(err);
    });
});

router.get('/:id', (req, res) => {
  Event.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      'id',
      'event_name',
      'description',
      'start_time',
      'end_time',
      'date',
      'user_id',
    ],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: Day,
        attributes: ['id', 'date'],
      },
    ],
  })
    .then((dbEventData) => {
      if (!dbEventData) {
        res.status(404).json({ message: 'No event found with this id' });
        return;
      }
      res.json(dbEventData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Event.create({
    event_name: req.body.event_name,
    description: req.body.description,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    date: req.body.date,
    user_id: req.session.user_id,
  })
    .then((dbEventData) => res.json(dbEventData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', mustAuth, (req, res) => {
  Event.update(
    {
      event_name: req.body.event_name,
      description: req.body.description,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      date: req.body.date,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbEventData) => {
      if (!dbEventData) {
        res.status(404).json({ message: 'No event found with this id' });
        return;
      }
      res.json(dbEventData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Event.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbEventData) => {
      if (!dbEventData) {
        res.status(404).json({ message: 'No event found with this id' });
        return;
      }
      res.json(dbEventData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
