const express = require('express');

const router = express.Router();

const Posts = require('../data/db.js');

router.use(express.json());

// GET Request api/posts
// - 500 for error
// - error message 
router.get('/', (req, res) => {
  Posts.find(req.query)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(error => {
    res.status(500).json({ errorMessage: 'The posts information could not be retrieved' })
  })
})

// GET Request for post object with the specified id
// if post with id is not found return 404 with error message
// if there is error retrieving post return 500 and error message

router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
  .then(posts => {
    if (posts) {
      res.status(200).json(posts)
    } else {
      res.status(404).json({ errorMessage: 'The post with the specified ID does not exist.' })
    }
  })
  .catch(error => {
    res.status(500).json({ errorMessage: 'The post information could not be retrieved.', error })
  })
})

// GET request for comments
// 404 not found
// 500 error in retrieving

router.get('/:id/comments', (req, res) => {
  Posts.findCommentById(req.params.id)
  .then(posts => {
    if(posts) {
      res.status(200).json(posts)
    } else {
      res.status(404).json({ errorMessage: 'The post with the specified ID does not exist.' })
    }
  })
  .catch(error => {
    res.status(500).json({ errorMessage: 'The comments information could not be retrieved.', error })
  })
})

module.exports = router;