const express = require('express');
const authenticate = require('../authenticate');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../user');
const book = require('../book');
const database = require('../database');

const passportService = require('./passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app) {
    // Initializing route groups
    const apiRoutes = express.Router(),
        authRoutes = express.Router(),
        bookRoutes = express.Router();


    //= ========================
    // Auth Routes
    //= ========================

    // Set auth routes as subgroup/middleware to apiRoutes
    apiRoutes.use('/auth', authRoutes);

    // Registration route
    authRoutes.post('/register', authenticate.register);

    // Login route
    authRoutes.post('/login', authenticate.login);

    //= ========================
    // Book Routes
    //= ========================

    // Set book routes as subgroup/middleware to apiRoutes
    apiRoutes.use('/book', bookRoutes);

    // Book list
    bookRoutes.get('/all', book.getBookList);

    // Add book
    bookRoutes.post('/add', requireAuth, book.addBook);

    // Edit book
    bookRoutes.put('/:id', requireAuth, book.editBook);

    // Delete book
    bookRoutes.delete('/:id', requireAuth, book.deleteBook);

    // Book page
    bookRoutes.get('/:id', book.viewBook);


    app.use('/api', apiRoutes);

};