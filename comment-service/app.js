const express = require('express')
const dotenv = require('dotenv')
const {randomBytes} = require('crypto')
dotenv.config()
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json())

const commentsByPostId = {}

app.route('/posts/:id/comments')
    .get((req, res) => {
        res.send(commentsByPostId[req.params.id] || []);
    })
    .post((req, res) => {
        const commentsId = randomBytes(4).toString('hex');
        const {content} = req.body;
        const comments = commentsByPostId[req.params.id] || [];
       comments.push({
           id: commentsId,
           content
       })
        commentsByPostId[req.params.id] = comments;
        res.status(201).send(comments)
    });

app.listen(process.env.PORT || 3020, () => {
    console.log(`running: http://localhost:${process.env.PORT}/`)
})