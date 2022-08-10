var express=require('express')
var app=express();
var mongo = require("mongodb").MongoClient
var url="mongodb://127.0.0.1:27017/stud"

app.get("/", (req,res)=>{

    res.sendFile(__dirname+"/index.html")
} )

app.get("/getdata",(req,res)=>{

 var data=req.query
    
 mongo.connect(url,(err,db)=>{

    db.collection("students").insert(data,(err,result)=>{
        res.send(JSON.stringify(result))
    });

 })


})

app.get("/viewdata",(req,res)=>{

 
    var query={marks:{$lt:'20'}}

    mongo.connect(url,(err,db)=>{
        if (!err) {
            
            db.collection("students").find(query).toArray((err,result)=>{
                if (!err) {
                    
                    res.send(JSON.stringify(result))
                }
    
            })
        }

    })



})

app.listen(3000,()=> console.log("running"))