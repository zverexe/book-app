const express = require('express'),
    mongoose = require('mongoose');

// User Schema
const Schema = mongoose.Schema;
const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  titleLowerCase: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
  authorLowerCase: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
  },
  displayStatus:{
    type: String,
    required: true,
  },
  rating:{
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  time: {
    type : Date,
    default: Date.now,
  },
  creator:{
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model('Book', BookSchema);
