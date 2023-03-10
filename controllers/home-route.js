const router = require('express').Router();
const { User, Event } = require('../models');

router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/homepage');
    return;
  }
  res.render('login');
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/calendar', (req, res) => {
  res.render('calendar');
});

router.get('/homepage', (req, res) => {
  const username = req.session.username;
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
    username: username,
  });
});

router.get('/dashboard', (req, res) => {
  const username = req.session.username;
  res.render('dashboard', {
    loggedIn: req.session.loggedIn,
    username: username,
  });
});

module.exports = router;
