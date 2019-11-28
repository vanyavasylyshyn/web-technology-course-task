"use strict"

const mongoose = require('mongoose');

const {
  db
} = require('../config');


module.exports = {
  setUpConnection: async () => {
    try {
      mongoose.connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    } catch (err) {
      console.error("Database connectin error: " + err);
    }

  }

}