const express = require('express');
const cors = require('cors');
const firebase = require('./firebase');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/ping', (req,res) => {
   res.send('pong');
});

app.post('/notify', (req,res) => {
   firebase.notify(req.body.token);
   res.status(200).end();
});

app.post('/subscribe', (req, res) => {
   firebase.subscribe(preq.body.token, req.body.topic);
   res.status(200).end();
});

app.post('/notify-many', (req,res) => {
   firebase.notifyMany(req.body.topic);
   res.status(200).end();
});

app.listen(3000, () => {
   console.log(`App listening on port ${port}!`);
});
