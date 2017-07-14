const express = require('express'),
    path= require('path'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    database = require('./config/database');
    routes = require('./config/routes');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
const port = 3000;

//Database connection
mongoose.connect(database.dbname);
mongoose.connection.on('connected', () => {
    console.log('connected to db');
});

app.get('/', (req, res)=> {
    res.send(' you are here');
});

//Listen to the port
app.listen(port, ()=>{
    console.log('Server started on port ' + port);
});

routes(app);


