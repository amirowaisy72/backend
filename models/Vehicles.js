const mongoose = require('mongoose');
const { Schema } = mongoose;

const VehiclesSchema = new Schema({
    //Primary key --> Foriegn Key Definition
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    // All required fields here
    vname:{
        type: String
    },
    vnumber:{
        type: String
    },
    routeStatus:{
        type: String
    },
    mChange:{
        type: Date
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

  module.exports = mongoose.model('vehicles', VehiclesSchema);