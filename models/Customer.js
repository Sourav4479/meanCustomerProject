const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create Schema

const CustomerSchema = new Schema({
    addedById: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name:{
        type:String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    emailId:{
        type: String
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    homeTown: {
        type: String
    },
    dateAdded: {
        type: Date,
        default: Date.now()
    }
});


const Customer = mongoose.model('customers', CustomerSchema);
module.exports = Customer;