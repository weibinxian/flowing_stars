const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('./helpers/auth')
const Star = require('../models/star');

//Users index
router.get('/', auth.requireLogin, (req, res, next) => {
  User.find({}, 'username', function(err, users) {
    if(err) {
      console.error(err);
    } else {
      res.render('users/index', { users: users });
    }
  });
});

// Users new
router.get('/new', (req, res, next) => {
  res.render('users/new');
})

// Users create
router.post('/', (req, res, next) => {
  const user = new User(req.body);

  user.save(function(err, user) {
    if(err) console.log(err);
    return res.redirect('/');
  });
})
//user profile
router.get('/profile', auth.requireLogin, (req, res, next) => {

    Star.find({username: res.locals.currentUserName}, (err, stars) => {
    res.render('users/show', { stars});
    })
  })

module.exports = router;