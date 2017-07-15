const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('./models/userModel');
const Book = require('./models/bookModel');
const database = require('./config/database');

// Add book to db
exports.addBook = function (req, res) {

    const title = req.body.title;
    const author = req.body.author;
    const description = req.body.description;
    const status = req.body.status;
    const displayStatus = req.body.displayStatus;
    const rating = req.body.rating;
    const creator = req.body.creator

    // Return error if no title provided
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
        rating,
        creator
    });

    newBook.save((err, book) => {
        if(err){
            res.send(err);
        }else{
            res.json({success: true, book});
        };
    });
};

// Delete book
exports.deleteBook = function (req, res) {
    Book.remove({_id: req.params.id}, (err, book) => {
        if(err){
            res.send(err);
        }else{
            res.json({success: true});
        };
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
            };
        });
    };
};

// Get single book
exports.viewBook = function (req, res) {
    console.log(req.params);

    Book.findOne({_id: req.params.id}, (err, book) => {
        if(err){
            res.send(err);
        }else{
            res.json({success: true, book});
        };
    })
};


// Get list of all books
exports.getBookList = function (req, res) {
    Book.find({creator: req.query.id}, (err, books) => {
        if(err){ res.send(err)};
    //console.log(books);
    res.send(books);
    });
};