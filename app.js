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

app.listen(3000, () => {
   console.log(`App listening on port ${port}!`);
});
