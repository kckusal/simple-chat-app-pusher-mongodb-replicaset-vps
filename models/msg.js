const mongoose = require('mongoose');  
const Schema   = mongoose.Schema;

const msgSchema = new Schema({ 
  msg: { type: String },
});

module.exports = mongoose.model('Msg', msgSchema);