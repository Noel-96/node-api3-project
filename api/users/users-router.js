const express = require('express');
const users = require("./users-model")
const posts = require("../posts/posts-model")
const { logger, validateUserId, validateUser,  validatePost} 
= require("../middleware/middleware")

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS

	users.get()
  .then((users) => {
    res.status(200).json({message: `Welcome ${process.env.COHORT}`,
		fact: process.env.FUN_FACT || "I have no fun facts",
		port: process.env.PORT, })//users)
  })
  .catch((error) => {
    next(error)
  })
});

router.get('/:id', validateUserId() , (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
});

router.post('/', validateUser(),  (req, res, next ) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  users.insert(req.body)
		.then((user) => {
			res.status(201).json(user)
		})
		.catch(next)
});

router.put('/:id', validateUserId() , validateUser(), (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  users.update(req.params.id, req.body)
  .then((user) => {
    res.status(200).json(user)
  })
  .catch(next)
});

router.delete('/:id', validateUserId(), (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  users.remove(req.params.id)
  .then((user) => {
    res.status(200).json({
      message: "The post has been deleted"
  })
  })
  .catch(next)
});


router.get('/:id/posts', validateUserId() ,  (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  users.getUserPosts(req.params.id)
  .then((posts) => {
    res.status(200).json(posts)
  })
  .catch((error) => {
    next(error)
  })

});

router.post('/:id/posts', validateUserId(),validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  posts.insert( req.body)
  .then((user) => {
    res.status(201).json(user)
  })
  .catch(next)
});

// do not forget to export the router
module.exports = router