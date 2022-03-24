const express = require("express");
const artModel = require("./model");
const app = express();
let cors = require('cors')
app.use(cors())
app.use(express.json())

const { v4: uuidv4 } = require('uuid');

let uidUser = false

function middleWare(req, res, next){
  
  if(req.body.uid == false){uidUser = uuidv4()}
  else{uidUser = req.body.uid}
  next()
}

app.post('/blog/articles',middleWare, (req, res, next) => {

  
  const article = new artModel({
    ...req.body,
    // uid:uidUser
    
  });
  
  article.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !', uid:uidUser}))
    .catch(error => res.status(400).json({ error }));
});

app.get("/blog", async (request, response) => {
    const arts = await artModel.find({});
    
    try {
      response.send(arts);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  function warioWare(req, res, next){
console.log(req.body)

    artModel.findOne({_id: req.params.id}),(err, document)=>{
      if(req.body.uid === document.uid){
        next()
      } else {
        res.status(403).json()
      }
      
    }
  }



  app.delete('/blog/:id',warioWare, (req, res, next) => {
    artModel.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});
   
app.put('/blog/:id',warioWare, (req, res, next) => {

  artModel.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
          .then(() => res.status(201).json({ message: 'Article modifié !'}))
          .catch(error => res.status(400).json({ error }));
      }
  );



  module.exports = app;