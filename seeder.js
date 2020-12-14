const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const Customer = require('./models/customer');
const customers = require('./data/customers');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async() =>{
    try{
        await Customer.deleteMany();
        await Customer.insertMany(customers);

        console.log('Data Imported'.green.inverse);

    }catch(error){
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }

}

importData();