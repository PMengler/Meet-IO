const router = require('express').Router();
const { User, Event } = require('../models');

router.get('/', async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      res.redirect('/homepage');
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.get('/users', async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       include: {
//         model: Event,
//       },
//     });
//     const users = userData.map((user) => user.get({ plain: true }));
//     res.render('all', { users });
//     // res.status(200).json(userData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login', { loggedIn: req.session.loggedIn });
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/calendar', (req, res) => {
  res.render('calendar');
});

router.get('/homepage', (req, res) => {
  res.render('homepage');
});
module.exports = router;
