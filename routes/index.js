var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

//mongodb attachment
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var mongoUrl = 'mongodb://localhost:27017/kpp-lab2';
var mongo;

MongoClient
    .connect(mongoUrl)
    .then(function(db) {
        mongo = db;
    });


app.use('/static', express.static('public'));

app.get('/kpp-lab2', function(req, res, next) {
    res.render('index');
});

app.get('/tasks', function(req, res, next) {
    mongo
        .collection('tasks').find().toArray()
        .then(function(tasks) {
            res.send({tasks: tasks});
        });
});

app.delete('/task/:id', function (req, res, next) {
    mongo
        .collection('tasks').remove({ _id: new mongodb.ObjectID(req.params.id) })
        .then(function() {
            res.sendStatus(200);
        });
});

app.post('/task', function (req, res, next) {
    mongo
        .collection('tasks').insert({ name: req.body.name })
        .then(function() {
            res.sendStatus(200);
        });
});

module.exports = app;
app.listen(3001);