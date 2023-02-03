const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

// POST route
app.post('/express_backend', (req, res) => {
  console.log('This is what I got: ', req.body);
  res.redirect('back');
});