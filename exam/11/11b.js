// (b)	Create an Attendance Management system using Nodejs Express and Mongo for creating student database 
// and display student’s whose attendance is  below 75% (Use Appropriate fields)



const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient;
const app = express();
const url = 'mongodb://127.0.0.1:27017/attendence';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post("/addData", (req, res) => {
    var data = req.body;
    mongo.connect(url, (err, db) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        var percentage = ((parseInt(data.present) / parseInt(data.total)) * 100);
        data.percentage = percentage;
        var collection = db.collection('students');
        collection.insert(data, (err, result) => {
            if (err) {
                res.send(err);
            }
            else {
                res.header("content-type", "text/html");
                res.send("Data Inserted<br>" + JSON.stringify(result));
            }
        })
    })
})

app.get("/viewData", (req, res) => {
    mongo.connect(url, (err, db) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        var collection = db.collection('students');
        collection.find({ percentage: { $lt: 75 } }).toArray((err, result) => {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            if (result.length == 0) {
                return res.send("No Record Found");
            }
            var text = "<h2>Student With attendence less the 75%</h2> <br>";
            result.forEach(element => {
                text += "<br>Name: " + element.name + "<br>";
                text += "USN: " + element.usn + "<br>";
                text += "SUB Code: " + element.subCode + "<br>";
                text += "Attendence: " + element.percentage + "<br>";
            })
            res.send(text);

        });
    })
})

app.listen(3000, () => console.log("App running on port 3000"));