var express = require('express');
var app = express();
const mongoose = require("mongoose");
var config = require('./config');
var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController');

var port = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

mongoose.set('strictQuery', false);
var connectString = config.getDbConnectionString();
mongoose.connect(connectString);
const database = mongoose.connection;
database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

setupController(app);
apiController(app);
app.listen(port,() => {
  console.log(`Server Started at ${3000}`)
});



