
const express = require('express');
const authenticate = require('../authenticate');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../user');
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

    apiRoutes.use('/book', bookRoutes);

    // Book list
    bookRoutes.get('/all', authenticate.getBookList);
    
    // Add book
    bookRoutes.post('/add', requireAuth, authenticate.addBook);

    // Edit book
    bookRoutes.put('/edit', authenticate.login);

    // Delete book
    bookRoutes.delete('/:id', requireAuth, authenticate.deleteBook);

    // Book page
    bookRoutes.get('/:id', authenticate.viewBook);






    app.use('/api', apiRoutes);

};