const express = require('express');
const path= require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const database = require('./config/database');
const routes = require('./config/routes');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
// set headers to allow cross origin request.
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

require('./config/passport')(passport);

const port = 3000;

// Database connection
mongoose.connect(database.dbname);
mongoose.connection.on('connected', () => {
  console.log('connected to db');
});

app.get('/', (req, res) => {
  res.send('you are here');
});

// Listen to the port
app.listen(port, () => {
  console.log("Server started on port " + port );
});

routes(app);

