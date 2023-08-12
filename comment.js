// Create web server
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

// Import data
const data = require('./data.json');

// Set view engine
app.set('view engine', 'pug');

// Set static folder
app.use(express.static(__dirname + '/public'));

// Set routes
app.get('/', (req, res) => {
    res.render('index', {data: data.projects});
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res) => {
    res.render('project', {
        project: data.projects[req.params.id],
        id: req.params.id
    });
});

// Error handling
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    console.log('Error: ', err.message, 'Status: ', err.status);
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    console.log('Error: ', err.message, 'Status: ', err.status);
    res.status(err.status);
    res.render('error');
});

// Listen to port
app.listen(PORT, () => {
    console.log(`The application is running on localhost:${PORT}`);
});