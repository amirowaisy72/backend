const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsersSchema = new Schema({
    //Primary key --> Foriegn Key Definition
    // user:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'model name'
    // },
    //All required fields here
    type:{
        type: String
    },
    name:{
        type: String
    },
    mobile:{
        type: String
    },
    email:{
        type: String
    },
    theme:{
        type: String,
        default: "dark"
    },
    password:{
        type:String
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

  module.exports = mongoose.model('users', UsersSchema);