const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    }

})

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;