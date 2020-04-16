const express=require('express');
const mongoose=require('mongoose');
const app=express();
const server = require('./models/server');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.listen(3000);
mongoose.connect('mongodb://localhost/my_projects');

//BodyParser
  app.get('/',async function(req,res){
        var MongoClient = require('mongodb').MongoClient;
        const client = await MongoClient.connect('mongodb://localhost:27017');
        var db=client.db('my_projects');
        var collection=db.collection('servers');
        var items=await collection.find().toArray();
        res.send(items);
         
});
app.get('/:id',async function(req,res){
     var id=parseInt(req.params.id, 10);
    
    var MongoClient = require('mongodb').MongoClient;
    const client = await MongoClient.connect('mongodb://localhost:27017');
    var db=client.db('my_projects');
    var collection=db.collection('servers');
    var items=await collection.findOne({id:id});
    
    if(items){
        res.send(items);
    }
    else{
        res.sendStatus(404);
    }
    
   
});
app.post('/',async function(req,res){
    
  const  {name,id,Language,Framework}=req.body;
   const newserver=new server({
        name:name,
        id:id,
        Language:Language,
        Framework:Framework
       });
       var MongoClient = require('mongodb').MongoClient;
    const client = await MongoClient.connect('mongodb://localhost:27017');
    var db=client.db('my_projects');
    var collection=db.collection('servers');
    var item=await collection.findOne({ id:id });
    
    if(item){
        res.send("Id already exists");
    }
    else{
        newserver.save();
        res.send("Saved Successfully");
    }
    
   
});

app.get('/search/:id',async function(req,res){
    
   var MongoClient = require('mongodb').MongoClient;
   const client = await MongoClient.connect('mongodb://localhost:27017');
   var db=client.db('my_projects');
   var collection=db.collection('servers');
   var str=".*"+req.params.id+".*";
   
   var items=await collection.find({"name" : {$regex :str}}).toArray();
   
   if(typeof items !== 'undefined' && items.length > 0){
       res.send(items);
   }
   else{
       res.sendStatus(404);
   }
   
  
});

app.delete('/:id',async function(req,res){
    var id=parseInt(req.params.id, 10);
    var MongoClient = require('mongodb').MongoClient;
    const client = await MongoClient.connect('mongodb://localhost:27017');
    var db=client.db('my_projects');
    var collection=db.collection('servers');   
    var item=await collection.deleteOne({ id:id });
   
    if(item.deletedCount>0){
        res.send("Deleted Sucessfully");
    }
    else{
        res.sendStatus(404);
    }

});