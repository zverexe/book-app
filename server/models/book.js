const express = require('express'),
    mongoose = require('mongoose'),
    database = require('../database'),
    authenticate = require('../authenticate');


//User Schema
const Schema = mongoose.Schema;
const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean
    },
    displayStatus:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    time: {
        type : Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Book', BookSchema);
