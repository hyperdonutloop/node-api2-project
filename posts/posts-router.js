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

// POST request to create a post
// if title or contents is missing - 404 + error message
// valid - 201
// error - 500 + error message
router.post('/', (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({ errorMessage: 'Please provide title and content for the post.' })
  } else {
    Posts.insert(req.body)
    .then(post => {
     res.status(201).json(post)
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'There was an error while saving post to database.', error })
    })
  }
})

// POST request to add comment to specified blog post
// 404 - id not found
// 400 - request body is missing text property
// 201- created
// 500 - error while saving

router.post('/:id/comments', (req, res) => {
  const text = req.body;

  if (!text) {
    res.status(400).json({ errorMessage: 'Please provide text for the comment' });
  } else {
    Posts.findById(req.params.id)
    .then(post => {
      if(post) {
        text.post_id = req.params.id
        Posts.insertComment(text)
        .then(newComment => {
          Posts.findCommentById(newComment.id)
          .then(comment => {
            res.status(201).json(comment)
          })
        })
      } else {
        res.status(404).json({ errorMessage: 'error message'});
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'There was an error while saving comment to database.', error });
    })
  }
})

// DELETE - removes post with specified ID and returns deleted post object
// 404 - id not found + error message
// 500 - error removing post + error message

router.delete('/:id', (req, res) => {
  Posts.remove(req.params.id)
  .then(post => {
    if(post) {
      res.status(200).json({ message: 'The Post has been destroyed!'})
    } else {
      res.status(404).json({ errorMessage: 'The Post with the specified ID does not exist.' });
    }
  })
  .catch(error => {
    res.status(500).json({ errorMessage: 'The post could not be removed', error });
  });
});


module.exports = router;