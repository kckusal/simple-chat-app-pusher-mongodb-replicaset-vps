const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const api = require('./routes/api');
const Pusher = require('pusher');

const pusher = new Pusher({
    appId: '890472',
    key: 'b17754f8854f59838893',
    secret: '78db5620fc5b6c96e1ab',
    cluster: 'us2',
    encrypted: true
});

const channel = 'msgs';

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);

mongoose.connect('mongodb://vps1/chatDb?replicaSet=myReplSet');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error:'));

db.once('open', () => {
  app.listen(8000, () => {
    console.log('Node server running on port 8000');
  });

  const msgCollection = db.collection('msgs');
  const changeStream = msgCollection.watch();
    
  changeStream.on('change', (change) => {
    console.log(change);
      
    if(change.operationType === 'insert') {
      const msg = change.fullDocument;
      pusher.trigger(
        channel,
        'inserted', 
        {
          id: msg._id,
          msg: msg.msg,
        }
      ); 
    } else if(change.operationType === 'delete') {
      pusher.trigger(
        channel,
        'deleted', 
        change.documentKey._id
      );
    }
  });
});
