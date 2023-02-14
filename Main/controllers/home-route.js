const router = require('express').Router();
const { User, Event } = require('../models');

router.get('/', async (req, res) => {
  try {
    // req.session.loggedIn = true;
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else{
      res.render('homepage');
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/users", async (req, res) => {
  try {
    const userData = await User.findAll();
    const users = userData.map((user) => user.get({plain: true}));
    console.log(users)
    res.render("users", {users});
    // res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;
