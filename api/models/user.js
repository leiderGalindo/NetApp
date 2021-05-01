'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    last_name: String,
    email: String,
    phone: String,
    company_name: String,
    company_address: String,
    seller_data: String,
    engineerring_data: String
});

module.exports = mongoose.model('User', UserSchema);