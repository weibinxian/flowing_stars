const express = require('express');
const router = express.Router({mergeParams: true});
const auth = require('./helpers/auth');
const Star = require('../models/star');
const Post = require('../models/post');

router.get('/new', auth.requireLogin, (req, res, next) => {
  Star.findById(req.params.starId, function(err, star) {
    if(err) { console.error(err) };

    res.render('posts/new', { star:star });
  });
});

router.post('/', auth.requireLogin, (req, res, next) => {
  Star.findById(req.params.starId, function(err, star) {
    if(err) { console.error(err) };

    

    let post = new Post({
      body:req.body.body, 
    loginname:req.session.userId});

    console.log(post.body);
    console.log(post.loginname)
    
    post.star = star;

    post.save(function(err, post) {
      if(err) { console.error(err) };
    
      return res.redirect(`/stars/${star._id}`);
    });
  });
})



module.exports = router;