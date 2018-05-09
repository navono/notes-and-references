const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const http = require('http');

const authController = require('./lib/authController');

const app = module.exports = express();
app.use(bodyParser.json({strict: true}));

// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain');
//   res.write('you posted:\n');
//   const a = JSON.stringify(req.body);
//   res.end(JSON.stringify(req.body))
// })

app.post('/login', authController.login);
app.get('/checkToken', authController.checkToken);

app.use(errorHandler());

http.createServer(app).listen(3000, () => {
  console.log(`Express server listening at 3000`);
});
