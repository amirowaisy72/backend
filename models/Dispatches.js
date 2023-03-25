const mongoose = require('mongoose');
const { Schema } = mongoose;


const DispatchesSchema = new Schema({
    //Primary key --> Foriegn Key Definition
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    //All required fields here
    cname:{
        type: String
    },
    idcard:{
        type: String
    },
    cmobile:{
        type: String
    },
    caddress:{
        type: String
    },
    guarantee:{
        type: String
    },
    vnumber:{
        type: String
    },
    destination:{
        type: String
    },
    hours:{
        type: Number
    },
    price:{
        type: Number
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

  module.exports = mongoose.model('dispatches', DispatchesSchema);