const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const {randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

const posts = {}

app.route('/posts')
    .get((_req, res) => {
        res.send(posts)
    })
    .post((req, res) => {
        const id = randomBytes(4).toString('hex');
        const title = req.body.title;

        posts[id] = {
            id, title
        };

        res.status(201).send(posts[id]);
    });

app.listen(process.env.PORT || 3000, () => {
    console.log(`running: http://localhost:${process.env.PORT}`)
})