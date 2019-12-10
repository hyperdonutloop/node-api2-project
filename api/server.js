const express = require('express');

const server = express();

const postRouter = require('../posts/posts-router.js');

server.use(express.json());

server.get('/', (req, res) => {
  res.send('This is my Node Project 2')
});

server.use('/api/posts', postRouter)

module.exports = server;