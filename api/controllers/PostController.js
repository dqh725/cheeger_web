/**
 * PostController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function(req, res) {
    Post.find(function foundPosts(err, posts) {
      if (err) return sails.log(err);
      // pass the array down to the /views/index.ejs page
      res.view({
        posts: posts
      });
    });
  },

  new: function (req, res) {
    return res.view('post/new.ejs');
  },

  create: function (req, res) {
    //req.method = 'POST'
    Post.create(req.params.all()).exec(function (err, post) {
      if ( err ) {
        return res.redirect('/post/new');
      }
      else {
        sails.log('Post\'s id is:', post.id);
        res.redirect('/post/show/' + post.id);
      }
    });
  },

  show: function (req, res, next) {
    Post.findOne(req.param('id'), function (err, post) {
      if ( err ) {
        return next(err);
      }
      else if (!post){
        return next(); 
      }
      else {
        res.view({ post: post });
      }
    });
  },

  edit: function (req, res) {
    Post.findOne(req.param('id'), function (err, post) {
      if ( err ) {
        return next(err);
      }
      else if (!post){
        return next(); 
      }
      else {
        res.view({ post: post });
      }
    });
  },

  update: function (req, res) {
     Post.update(req.param('id'), req.params.all(), function (err) {
      if (err) {
        return res.redirect('/post/edit/' + req.param('id'));
      }
      res.redirect('/post/show/' + req.param('id'));
    });
  },


  destroy: function(req, res, next) {

    Post.findOne(req.param('id'), function foundPost(err, post) {
      if (err) return next(err);

      if (!post) return next('Post doesn\'t exist.');

      Post.destroy(post.id, function postDestroyed(err) {
        if (err) return next(err);
      });
      res.redirect('/post');

    });
  },

};

