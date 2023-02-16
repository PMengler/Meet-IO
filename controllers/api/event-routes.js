const router = require('express').Router();
const { User, Event, Day } = require('../../models/');
const sequelize = require('../../config/connection');
const mustAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Event.findAll({
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
    include: [
      {
        model: Day,
        attributes: ['id', 'date'],
      },
    ],
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

router.post('/', mustAuth, (req, res) => {
  Event.create({
    title: req.body.title,
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
      title: req.body.title,
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

router.delete('/:id', mustAuth, (req, res) => {
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
