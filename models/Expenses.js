const mongoose = require('mongoose');
const { Schema } = mongoose;


const ExpensesSchema = new Schema({
    //Primary key --> Foriegn Key Definition
    // user:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'model name'
    // },
    //All required fields here
    detail:{
        type: String
    },
    price:{
        type: Number
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

  module.exports = mongoose.model('expenses', ExpensesSchema);