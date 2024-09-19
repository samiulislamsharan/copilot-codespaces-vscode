// Create web server
// Start web server
// Define routes
// 1. /comments - GET - retrieve all comments
// 2. /comments - POST - add a comment
// 3. /comments/:id - GET - retrieve a comment
// 4. /comments/:id - PUT - update a comment
// 5. /comments/:id - DELETE - delete a comment

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create web server
const app = express();
app.use(bodyParser.json());

// Start web server
app.listen(3000, () => {
    console.log('Server has started');
});

// Define routes
// 1. /comments - GET - retrieve all comments
app.get('/comments', (req, res) => {
    fs.readFile('comments.json', (err, data) => {
        if (err) {
            res.status(500).send('An error occurred');
            return;
        }

        const comments = JSON.parse(data);
        res.send(comments);
    });
});

// 2. /comments - POST - add a comment
app.post('/comments', (req, res) => {
    const newComment = req.body;

    fs.readFile('comments.json', (err, data) => {
        if (err) {
            res.status(500).send('An error occurred');
            return;
        }

        const comments = JSON.parse(data);
        comments.push(newComment);

        fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('An error occurred');
                return;
            }

            res.send('Comment added');
        });
    });
});

// 3. /comments/:id - GET - retrieve a comment
app.get('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);

    fs.readFile('comments.json', (err, data) => {
        if (err) {
            res.status(500).send('An error occurred');
            return;
        }

        const comments = JSON.parse(data);
        const comment = comments.find((comment) => comment.id === id);

        if (!comment) {
            res.status(404).send('Comment not found');
            return;
        }

        res.send(comment);
    });
});

// 4. /comments/:id - PUT - update a comment
app.put('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedComment = req.body;

    fs.readFile('comments.json', (err, data) => {
        if (err) {
            res.status(500).send('An error occurred');
            return;
        }

        const comments = JSON.parse(data);
        const comment = comments.find((comment) => comment.id === id);

        if (!comment) {
            res.status(404).send('Comment not found');
            return;
        }

        const index = comments.indexOf(comment);
        comments[index] = updatedComment;

        fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('An error occurred');
                return;
            }

            res.send('Comment updated');
        });
    });
});

// 5. /comments/:id - DELETE - delete a comment
app.delete('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);

    fs.readFile('comments.json', (err, data) => {
        if (err) {
            res.status(500).send('An error occurred');
            return;
        }

        const comments = JSON.parse(data);
        const comment = comments.find((comment) => comment.id === id);

        if (!comment) {
            res.status(404).send('Comment not found');
            return;
        }

        const index = comments.indexOf(comment);
        comments.splice(index, 1);

        fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('An error occurred');
                return;
            }

            res.send('Comment deleted');
        });
    });
});