const express = require('express');
const app = express()
const mongo = require('mongodb').MongoClient;
const url = 'mongodb:/121.0.0.1:27017/cie_marks'
const bodyParser = require('body-parser')
const {json} = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/1b.html');
})

app.get('/getData', (req, res) => {
    const data = req.query
    mongo.connect(url, (err, db) => {
        if (err) {
            console.log(err);
            res.send(err);
            return 
        }
        db.collection('students').insert(data, (err, result) => {
            if (err) {
                console.log(err);
                res.send(err);
                return 
            }
            console.log(result);
            res.send(result);
        })
    })
})

app.get('/showData', (req, res) => {

    mongo.connect(url, (err, db) => {
        if (err) {
            console.log(err);
            res.send(err);
            return 
        }
        var query = {marks : {$lt : 20}}
        db.collection('students').find(query).toArray( (err, result) => {
            if (err) {
                console.log(err);
                res.send(err);
                return 
            }
            var ans = "<h1>List of Students</h1>";
            ans += "<ul>"
            result.forEach(element => {
                ans+="<li>"+JSON.stringify(element)+"</li>"
            });
            ans+="</ul>"
            console.log(ans);
            res.send(ans);
            db.close()
        })
    })
})

app.listen(3000, () => {
    console.log("backend connected")
})