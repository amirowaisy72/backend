const mongoose = require('mongoose');
const url = 'mongodb+srv://amirowaisy72:iVVKYSj5rugATyVg@cluster0.mpb1bfz.mongodb.net/rentacar';
// const url = 'mongodb://0.0.0.0:27017/rentacar'
mongoose.set('strictQuery', false);

const connecToMongoose = async()=>{
    let connect = await mongoose.connect(url);
    if(connect){
        console.log("Connected to Mongoose DB Successfully!!!")
    }
};

module.exports = connecToMongoose;