const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('./user');
const Book = require('./models/book');
const database = require('./database');


function generateToken(user) {
    console.log(database.secret);
    return jwt.sign(user, database.secret, {
        expiresIn: 604800 // in seconds
    });
}

// Register user
exports.register = function (req, res, next) {

    const email = req.body.email;
    const password = req.body.password;

    // Return error if no email provided
    if (!email) {
        return res.status(422).send({ error: 'You must enter an email address.' });
    }

    // Return error if no password provided
    if (!password) {
        return res.status(422).send({ error: 'You must enter a password.' });
    }


    User.findOne({ email }, (err, existingUser) => {
        if (err) { return next(err); }

        // If user is not unique, return error
        if (existingUser) {
            return res.status(422).send({ error: 'That email address is already in use.' });
        }


    let newUser = new User({
        email,
        password
    });


    function setUserInfo(request) {
        const getUserInfo = {
            _id: request._id,
            email: request.email,
            password: request.password
        };
        return getUserInfo;
    };

    newUser.save((err, user)=>{
        if (err) { return next(err);
        }
        const userInfo = setUserInfo(user);
        res.json({
            success: true,
            token: `JWT ${generateToken(userInfo)}`,
            user: userInfo
         });

        });
    });
};

// Login user
exports.login = function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByUsername(email, (err, user)=>{
        if(err) throw err;
        console.log(user);

        if(!user){
            return res.json({success: false, msg: 'not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token= jwt.sign(user, database.secret, {
                    expiresIn: 604800 // in seconds
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        name: user.email
                    }
                });
            }else{
                return res.json({success: false, msg: 'not found'});
            }
        });
    });
};




// Add book
exports.addBook = function (req, res) {

    const title = req.body.title;
    const author = req.body.author;
    const description = req.body.description;
    const status = req.body.status;
    const displayStatus = req.body.displayStatus;
    const rating = req.body.rating;

    if (!title) {
        return res.status(422).send({ error: 'You must add the title.' });
    }

    // Return error if no author provided
    if (!author) {
        return res.status(422).send({ error: 'You must add the author.' });
    }

    // Return error if no description provided
    if (!description) {
        return res.status(422).send({ error: 'You must add the description.' });
    }

// Return error if no status provided
    /*if (!status) {
        return res.status(422).send({ error: 'You must add the status.' });
    }*/

    // Return error if no rating provided
    if (!rating) {
        return res.status(422).send({ error: 'You must add the rating.' });
    }

    let newBook = new Book({
        title,
        author,
        description,
        status,
        displayStatus,
        rating
    });

    newBook.save((err, book)=>{
        if(err){
            res.send(err);
        }else{
            res.json({success: true, book});
        }
    });

    //res.json({success: true});
};

// Delete book
exports.deleteBook = function (req, res) {
    Book.remove({_id: req.params.id}, (err, book)=>{
       if(err){
            res.send(err);
       }else{
            res.json({success: true});
        }
    });
};

// Edit book
exports.editBook = function (req, res) {
    const book = req.body;
    const updBook = {};

    if(book.title){
        updBook.title = book.title;
    }

    if(book.author){
        updBook.author = book.author;
    }

    if(book.description){
        updBook.description = book.description;
    }

    if(book.displayStatus){
        updBook.status = book.status;
        updBook.displayStatus = book.displayStatus;
    }

    if(book.rating){
        updBook.rating = book.rating;
    }

    if(!updBook){
        res.status(400);
        res.json({
            "error": "Bad data"
        });
    }else{
        Book.update({_id: req.params.id},updBook,{}, (err, book)=>{
            if(err){
                res.send("not edited data");
            }else{
                res.json({success: true, updBook});
            }
        });
    }
};

// Book page
exports.viewBook = function (req, res) {
    console.log(req.params);

    Book.findOne({_id: req.params.id}, (err, book)=>{
        if(err){
            res.send(err);
        }else{
            res.json({success: true, book});
        }
    });
};


// Book list
exports.getBookList = function (req, res) {
    Book.find({}, (err, books)=>{
        if(err){ res.send(err)};
       //console.log(books);
        res.send(books);

    });
};

//module.exports = router;
