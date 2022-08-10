const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017"
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/getData', (req, res) => {
    const data = req.body;
    mongo.connect(url, (err, db) => {
        if (err) {
            return res.send(err)
        }
        var collection = db.collection('students');
        collection.insert(data).toArray((err, result) => {
            if (err) {
                return res.send(err)
            }
            res.send(JSON.stringify(result));

        })
    })
})

app.get('/getData', (req, res) => {
    const query = req.query;
    mongo.connect(url, (err, db) => {
        if (err) {
            return res.send(err)
        }
        var collection = db.collection('students');
        collection.find(query).toArray((err, result) => {
            if (err) {
                return res.send(err)
            }
            var text = ""
            result.array.forEach(element => {
                text+=JSON.stringify(element)
            });
            res.send(text);

        })
    })
})