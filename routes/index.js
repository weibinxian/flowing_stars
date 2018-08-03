const express = require('express');
const router = express.Router();
const User = require('../models/user');

// set layout variables
router.use((req, res, next) =>{
  res.locals.title = "Flowing Star";
  res.locals.currentUserId = req.session.userId;
  res.locals.currentUserName = req.session.username;

  next();
});

// home page
router.get('/', (req, res, next) => {
  res.render('index');
});

// login
router.get('/login', (req, res, next) => {
  
  res.render('login');
});

// POST login
router.post('/login', (req, res, next) => {
  User.authenticate(req.body.username, req.body.password, (err, user) => {
    if (err || !user) {
      const next_error = new Error("Username or password incorrect");
      next_error.status = 401;

      return next(next_error);
    } else {
      req.session.userId = user._id;
      req.session.username = req.body.username;
      return res.redirect('/stars/new') ;
    }
  });
});

// logout
router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) return next(err);
    });
  }

  return res.redirect('/login');
});

module.exports = router;