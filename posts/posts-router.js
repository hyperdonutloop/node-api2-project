const express = require('express');

const router = express.Router();

const Posts = require('../data/db.js');

router.use(express.json());

// GET REQUEST 
// - 500 for error
// - error message 
router.get('/', (req, res) => {
  Posts.find(req.query)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(error => {
    res.status(500).json({ errorMessage: 'The posts information could not be retrieved'})
  })
})




module.exports = router;