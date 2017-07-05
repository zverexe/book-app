const express = require('express'),
    path= require('path'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    database = require('./database');
    //authenticate = require('./authenticate');
    routes = require('./config/routes');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
const port = 3000;

//app.use(router);

//Database connection
mongoose.connect(database.dbname);
mongoose.connection.on('connected', () => {
    console.log('connected to db');
});

app.get('/', (req, res)=> {
    res.send(' you are here');
});

app.listen(port, ()=>{
    console.log('Server started on port ' + port);
});
routes(app);


