const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
   res.send('hello world');
});

app.post('/notification', (req,res) => {
   var token=req.body.token;
   console.log(`token = ${token}`);
   res.status(200).end();
 });

app.listen(3000, () => {
   console.log(`App listening on port ${port}!`);
});
