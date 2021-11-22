const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

// function to establish connection to mongodb
const connectMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log('Connected to Mongo successfully');
    });
};

module.exports = connectMongo;
