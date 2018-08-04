const express = require('express');
const router = express.Router();
const posts = require('./posts');

const auth = require('./helpers/auth');
const Star = require('../models/star');


const Post = require('../models/post');
// stars index
// router.get('/', (req, res, next) => {
//   Star.find({}, 'starname', function(err, stars) {
//     if(err) {
//       console.error(err);
//     } else {
//       res.render('stars/index', { stars });
//     }
//   });
// });

// send the json of all the star's infomation
router.get('/', (req, res, next) => {
  Star.find({},  function(err, stars) {
    if(err) {
      console.error(err);
    } else {
      const number = Math.floor(Math.random() * stars.length)



      res.redirect('/stars/'+stars[number]._id)
  
    }
  });
});
// stars new
router.get('/new', auth.requireLogin, (req, res, next) => {
  res.render('stars/new');
});

// stars show
router.get('/:id', auth.requireLogin, (req, res, next) => {
  Star.findById(req.params.id, function(err, star) {
    if(err) { console.error(err) };
    Post.find({ star:star }).populate('loginname').exec(function(err, posts) {
      if(err) { console.error(err) };
    res.render('stars/show', { star, posts });
  });
});
});

// stars edit
router.get('/:id/edit', auth.requireLogin, (req, res, next) => {
  // TODO
});

// stars create
router.post('/', auth.requireLogin, (req, res, next)=>{
  let star = new Star(req.body);
  // console.log(req.session.username);
  star.username= req.session.username;
  star.save(function(err, star) {
    if(err) { console.error(err) };
    // return res.redirect(`/stars?id=${star._id}`);
    
    return res.redirect('/stars');
    
  });
});

// stars update
router.post('/:id', auth.requireLogin, (req, res, next) => {
  Star.findByIdAndUpdate(req.params.id, req.body, function(err, star) {
    if(err) { console.error(err) };

    res.redirect('/stars/' + req.params.id);
  });
});







router.use('/:starId/posts', posts);
module.exports = router;
